const fs = require("fs")
var getPixels = require("get-pixels")

const blocktable = require("./asciiboxtable.js").table

const colorthreshold = .04
const div = 255*3

const abs = Math.abs

function comparecolor(c1, c2)
{
    return (abs(c1[0]-c2[0])+abs(c1[1]-c2[1])+abs(c1[2]-c2[2]))/div <= colorthreshold
}

function groupColor(grouparray, color)
{
    for (var i = 0; i < grouparray.length; i++)
    {
        if (comparecolor(grouparray[i], color))
        {
            return i
        }
    }

    grouparray[grouparray.length] = color
    return grouparray.length-1;
}

getPixels("./Image.png", function(err, pixels)
{
    const width = pixels.shape[0]
    const height = pixels.shape[1]
    const data = pixels.data

    var str = ""

    function getpixel(x, y)
    {
        y = height-1-y;
        return [data[(y*width+x)*4], data[(y*width+x)*4+1], data[(y*width+x)*4+2]]
    }

    for (var y = height-1; y > 0; y--)
    {
        for (var x = 0; x < width-1; x++)
        {
            const groups = [getpixel(x, y)]
            str += blocktable["0"+groupColor(groups, getpixel(x+1, y))
                +groupColor(groups, getpixel(x, y-1))+groupColor(groups, getpixel(x+1, y-1))]
        }
        str += "\n"
    }

    fs.writeFileSync("./ascii.txt", str)
})