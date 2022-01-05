const fs = require("fs")

const FrameCount = 300

const saveobject = {}
const FramesSource = "../ImageConversion/output"

//Test Frame
const testframe = fs.readFileSync(FramesSource+"/Frame0.png.txt").toString()
const width = testframe.indexOf("\n")
const height = testframe.split("\n").length-1

saveobject.FrameCount = FrameCount
saveobject.width = width
saveobject.height = height

for (var i = 0; i < FrameCount; i++)
{
    const str = fs.readFileSync(FramesSource+"/Frame"+i+".png.txt").toString()
    saveobject["Frame"+i] = str.replace(/\n/g, "nl")
}

fs.writeFileSync("videodatatext.js", "videodata = "+JSON.stringify(saveobject))