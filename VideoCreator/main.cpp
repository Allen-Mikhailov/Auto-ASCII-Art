#include <iostream>
#include <fstream>
#include <cmath>

int clamp(int value, int minv, int maxv)
{
    return std::max(std::min(value, maxv), minv);
}

class Sprite {
    public:
        int sizex;
        int sizey;
        char* pixels;

        void Draw(Sprite _Sprite, int posx, int posy)
        {
            char* sprite_pixels = _Sprite.pixels;

            int xstart = clamp(posx, 0, sizex)-posx;
            int xend = clamp(posx+_Sprite.sizex, 0, sizex)-posx;

            int ystart = clamp(posy, 0, sizey)-posy;
            int yend = clamp(posy+_Sprite.sizey, 0, sizey)-posy;

            for (int x = xstart; x < xend; x++)
            {
                for (int y = ystart; y < yend; y++)
                {
                    pixels[(y+posy)*sizex+x+posx] = _Sprite.pixels[y*_Sprite.sizex + x] | pixels[(y+posy)*sizex+x+posx];
                }
            }
        }

        Sprite(int sx, int sy)
        {
            sizex = sx;
            sizey = sy;

            pixels = (char*) malloc(sizex*sizey);
        }
};



int main(){



    return 0;
}