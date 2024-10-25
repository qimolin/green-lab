from EventManager.Models.RunnerEvents import RunnerEvents
from EventManager.EventSubscriptionController import EventSubscriptionController
from ConfigValidator.Config.Models.RunTableModel import RunTableModel
from ConfigValidator.Config.Models.FactorModel import FactorModel
from ConfigValidator.Config.Models.RunnerContext import RunnerContext
from ConfigValidator.Config.Models.OperationType import OperationType
from ProgressManager.Output.OutputProcedure import OutputProcedure as output

from typing import Dict, List, Any, Optional
from pathlib import Path
from os.path import dirname, realpath

import os
import signal
import pandas as pd
import time
import subprocess
import shlex

class RunnerConfig:
    ROOT_DIR = Path(dirname(realpath(__file__)))

    # ================================ USER SPECIFIC CONFIG ================================
    """The name of the experiment."""
    name:                       str             = "Group_00ff00"

    """The path in which Experiment Runner will create a folder with the name `self.name`, in order to store the
    results from this experiment. (Path does not need to exist - it will be created if necessary.)
    Output path defaults to the config file's path, inside the folder 'experiments'"""
    results_output_path:        Path             = ROOT_DIR / 'experiments'

    """Experiment operation type. Unless you manually want to initiate each run, use `OperationType.AUTO`."""
    operation_type:             OperationType   = OperationType.AUTO

    """The time Experiment Runner will wait after a run completes.
    This can be essential to accommodate for cooldown periods on some systems."""
    time_between_runs_in_ms:    int             = 120000

    # Dynamic configurations can be one-time satisfied here before the program takes the config as-is
    # e.g. Setting some variable based on some criteria
    def __init__(self):
        """Executes immediately after program start, on config load"""

        EventSubscriptionController.subscribe_to_multiple_events([
            (RunnerEvents.BEFORE_EXPERIMENT, self.before_experiment),
            (RunnerEvents.BEFORE_RUN       , self.before_run       ),
            (RunnerEvents.START_RUN        , self.start_run        ),
            (RunnerEvents.START_MEASUREMENT, self.start_measurement),
            (RunnerEvents.INTERACT         , self.interact         ),
            (RunnerEvents.STOP_MEASUREMENT , self.stop_measurement ),
            (RunnerEvents.STOP_RUN         , self.stop_run         ),
            (RunnerEvents.POPULATE_RUN_DATA, self.populate_run_data),
            (RunnerEvents.AFTER_EXPERIMENT , self.after_experiment )
        ])
        self.run_table_model = None  # Initialized later
        output.console_log("Custom config loaded")

    def create_run_table_model(self) -> RunTableModel:
        """Create and return the run_table model here. A run_table is a List (rows) of tuples (columns),
        representing each run performed"""
        problem = FactorModel("problem", ['E-UE', 'E-PN', 'M-GS', 'M-CS', 'H-MN', 'H-SF'])
        llm = FactorModel("llm", ['ChatGPT', 'Claude', 'Gemini'])
        iteration = FactorModel("iteration", ['0', '1', '2'])
        self.run_table_model = RunTableModel(
            factors=[problem, llm, iteration],
            repetitions = 20,
            data_columns=['dram_energy', 'package_energy',
                          'pp0_energy', 'pp1_energy', 'log_energy', 'log_time', 'log_exec'],
            shuffle=True

        )
        print("Run Table Model",self.run_table_model)
        return self.run_table_model

    def before_experiment(self) -> None:
        """Perform any activity required before starting the experiment here
        Invoked only once during the lifetime of the program."""
        output.console_log("warming up experiment")
        
        proc = subprocess.Popen(['npm', 'run', 'energy', 'H-MN', 'Claude', '1', '--prefix', '/home/jeremy/Documents/grad/greenlab/green-lab'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        time.sleep(60)
        proc.kill()
                
        proc = subprocess.Popen(['npm', 'run', 'energy', 'M-CS', 'Gemini', '2', '--prefix', '/home/jeremy/Documents/grad/greenlab/green-lab'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        time.sleep(60)
        proc.kill()

        proc = subprocess.Popen(['npm', 'run', 'energy', 'E-UE', 'ChatGPT', '0', '--prefix', '/home/jeremy/Documents/grad/greenlab/green-lab'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        time.sleep(60)
        proc.kill()


    def before_run(self) -> None:
        """Perform any activity required before starting a run.
        No context is available here as the run is not yet active (BEFORE RUN)"""
        pass

    def start_run(self, context: RunnerContext) -> None:
        """Perform any activity required for starting the run here.
        For example, starting the target system to measure.
        Activities after starting the run should also be performed here."""
        pass

    def start_measurement(self, context: RunnerContext) -> None:
        """Perform any activity required for starting measurements."""
        problem = context.run_variation['problem']
        llm = context.run_variation['llm']
        iteration = context.run_variation['iteration']

       

        profiler_cmd = f'sudo /home/jeremy/Documents/grad/greenlab/EnergiBridge/target/release/energibridge \
                        --max-execution 60 \
                        --output {context.run_dir / "energibridge.csv"} \
                        --summary \
                        npm run energy {problem} {llm} {iteration} --prefix /home/jeremy/Documents/grad/greenlab/green-lab'

        #time.sleep(1) # allow the process to run a little before measuring
        self.profiler = subprocess.Popen(shlex.split(profiler_cmd), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        

    def interact(self, context: RunnerContext) -> None:
        """Perform any interaction with the running target system here, or block here until the target finishes."""

        # No interaction. We just run it for XX seconds.
        # Another example would be to wait for the target to finish, e.g. via `self.target.wait()`
        output.console_log("Running program for 60 seconds")
        time.sleep(60)
    def stop_measurement(self, context: RunnerContext) -> None:
        """Perform any activity here required for stopping measurements."""
        self.profiler.wait()

    def stop_run(self, context: RunnerContext) -> None:
        """Perform any activity here required for stopping the run.
        Activities after stopping the run should also be performed here."""
        output.console_log("killing node server")
        subprocess.run(["sudo", "killall", "node"])
        
    
    def populate_run_data(self, context: RunnerContext) -> Optional[Dict[str, Any]]:
        """Parse and process any measurement data here.
        You can also store the raw measurement data under `context.run_dir`
        Returns a dictionary with keys `self.run_table_model.data_columns` and their values populated"""

        # energibridge.csv - Power consumption of the whole system
        execution_log = self.profiler.stdout.read()
        # print("exlog type",type(execution_log))


        slog = execution_log.decode("utf-8").split(" ")
        log_energy = ""
        log_time = ""
        log_exec = ""
        for x in range(len(slog)):
            if slog[x] == "joules:":
                log_energy = slog[x+1]
                log_time = slog[x+3]
                log_exec = slog[x-5]
                print(slog[x], slog[x+1], "time", slog[x+3], slog[x-7], log_exec)

        df = pd.read_csv(context.run_dir / f"energibridge.csv")
        run_data = {
                'dram_energy'   : round(df['DRAM_ENERGY (J)'].sum(), 3),
                'package_energy': round(df['PACKAGE_ENERGY (J)'].sum(), 3),
                'pp0_energy'    : round(df['PP0_ENERGY (J)'].sum(), 3),
                'pp1_energy'    : round(df['PP1_ENERGY (J)'].sum(), 3),
                'log_energy'    : log_energy,
                'log_time'      : log_time,
                'log_exec'      : log_exec,
        }

        energibridge_log = open(f'{context.run_dir}/energibridge.log', 'w')
        energibridge_log.write(execution_log.decode('utf-8'))
        return run_data

    def after_experiment(self) -> None:
        """Perform any activity required after stopping the experiment here
        Invoked only once during the lifetime of the program."""
        pass

    # ================================ DO NOT ALTER BELOW THIS LINE ================================
    experiment_path:            Path             = None
