exports.createspace = function(width, height)
{
    return [width, height, function(x, y)
    {
        return [x, height-1-y];
    }];
}