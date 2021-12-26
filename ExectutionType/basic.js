exports.generatefunction = function(execute)
{
    return function(filename, settings, data, width, height)
    {
        return {[filename]: execute(data, width, height)}
    }
}