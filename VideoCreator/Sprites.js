function clamp(val , min, max)
{
    return Math.max(Math.min(val, max), min)
}

exports.CreateFrame = function (sizex, sizey)
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

exports.DrawTraingle = function (frame, x1, y1, x2, y2, x3, y3) {
    const up = Math.ceil(Math.max(y1, y2, y3));
    const down = Math.floor(Math.min(y1, y2, y3));
    const right = Math.ceil(Math.max(x1, x2, x3));
    const left = Math.floor(Math.min(x1, x2, x3));

    const sizex = frame.sizex

    for (var x = left; x < right; x++) {
        for (var y = down; y < up; y++) {
            let A = area(x1, y1, x2, y2, x3, y3);
            let A1 = area(x, y, x2, y2, x3, y3);
            let A2 = area(x1, y1, x, y, x3, y3);
            let A3 = area(x1, y1, x2, y2, x, y);

            if (Math.abs(A - (A1 + A2 + A3)) < 1)
                frame.data[y*sizex+x] = 1
        }
    }

    return frame
}

exports.GetCircleWithLine = function (radius, angle) {
    const Frame = exports.CreateFrame(radius*2+1, radius*2+1)
    for (var y = 0; y < radius*2+1; y++)
    {
        const offset = y*Frame.sizex
        for (var x = 0; x < radius*2+1; x++)
        {
            if (Math.sqrt((x-radius)**2 + (y-radius)**2) <= radius && (x-radius)*angle <= y-radius)
            {
                Frame.data[offset+x] = 1 
            }
        }
    }

    return Frame
}

exports.DrawSprite = function (CanvasFrame, SpriteFrame, posx, posy)
{
    const xstart = clamp(posx, 0, CanvasFrame.sizex)-posx
    const xend = clamp(posx+SpriteFrame.sizex, 0, CanvasFrame.sizex)-posx

    const ystart = clamp(posy, 0, CanvasFrame.sizey)-posy
    const yend = clamp(posy+SpriteFrame.sizey, 0, CanvasFrame.sizey)-posy

    const CData = CanvasFrame.data
    const SData = SpriteFrame.data

    for (var x = xstart; x < xend; x++)
    {
        for (var y = ystart; y < yend; y++)
        {
            CData[(y+posy)*CanvasFrame.sizex+x+posx] = SData[y*SpriteFrame.sizex + x] 
            || CData[(y+posy)*CanvasFrame.sizex+x+posx]
        }
    }
}