const ex = require("child_process").exec;
const flags = require("./modules/flags.js")

const args = process.argv
const command = args[0]

function logstring(index)
{
    var str = ""
    for (var i = index || 0; i < args.length-1; i++)
    {
        str += args[i] + " "
    }

    if (args.length > 0)
    {
        str += args[args.length-1]
    }

    return str
}

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
    exec("node ./ImageConversion/index.js "+logstring(2))
} else if (command == "vidcompile") {
    exec("node ./RenderVideo/videocompile.js "+logstring(2))
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