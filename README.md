# Green Lab

## Description

This is the repository for the Green Lab course at Vrije Universiteit Amsterdam. The course is part of the Master's program in Computer Science. The project is about evaluating energy efficiency of code produced by different LLMs.

## LLMs

The following LLMs are used in this project:

- GPT-4o
- Gemini Ultra
- Claude 3 Sonnet

## Project Tree

The project tree looks as follows:

```bash
├── README.md
├── Run_Table_Correctness.csv
├── Run_Table_Energy.csv
├── package.json
├── solutions
├── data
├── final
└── tests
    └── correctness
        ├── inputs-outputs
        ├── results.csv
        └── test_correctness.js
```

## Requirements

- Node.js

## Installation

Clone the repository

```bash
git clone https://github.com/qimolin/green-lab
cd green-lab
```

## Adding new solutions and tests

### Solutions

To add a new solution, prompt the LLM and copy the code to a file following the naming convention `<problem_name>_<llm_name>_<iteration_number>.js` and place it in the `solutions` directory. Then add `export default foo` at the end of the file, where `foo` is the function that solves the problem.

### Tests

Steps to add a new test:

1. Create a new file following the naming convention `<problem_name>.json` and place it in the `tests/correctness/inputs-outputs` directory. We have an array of input output pairs where the first element is the input and the second element is the output. The test will pass if the output of the function is equal to the expected output.

2. Add the problem name to the `tests/correctness/test_correctness.js` file.

## Running the tests

```bash
npm run test
```

## Running the Experiment

Clone [experiment runner](https://github.com/S2-group/experiment-runner) and [energibridge](https://github.com/tdurieux/EnergiBridge) from these repos. Then compile energibridge via it's instructions and copy the contents of ```EnergiBridge/target/releses``` to the root directory of experemrnt runner. Then copy [Group_00ff00.py](../experiment-runner/Group_00ff00.py) to experiment runner. You can now run the experement with

```bash
python experiment-runner/ Group_00ff00.py
```

The output will need to be post processed