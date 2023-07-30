const { spawn } = require("child_process");

function executeScript(scriptPath) {
  const scriptProcess = spawn("node", [scriptPath]);

  scriptProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  scriptProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  scriptProcess.on("exit", (code) => {
    console.log(`Script ${scriptPath} exited with code ${code}\n`);
  });
}

// Execute src/deploy-commands.js
executeScript("src/deploy-commands.js");

// Execute src/index.js
executeScript("src/index.js");
