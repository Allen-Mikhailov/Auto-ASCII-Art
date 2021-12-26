const fs = require("fs")
var getPixels = require("get-pixels")

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

function drawfunction(datafunction, width, height)
{
    var str = ""
    for (var y = height-1; y > 0; y--)
    {
        for (var x = 0; x < width-1; x++)
            str += blocktable[datafunction(y, x)+datafunction(y, x+1)+datafunction(y-1, x)+ datafunction(y-1, x+1)]
        str += "\n"
    }
    return str
}

getPixels("./Image.png", function(err, pixels)
{
    const width = pixels.shape[0]
    const height = pixels.shape[1]
    const data = pixels.data
    const div = 255*3

    function datafunction(y, x)
    {
        y = (height-1)-y;
        return ""+Math.round((data[(y*width+x)*4]+data[(y*width+x)*4+1]+data[(y*width+x)*4+2])/div)
    }  

    fs.writeFileSync("./ascii.txt", drawfunction(datafunction, width, height))
})