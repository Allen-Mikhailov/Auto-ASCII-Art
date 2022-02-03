const fs = require("fs")
const noise = require("./noise").noise
const RenderMode = require("../ImageConversion/RenderMode/black-white.js")

const Fsizex = 500
const Fsizey = 500
const Frames = 100

function clamp(val , min, max)
{
    return Math.max(Math.min(val, max), min)
}

function pixelget(x, y) {
    return [x, pixelsy - 1 - y]
}

function CreateFrame(sizex, sizey)
{
    const data = [];
    for (var i = 0; i < sizex*sizey; i++)
    {
        data[i] = 0;
    }
    return {
        data: data,
        sizex: sizex,
        sizey: sizey
    };
}

function area(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

function GetTriangleBase(x1, y1, x2, y2, x3, y3) {
    const up = Math.max(y1, y2, y3);
    const down = Math.min(y1, y2, y3);
    const right = Math.max(x1, x2, x3);
    const left = Math.min(x1, x2, x3);

    const sizex = right-left
    const sizey = up-down

    const frame = CreateFrame(sizex, sizey)

    for (var x = 0; x < sizex; x++) {
        for (var y = 0; y < sizey; y++) {
            let A = area(x1, y1, x2, y2, x3, y3);
            let A1 = area(x, y, x2, y2, x3, y3);
            let A2 = area(x1, y1, x, y, x3, y3);
            let A3 = area(x1, y1, x2, y2, x, y);

            if (Math.abs(A - (A1 + A2 + A3)) < 1)
                frame.data[y*sizex+x] = 1
        }
    }
}

function GetCircleWithLine(size, position, angle) {

}

function DrawSprite(CanvasFrame, SpriteFrame, posx, posy)
{
    const xstart = clamp(posx, 0, CanvasFrame.sizex)-posx
    const xend = clamp(posx+SpriteFrame.sizex, 0, CanvasFrame.sizex)-posx

    const ystart = clamp(posy, 0, CanvasFrame.sizey)-posy
    const yend = clamp(posy+SpriteFrame.sizey, 0, CanvasFrame.sizey)-posy

    for (var x = xstart; x < xend; x++)
    {
        for (var y = ystart; y < yend; y++)
        {
            CanvasFrame.data[(y+posy)*CanvasFrame.sizex+x+posx] = SpriteFrame.data[y*SpriteFrame.sizex + x]
        }
    }
}

const FrameData = []
const MainFrame = CreateFrame(Fsizex, Fsizey)

//Creating Mask
const maskFrame = CreateFrame(Fsizex, Fsizey)
const heightcap = 100/2
const warpstrength = .05
const wavespeed = .03
var x = 0
for (var i = 0; i < Fsizex; i++)
{
    x += wavespeed + (Math.random()-.5)*2*warpstrength 
    height = noise(i/100, 0, 0)//(Fsizey-1)-Math.floor((Math.sin(x)+1)*heightcap)
    for (var y = height; y < Fsizey; y++)
    {
        maskFrame.data[y*Fsizex+i] = 1
    }
}

for (var i = 0; i < Frames; i++) {
    for (var j = 0; j < Fsizex*Fsizey; j++)
    {
        MainFrame.data[j] = 0;
    }

    DrawSprite(MainFrame, maskFrame, 0, 0)

    FrameData[i] = Object.assign({}, MainFrame)
}

fs.writeFileSync("video.js", "videodata = "+JSON.stringify(FrameData))