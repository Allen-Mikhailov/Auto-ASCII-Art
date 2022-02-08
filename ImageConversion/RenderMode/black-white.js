exports.render = function(pixelget, settings, data, size)
{
    const blocktable = {
        ["0000"]: " ",
        ["0001"]: "┌",
        ["0010"]: "┐",
        ["0011"]: "─",
        ["0100"]: "└",
        ["0101"]: "│",
        ["0110"]: "┼",
        ["0111"]: "┘",
        ["1000"]: "┘",
        ["1001"]: "┼",
        ["1010"]: "│",
        ["1011"]: "└",
        ["1100"]: "─",
        ["1101"]: "┐",
        ["1110"]: "┌",
        ["1111"]: " ",
    }
    
    const div = 255*3

    const owidth = size[0]
    const oheight = size[1]
    const width = size[2]
    const height = size[3]

    function getcolor(y, x)
    {
        const newpos = pixelget(x, y)
        x = newpos[0]
        y = newpos[1]

        return "" + Math.round((data[(y*owidth+x)*4]+data[(y*owidth+x)*4+1]+data[(y*owidth+x)*4+2])/div)
    }

    var str = ""
    for (var y = height-1; y > 0; y--)
    {
        for (var x = 0; x < width-1; x++)
            str += blocktable[getcolor(y, x)+getcolor(y, x+1)+getcolor(y-1, x)+ getcolor(y-1, x+1)]
        str += "\n"
    }
    return str
}