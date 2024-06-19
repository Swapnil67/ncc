const { spawn, exec } = require("node:child_process");

// * ----------- spwan -----------

// let spwan_command = "ls -l"
// let spwan_command = "ll"
// let spwan_command = "disown"
// const subprocess = spawn(spwan_command);         

// let spwan_command = "echo"
// const subprocess = spawn(spwan_command, ['Hello world', '|', 'tr', ' ', '\n']);         

// subprocess.stdout.on("data", (data) => {
//   console.log(data.toString("utf-8"));
// });

// * ----------- exec -----------

// let exec_command = "ls -l"
// let exec_command = "ll"
// let exec_command = "disown"
// let exec_command = "echo 'Hello world' | tr ' ' '\n'"
// exec(exec_command, (error, stdout, stderr) => {
//   if(error) {
//     console.error(error);
//   }
//   console.log(stdout);

//   console.log("stderr: ", stderr);
// })