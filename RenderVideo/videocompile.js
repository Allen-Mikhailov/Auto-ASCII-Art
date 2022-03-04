var sourcehtmFile = "./rendervid.htm"

var inputdirPath = "../ImageConversion/output"
var outputFilePath = "./output/gif.htm"

const flags = require("../modules/flags")
const fs = require("fs")

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
                sourcehtmFile = "./rendertextvid.htm"
            else if (arg == "canvas")
                sourcehtmFile = "./rendervid.htm"
            else
                warn("\""+arg+"\" is not a valid render mode")

        }
    }
}
flags.HandleFlags(process.argv, flagdata)

const testframe = fs.readFileSync(inputdirPath+"/Frame1.png.txt").toString()
const width = testframe.indexOf("\n")
const height = testframe.split("\n").length-1

// console.log(fs.readdirSync(inputdirPath))

const saveobject = {}
saveobject.FrameCount = 300//fs.readdirSync(inputdirPath).length
saveobject.width = width
saveobject.height = height

for (var i = 0; i < saveobject.FrameCount; i++)
{
    const str = fs.readFileSync(inputdirPath+"/Frame"+i+".png.txt").toString()
    saveobject["Frame"+i] = str.replace(/\n/g, "nl")
}

var source = fs.readFileSync(sourcehtmFile).toString()
const newsource = source.replace("<!--VideoData-->", "<script> videodata = "+JSON.stringify(saveobject)+"</script>")

fs.writeFileSync(outputFilePath, newsource)
