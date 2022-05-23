const fs = require("fs")
const noise = require("./noise").noise
const Sprites = require("./Sprites.js")
const RenderMode = require("../ImageConversion/RenderMode/black-white.js")

const floor = Math.floor
const ceil = Math.ceil
const sin = Math.sin
const cos = Math.cos
const sqrt = Math.sqrt
const PI = Math.PI

const Fsizex = 500
const Fsizey = 500
const Frames = 500

const MainFrame = Sprites.CreateFrame(Fsizex, Fsizey)

//Creating Mask
const maskFrame = Sprites.CreateFrame(Fsizex, Fsizey)
const heightcap = 400/2
const warpstrength = 10
const wavespeed = .0075
for (var i = 0; i < Fsizex; i++)
{
    height = (Fsizey-1)-Math.floor(noise(i*wavespeed, 0, 0)*heightcap*2/3 + noise(i*wavespeed*1.25, 500, 0)*heightcap/3)
    for (var y = height; y < Fsizey; y++)
    {
        maskFrame.data[y*Fsizex+i] = 1
    }
}

//Meteor Sprite
const HeadRadius = 50
const TailLength = 300
const BoxHeight = Math.ceil((TailLength+HeadRadius*sqrt(2))/sqrt(2))

const MeteorFallAngle = 2*PI/360 * 270

const MeteorFrame = Sprites.CreateFrame(BoxHeight, BoxHeight)
Sprites.DrawTraingle(MeteorFrame, 
    HeadRadius+cos(MeteorFallAngle-1/2*PI)*HeadRadius, BoxHeight-HeadRadius-sin(MeteorFallAngle-1/2*PI)*HeadRadius,
    HeadRadius+cos(MeteorFallAngle+1/2*PI)*HeadRadius, BoxHeight-HeadRadius-sin(MeteorFallAngle+1/2*PI)*HeadRadius,
    BoxHeight, 0)
Sprites.DrawSprite(MeteorFrame, Sprites.GetCircleWithLine(HeadRadius, Math.tan(MeteorFallAngle+PI/2)), 0, BoxHeight-HeadRadius*2)

const MeteorSpeed = 5
const MeteorFallSpeed = -sin(MeteorFallAngle)*MeteorSpeed
const MeteorSwaySpeed = cos(MeteorFallAngle)*MeteorSpeed
const MeteorCycles = 10

// Random function
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const TargetY = Fsizey+MeteorFrame.sizey
const XOffset = Math.abs((Fsizey/MeteorFallSpeed)*MeteorSwaySpeed)
const ASizeX = XOffset + Fsizex
function GetMeteorPos(Frame, MeteorId)
{
    const rand = mulberry32(MeteorId*MeteorCycles)
    const period = Math.floor(rand()*Frames)
    const NFrame = 500-(Frames+Frame-period)%Frames

    const TargetX = Math.floor(rand()*ASizeX)-XOffset
    
    return [TargetX-NFrame*MeteorSwaySpeed, TargetY-NFrame*MeteorFallSpeed]
}

const outputfilename = process.argv[1]+"\\..\\"+"video.js"
const Stream = fs.createWriteStream(outputfilename)
Stream.write("const videodata = [")

const ratio = 29/61

// const oh = [Fsizex, Math.floor(Fsizey*ratio)]
var getPixel = function(x, y)
{
    return [x, Math.floor((Fsizey-1-y/ratio))];
};

const framedata = []
const rendersize = [Fsizex, Fsizey, Fsizex, Math.floor(Fsizey*ratio)]
for (var i = 0; i < Frames; i++) {
    for (var j = 0; j < Fsizex*Fsizey; j++)
    {
        MainFrame.data[j] = 0;
    }

    for (var m = 0; m < MeteorCycles; m++)
    {
        const pos = GetMeteorPos(i, m)
        Sprites.DrawSprite(MainFrame, MeteorFrame, floor(pos[0]), floor(pos[1]))
    }
    Sprites.DrawSprite(MainFrame, maskFrame, 0, 0)

    for (var j = 0; j < MainFrame.data.length; j++)
    {
        framedata[j*4] = MainFrame.data[j]*255
        framedata[j*4+1] = MainFrame.data[j]*255
        framedata[j*4+2] = MainFrame.data[j]*255
    }

    const str = RenderMode.render(getPixel, null, framedata, rendersize)
    fs.writeFileSync("./VideoCreator/Frames/"+i+".txt", str)

    Stream.write(JSON.stringify(MainFrame)+",")
}

Stream.write("]")
Stream.close()