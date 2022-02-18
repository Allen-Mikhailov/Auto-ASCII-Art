#include <iostream>
#include <fstream>
#include "noise.hpp"
#include "sprite.hpp"

using namespace std;

int main(){
    ofstream output;
    output.open("./video.js");
    output << "videodata = [";
    output.close();


    int Fsizex = 500;
    int Fsizey = 500;
    Sprite MainFrame = Sprite(Fsizex, Fsizey);


    //Background
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

    //Meteor Sprite
    int HeadRadius = 10;
    int TailLength = 60;
    int BoxHeight = ceil((TailLength+HeadRadius*sqrt(2))/sqrt(2));


    return 0;
}