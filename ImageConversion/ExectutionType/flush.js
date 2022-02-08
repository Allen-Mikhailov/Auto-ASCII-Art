exports.generatefunction = function(execute)
{
    const stop = .5
    const start = .05
    const dif = stop-start
    const frames = 100

    const c = 0
    function f(x)
    {
        return -1/(c*x+1)+1
    }

    function curve(x)
    {
        return x //return f(x)/f(1)
    }

    return function(filename, settings, data, width, height)
    {
        const files = {}
        for (var i = 0 ; i < frames; i++)
        {
            console.log(start+curve(i/frames)*dif)
            settings.colorthreshold = start+curve(i/frames)*dif
            files[filename+i] = execute(data, width, height)
        }
        return files
    }
}