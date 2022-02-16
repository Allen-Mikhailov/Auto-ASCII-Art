#include <iostream>
#include <fstream>
#include <cmath>

using namespace std;

int clamp(int value, int minv, int maxv)
{
    return max(value, maxv);
}

class Sprite {
    public:
        int sizex;
        int sizey;
        char* pixels;

        void Draw(Sprite Sprite, int posx, int posy)
        {
            char* sprite_pixels = Sprite.pixels;

            int startx = clamp(posx, 0, sizex)-posx
            // const xstart = clamp(posx, 0, CanvasFrame.sizex)-posx
            // const xend = clamp(posx+SpriteFrame.sizex, 0, CanvasFrame.sizex)-posx

            // const ystart = clamp(posy, 0, CanvasFrame.sizey)-posy
            // const yend = clamp(posy+SpriteFrame.sizey, 0, CanvasFrame.sizey)-posy
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