const fs = require("fs")
var getPixels = require("get-pixels")

exports.function = function(settings, run, save)
{
    const dir = fs.readdirSync("./")
    var inputfile

    for (var i = 0; i < dir.length; i++)
    {
        if (dir[i].startsWith(settings["inputfile/folder"]))
        {
            inputfile = dir[i]
            break
        }
    }

    if (!inputfile)
        return console.log("Error: no file that starts with \""+settings["inputfile/folder"]+"\" was found")

    getPixels("./"+inputfile, function(err, pixels)
    {  
        if (err)
            return console.log(err.message)

        save(run(inputfile, settings, pixels.data, pixels.shape[0], pixels.shape[1]))
    })
}