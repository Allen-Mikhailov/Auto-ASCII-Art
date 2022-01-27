const RenderMode = require("../ImageConversion/RenderMode/black-white")

const FrameSizeX = 500
const FrameSizeY = 500
const Frames = 100

const ImageData = []

//Filling Image Data
for (var i = 0; i < FrameSizeX * FrameSizeY * 3; i++) {
    ImageData[i] = 0
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
    return data;
}

function area(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

function GetTriangleBase(x1, y1, x2, y2, x3, y3) {
    const up = Math.max(y1, y2, y3);
    const down = Math.min(y1, y2, y3);
    const right = Math.max(x1, x2, x3);
    const left = Math.min(x1, x2, x3);

    for (var x = 0; x < pixelsx; x++) {
        for (var y = 0; y < pixelsy; y++) {
            if (!inbounds(x, y))
                continue

            let A = area(x1, y1, x2, y2, x3, y3);
            let A1 = area(x, y, x2, y2, x3, y3);
            let A2 = area(x1, y1, x, y, x3, y3);
            let A3 = area(x1, y1, x2, y2, x, y);

            if (Math.abs(A - (A1 + A2 + A3)) < 1)
                colorpixel(pixeldata, y, x, 255)
        }
    }
}

function DrawCircleWithLine(size, position, angle) {

}

const FrameData = []

for (var i = 0; i < Frames; i++) {

}