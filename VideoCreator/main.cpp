#include <iostream>
#include <fstream>

class Sprite {
    public:
        int sizex;
        int sizey;
        int* pixels;

        void Draw(Sprite Sprite, int posx, int posy)
        {

        }

        Sprite(int sx, int sy)
        {
            sizex = sx;
            sizey = sy;

            void* temp = malloc(sizex*sizey);
            pixels = temp;
        }
};



int main(){



    return 0;
}