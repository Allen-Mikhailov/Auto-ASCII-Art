const fs = require("fs")
const CMDHandler = require("./UniversalModules/flagHandler")
const argv = process.argv

const mainCl = new CMDHandler.commandLineObj()
const baseCMDPath = __filename +"\\..\\"+ "\\baseCommands"
const baseCMDFiles = fs.readdirSync(baseCMDPath)

for (var i = 0; i < baseCMDFiles.length; i++)
{
    mainCl.addCommand(require("./baseCommands/" + baseCMDFiles[i]))
}

CMDHandler.handleFlags(mainCl, argv.slice(2))
