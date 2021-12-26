exports.createspace = function(width, height)
{
    return [Math.floor(width/3), Math.floor(height/3), function(x, y)
    {
        return [x*3, height-1-(y*3)];
    }];
}