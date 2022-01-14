const { warn } = require("console");
const fs = require("fs");
const { stdout, stdin } = require("process");

function EditLine(newvalue)
{
    const ttysize = stdout.getWindowSize()
    stdout.moveCursor(-ttysize[0], 0)
    const neededsize = ttysize[0]-newvalue.length;
    for (var i = 0; i < neededsize; i++)
        newvalue += " ";

    stdout.write(newvalue);
}

function Options(callback, Selection)
{
    var index = 0;
    var pick;

    function listen(str, key)
    {
        key = key || {};
        switch (key.name) {
            case "right":
                index++;

                if (index > Selection.length-1)
                {
                    index = Selection.length-1;
                }

                break;
            case "left":
                index--;

                if (index < 0)
                {
                    index = 0;
                }

                break;
            case "return":
                stdin.removeListener("keypress", listen)
                pick = Selection[index];
                callback(pick);
                return pick;
        } 

        var output = "Pick: "

        for (var i = 0; i < Selection.length; i++)
        {
            if (i == index)
            {
                output += style(Selection[i], 7)+" "
            } else {
                output += Selection[i]+" ";
            }
        }

        EditLine(output);
    }

    stdin.on("keypress", listen)
    listen();
}

function style(s, color)
{
    var colorIndex;

    if (typeof(color) == "number")
                colorIndex = color;
    else
        switch (color.toLowerCase())
        {
            case "red":
                colorIndex = 31;
                break;
            case "green":
                colorIndex = 32;
                break;
            case "yellow":
                colorIndex = 33;
                break;
            default:
                console.log("Invalid Color \""+color+"\"")
                return s;
        }

    return  '\x1b['+colorIndex+"m"+s+"\x1b[0m"
}

exports.EditLine = EditLine
exports.style = style;
exports.Options = Options