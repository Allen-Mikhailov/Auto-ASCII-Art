const blocktable = require("./../assets/color-table.js").table

const div = 255*3

const abs = Math.abs

exports.render = function(pixelget, settings, data, size, args)
{
    const colorthreshold = args.colorthreshold || settings.colorthreshold 

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

    var str = ""

    owidth = size[0]
    oheight = size[1]
    width = size[2]
    height = size[3]

    function getpixel(x, y)
    {
        const newpos = pixelget(x, y)
        x = newpos[0]
        y = newpos[1]

        return [data[(y*owidth+x)*4], data[(y*owidth+x)*4+1], data[(y*owidth+x)*4+2]]
    }

    for (var y = height-1; y > 0; y -= 2)
    {
        for (var x = 0; x < width; x += 2)
        {
            const groups = [getpixel(x, y)]
            str += blocktable["0"+groupColor(groups, getpixel(x+1, y))
                +groupColor(groups, getpixel(x, y-1))+groupColor(groups, getpixel(x+1, y-1))]
        }
        str += "\n"
    }

    return str
}