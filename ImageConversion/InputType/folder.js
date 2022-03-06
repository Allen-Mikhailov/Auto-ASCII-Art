const fs = require("fs")
var getPixels = require("get-pixels")

const basepath = process.argv[1]+"/../"

exports.function = function(settings, run, save)
{
    const dir = fs.readdirSync(basepath+"./"+settings["inputfile/folder"])

    for (var i = 0; i < dir.length; i++)
    {
        const inputfile = dir[i]

        getPixels(basepath+"./"+settings["inputfile/folder"]+"/"+inputfile, function(err, pixels)
        {  
            if (err)
                return console.log(err.message)

            save(run(inputfile, settings, pixels.data, pixels.shape[0], pixels.shape[1]))
            console.log("Finished: "+inputfile)
        })
    }
}