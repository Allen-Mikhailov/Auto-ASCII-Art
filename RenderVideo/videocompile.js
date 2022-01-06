var sourcehtmFile = "./vendervid.htm"

var inputFramesDir = "./Frames"
var outputFilePath = "./gif.htm"

function converttopath(str)
{
    if (str.startsWith("C:"))
        return strelse 
    else if (str.startsWith("./"))
        return str
    else
        return "./"+str
}

//Arg handling
for (var i = 2; i < process.argv.length; i++)
{
    const arg = process.argv[i]
    const nextarg = process.argv[i+1] || ""
    //Handling Flags

    if (arg.startsWith("-")){
        //Is Flag
        if (arg == "-o")
        {
            outputFilePath = converttopath(nextarg)
            i++
        } else if (arg.startsWith("-s")) {
            i++
            if (nextarg == "canvas")
                sourcehtmFile = "./rendervid.htm"
            else if (nextarg = "text")
                sourcehtmFile = "./rendertextvideo.htm"
        }
    }
}
