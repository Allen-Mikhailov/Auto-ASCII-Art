#include <iostream>
#include <fstream>
#include <noise.hpp>

using namespace std;

int clamp(int value, int minv, int maxv)
{
    return max(min(value, maxv), minv);
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


Sprite CircleWithLine(int radius, float angle)
{
    Sprite _Sprite = Sprite(radius*2+1, radius*2+1);
    for (int y = 0; y < radius*2+1; y++)
    {
        int offset = y*radius*2+1;
        for (int x = 0; x < radius*2+1; x++)
        {
            if (sqrt((x-radius)*(x-radius) + (y-radius)*(y-radius)))
            {
                _Sprite.pixels[offset+x] = 1;
            }
        }
    }
}

int main(){
    int Fsizex = 500;
    int Fsizey = 500;
    Sprite MainFrame = Sprite(Fsizex, Fsizey);

    Sprite MaskFrame = Sprite(Fsizex, Fsizey);

    double heightcap = 400/2;
    double wavespeed = .0075;

    for (int i = 0; i < Fsizex; i++)
    {
        int height = (Fsizey-1)-floor(noise(i*wavespeed, 0, 0)*heightcap*2/3 + noise(i*wavespeed*1.25, 500, 0)*heightcap/3);
        for (int y = height; y < Fsizey; y++)
        {
            MaskFrame.pixels[y*Fsizex+i] = 1;
        }
    }

    return 0;
}