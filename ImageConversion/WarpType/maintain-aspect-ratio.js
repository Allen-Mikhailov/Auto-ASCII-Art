const ratio = 29/61

exports.createspace = function(width, height)
{
    return [width, Math.floor(height*ratio), function(x, y)
    {
        return [x, Math.floor((height-1-y/ratio))];
    }];
}