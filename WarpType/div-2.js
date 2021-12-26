exports.createspace = function(width, height)
{
    return [Math.floor(width/2), Math.floor(height/2), function(x, y)
    {
        return [x*2, height-1-(y*2)];
    }];
}