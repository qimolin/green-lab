const { readFile, writeFile } = require('fs/promises');

writeFile("./results.csv", "", {flag: "w+"});
["M-LN", "M-WJ"].forEach(problem => {
    let inOutFile = "./inputs-outputs/" + problem + ".json";
    readFile(inOutFile, "utf-8").then((data) => {
        const inOut = JSON.parse(data);
        ["ChatGPT", "Claude", "Gemini"].forEach(llm => {
            for (let r = 0; r < 3; r++) {
                const fooPath = "../solutions/" + problem + "_" + llm + "_" + r.toString() + ".js";
                const mod = require(fooPath);
                let passed = true;
                inOut.forEach(test => {
                    let input = test[0];
                    let expectedOutput = test[1];
                    console.log(problem, input);
                    try {
                        var output = mod.foo(...input);
                    } catch (error) {
                        var output = mod.foo(input);
                    }
                    if (JSON.stringify(expectedOutput) != JSON.stringify(output)) {
                        console.log("FALSE", expectedOutput, output)
                        passed = false;
                    }
                })
                writeFile("./results.csv", problem + "," + llm + "," + r.toString() + "," + passed.toString() + "\n", {flag: "a+"});
            }
        })
    })
    .catch((err) => {
        for (let r = 0; r < 3; r++) {
            writeFile("./results.csv", problem + "," + llm + "," + r.toString() + ",ERROR" + "\n", {flag: "a+"});
        }
    })
})
