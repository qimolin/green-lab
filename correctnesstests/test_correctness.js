const { readFile, writeFile } = require('fs/promises');

writeFile("./results.csv", "", {flag: "w+"});
["E-SC", "E-MX", "E-TT", "M-LN", "M-WJ"].forEach(problem => {
    let inOutFile = "./inputs-outputs/" + problem + ".json";
    readFile(inOutFile, "utf-8").then((data) => {
        const inOut = JSON.parse(data);
        ["ChatGPT", "Claude", "Gemini"].forEach(llm => {
            for (let r = 0; r < 3; r++) {
                const fooPath = "../solutions/" + problem + "_" + llm + "_" + r.toString() + ".js";
                try {
                    const mod = require(fooPath);
                    let passed = true;
                    for (let i = 0; i < 50; i++) {
                        if (problem.startsWith("E") && i > 14) {
                            break;
                        }
                        let input = inOut[i][0];
                        let expectedOutput = inOut[i][1];

                        const numParams = mod.foo.length;
                        const paramsError = Error("got " + input.length + " params instead of " + numParams);
                        try {
                            if (Array.isArray(input) && input.length != numParams) {
                                throw paramsError
                            }
                            var output = mod.foo(...input);
                        } catch (error) {
                            if (error == paramsError) {
                                throw paramsError;
                            } else {
                                var output = mod.foo(input);
                            }
                        }
                        if (JSON.stringify(expectedOutput) != JSON.stringify(output)) {
                            console.log("FALSE", input, expectedOutput, output)
                            passed = false;
                        }
                    }
                    writeFile("./results.csv", problem + "," + llm + "," + r.toString() + "," + passed.toString() + "\n", {flag: "a+"});
                }
                catch (err) {
                    writeFile("./results.csv", problem + "," + llm + "," + r.toString() + "," + false.toString() + "," + err.toString() + "\n", {flag: "a+"});
                }
            }
        })
    })
    // .catch((err) => {
    //     throw err;
    //     for (let r = 0; r < 3; r++) {
    //         writeFile("./results.csv", problem + ",," + r.toString() + ",ERROR" + "\n", {flag: "a+"});
    //     }
    // })
})
