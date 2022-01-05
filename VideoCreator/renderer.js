//Saving
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//Size management
const pixelsx = 1500
const pixelsy = 800

const charsx = pixelsx-1
const charsy = pixelsy-1

const screenwidth = screen.width
const screenheight = screen.height

const canvas = document.getElementById("canvas")

//Screen Size Variables
var sizerect
var 

function ScreenSizeUpdate()
{
    sizerect = canvas.getBoundingClientRect()
}

const charwidth = sizerect.width
const charheight = sizerect.height * 1.25

const charsx = Math.floor(screenwidth / charwidth)
const charsy = Math.floor(screenheight / charheight) - 1

const pixelsx = charsx + 1
const pixelsy = charsy + 1

const rendersize = [pixelsx, pixelsy, pixelsx, pixelsy]

const body = document.body

const YCompression = sizerect.height / charwidth

//0 is x, 1 is y, 2 is size
const star = [0, 0, 10]
const starspeed = .001

function pixelget(x, y) {
    return [x, pixelsy - 1 - y]
}

function getstarpixels(size)
{
    pixels = []
    for (var x = -size; x <= size; x++) {
        for (var y = -size; y <= size; y++) {
            if (Math.sqrt(x * x + y * y) <= size) {
                pixels.push(x)
                pixels.push(Math.round(y / YCompression))
            }
        }
    }
    return pixels
}

const pixeldata = []
const write = 255*3

function getpixel(x, y)
{
    return (y*pixelsx+x)*4
}

function isvalid(x, y)
{
    return x >= 0 && x < pixelsx && y >= 0 && y < pixelsy
}

star[2] = getstarpixels(star[2])

function update() {
    for (var i = 0; i < pixelsx*pixelsy*4; i++)
        pixeldata[i] = 0

    const starpixels = star[2]
    for (var i = 0; i < star[2].length; i += 2)
    {
        star[0] = (pixelsx+star[0]-starspeed)%pixelsx
        star[1] = (pixelsy+star[1]+starspeed)%pixelsy
        const x = star[0]+starpixels[i]
        const y = star[1]+starpixels[i+1]

        if (isvalid(x, y))
            pixeldata[getpixel(Math.floor(x), Math.floor(y))] = write
    }

    canvas.innerHTML = exports.render(pixelget, null, pixeldata, rendersize).replaceAll("\n", "<br>")

    requestAnimationFrame(update)
}

canvas.style.whiteSpace = "pre"

update()