const fs = require("fs")
var getPixels = require("get-pixels")

exports.function = function(settings, run, save)
{
    const dir = fs.readdirSync("./"+settings["inputfile/folder"])

    for (var i = 0; i < dir.length; i++)
    {
        const inputfile = dir[i]

        getPixels("./"+settings["inputfile/folder"]+"/"+inputfile, function(err, pixels)
        {  
            if (err)
                return console.log(err.message)

            save(run(inputfile, settings, pixels.data, pixels.shape[0], pixels.shape[1]))
            console.log("Finished: "+inputfile)
        })
    }
}