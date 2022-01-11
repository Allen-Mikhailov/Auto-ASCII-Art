/*
    Flag Object
    {
        ["-s"]: {
            ["NextArg"]: false,
            ["funct"]: function()
            {
                //Do stuff
            }
        },
        ["lol]:{
            ["NextArg"]: true,
            ["funct"]: function(nextarg)
            {
                //Do other stuff
            }
        }
    }


*/

const consoletools = require("./consoletools")

function warn(str)
{
    console.log(consoletools.style(str))
}


exports.HandleFlags = function (str, flags) {
    if (typeof(str) == "string")
        str = str.split(" ")
    for (var i = 0; i < str.length; i++) {
        if (str.startsWith("-") && flags[str]) {
            const flag = flags[str]
            if (flag.NextArg) {
                if (i == str.length-1 || str[i+1].startsWith("-"))
                    return warn(str+" is not a standalone flag")
                if (flag.funct)
                    flag.funct(str[i+1])
                else
                    warn(str+" does not have a function connected to it")
                i++;
            }
        }
    }
}