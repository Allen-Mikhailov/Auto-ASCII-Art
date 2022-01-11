var sourcehtmFile = "./vendervid.htm"

var inputdirPath = "./Frames"
var outputFilePath = "./gif.htm"

const flags = require("../modules/flags")
const consoletools = require("./../modules/consoletools")

function converttopath(str)
{
    if (str.startsWith("C:") || str.startsWith("."))
        return str 
    else
        return "./"+str
}

//Arg handling
const flagdata = {
    ["-o"]: {
        NextArg: true,
        funct: function(arg)
        {
            outputFilePath = converttopath(arg)
        }
    },
    ["-i"]: {
        NextArg: true,
        funct: function(arg)
        {
            inputdirPath = converttopath(arg)
        }
    },
    ["-rm"]: {
        NextArg: true,
        funct: function(arg)
        {
            if (arg == "text")
                sourcehtmFile = "./vendertextvid.htm"
            else if (arg == "canvas")
                sourcehtmFile = "./vendervid.htm"
            else
                consoletools.warn("\""+arg+"\" is not a valid render mode")

        }
    }
}
flags.HandleFlags(process.argv, flagdata)
