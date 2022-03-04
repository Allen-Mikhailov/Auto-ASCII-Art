const ex = require("child_process").exec;
const flags = require("./modules/flags.js")

const args = process.argv
const command = args[0]

function exec(com)
{
    ex(com, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
}

if (command == "convert")
{

} else if (command == "vidcompile") {

} else if (command) {
    console.log("\'"+command+"\' is not an ascii command")
} else {
    console.log("No command given")
}

// exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });