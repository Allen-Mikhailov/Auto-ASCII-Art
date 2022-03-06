const fs = require("fs")

const basepath = process.argv[1]+"/../"

const settings = JSON.parse(fs.readFileSync(basepath+"./settings.json"))

const inputtype = require(basepath+"./InputType/" + settings.inputtype)
const executiontype = require(basepath+"./ExectutionType/" + settings.executiontype)
const warp = require("./WarpType/" + settings.warptype)
const rendermode = require("./RenderMode/" + settings.rendermode)

if (!fs.existsSync(basepath+"./" + settings["outputfile/folder"]))
{
    fs.mkdirSync(basepath+"./"+settings["outputfile/folder"])
}

function execute(pixels, owidth, oheight, args) {
    const newsize = warp.createspace(owidth, oheight)
    const width = newsize[0]
    const height = newsize[1]

    return rendermode.render(newsize[2], settings, pixels, [owidth, oheight, width, height], args || {})
}

function save(data) {
    for (const filename in data) {
        fs.writeFileSync(basepath+"./" + settings["outputfile/folder"] + "/" + filename + ".txt", data[filename])
    }
}

inputtype.function(settings, executiontype.generatefunction(execute), save)