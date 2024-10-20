import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

// await writeFile('./results.csv', '', { flag: 'w+' });

// const problems = ['E-UE', 'E-PN', 'M-GS', 'M-CS', 'H-MN', 'H-SF'];

const problem = process.argv[2]

const llm = process.argv[3]

const r =  process.argv[4]

const inOutFile = './inputs-outputs/' + problem + '.json';

// console.log(problem)
// console.log(llm)
try {
  const data = await readFile(inOutFile, 'utf-8');
  const inOut = JSON.parse(data);
    
  const fooPath = path.resolve(
    '../../solutions/' + problem + '_' + llm + '_' + r.toString() + '.js'
  );

  try {
    // Convert the path to a valid file:// URL for Windows
    const fooUrl = pathToFileURL(fooPath);
    const foo = await import(fooUrl.href);

    let passed = true;
    let count = 0;
    while(1){
      for (let i = 0; i < 50; i++) {
        if (inOut.length - 1 < i) {
          break;
        }
        const input = inOut[i][0];
        const expectedOutput = inOut[i][1];

        const numParams = foo.default.length;
        const paramsError = Error(
          'got ' + input.length + ' params instead of ' + numParams
        );
        // console.log(input)
        let output;
        try {
          if (Array.isArray(input) && input.length !== numParams) {
            throw paramsError;
          }
          output = foo.default(...input);
          // console.log(output)
        } catch (error) {
          if (error === paramsError) {
            throw error;
          }
          output = foo.default(input);
          // console.log(output)
        }

      }
      count++
      if (problem[0] == "E" && count%10000 == 0){
        console.log(" Execution: ",count, " ")
      }
      else if (problem[0] == "M" && count%1000 == 0){
        console.log(" Execution: ",count, " ")
      }
      else if (problem[0] == "H" && count%100 == 0){
        console.log(" Execution: ",count, " ")
      }
  }
  
    } catch (err) {
      console.error(`Error in execution file for problem ${problem}:`, err);
    }
  }
catch (err) {
console.error(`Error reading file for problem ${problem}:`, err);
}

