import { readFile, writeFile } from 'fs/promises';
import path from 'path';

await writeFile('./results.csv', '', { flag: 'w+' });

const problems = ['M-GS', 'M-CS', 'H-MN', 'H-SF'];
const llms = ['ChatGPT', 'Claude', 'Gemini'];

for (const problem of problems) {
  const inOutFile = './inputs-outputs/' + problem + '.json';
  try {
    const data = await readFile(inOutFile, 'utf-8');
    const inOut = JSON.parse(data);

    for (const llm of llms) {
      for (let r = 0; r < 3; r++) {
        const fooPath = path.resolve(
          '../../solutions/' + problem + '_' + llm + '_' + r.toString() + '.js'
        );
        try {
          const foo = await import(fooPath);
          let passed = true;
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

            let output;
            try {
              if (Array.isArray(input) && input.length !== numParams) {
                throw paramsError;
              }
              output = foo.default(...input);
            } catch (error) {
              if (error === paramsError) {
                throw error;
              }
              output = foo.default(input);
            }

            if (JSON.stringify(expectedOutput) !== JSON.stringify(output)) {
              console.log('FALSE', input, expectedOutput, output);
              passed = false;
            }
          }

          await writeFile(
            './results.csv',
            problem +
              ',' +
              llm +
              ',' +
              r.toString() +
              ',' +
              passed.toString() +
              '\n',
            { flag: 'a+' }
          );
        } catch (err) {
          await writeFile(
            './results.csv',
            problem +
              ',' +
              llm +
              ',' +
              r.toString() +
              ',' +
              false.toString() +
              ',' +
              err.toString() +
              '\n',
            { flag: 'a+' }
          );
        }
      }
    }
  } catch (err) {
    console.error(`Error reading file for problem ${problem}:`, err);
  }
}
