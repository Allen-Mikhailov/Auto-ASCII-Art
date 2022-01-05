const fs = require("fs")

const settings = JSON.parse(fs.readFileSync("./settings.json"))

const inputtype = require("./InputType/" + settings.inputtype)
const executiontype = require("./ExectutionType/" + settings.executiontype)
const warp = require("./WarpType/" + settings.warptype)
const rendermode = require("./RenderMode/" + settings.rendermode)

if (!fs.existsSync("./" + settings["outputfile/folder"]))
{
    fs.mkdirSync("./"+settings["outputfile/folder"])
}

function execute(pixels, owidth, oheight, args) {
    const newsize = warp.createspace(owidth, oheight)
    const width = newsize[0]
    const height = newsize[1]

    return rendermode.render(newsize[2], settings, pixels, [owidth, oheight, width, height], args || {})
}

function save(data) {
    for (const filename in data) {
        fs.writeFileSync("./" + settings["outputfile/folder"] + "/" + filename + ".txt", data[filename])
    }
}

inputtype.function(settings, executiontype.generatefunction(execute), save)