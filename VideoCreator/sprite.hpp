#include <cmath>
#include <algorithm>

using namespace std;

#ifdef clamp
#else
int clamp(int value, int minv, int maxv)
{
    return max(min(value, maxv), minv);
}
#endif


class Sprite
{
public:
    int sizex;
    int sizey;
    char *pixels;

    void Draw(Sprite _Sprite, int posx, int posy)
    {
        char *sprite_pixels = _Sprite.pixels;

        int xstart = clamp(posx, 0, sizex) - posx;
        int xend = clamp(posx + _Sprite.sizex, 0, sizex) - posx;

        int ystart = clamp(posy, 0, sizey) - posy;
        int yend = clamp(posy + _Sprite.sizey, 0, sizey) - posy;

        for (int x = xstart; x < xend; x++)
        {
            for (int y = ystart; y < yend; y++)
            {
                pixels[(y + posy) * sizex + x + posx] = _Sprite.pixels[y * _Sprite.sizex + x] | pixels[(y + posy) * sizex + x + posx];
            }
        }
    }

    Sprite(int sx, int sy)
    {
        sizex = sx;
        sizey = sy;

        pixels = (char *)malloc(sizex * sizey);
    }
};

Sprite CircleWithLine(int radius, float angle)
{
    Sprite _Sprite = Sprite(radius * 2 + 1, radius * 2 + 1);
    for (int y = 0; y < radius * 2 + 1; y++)
    {
        int offset = y * radius * 2 + 1;
        for (int x = 0; x < radius * 2 + 1; x++)
        {
            if (sqrt((x - radius) * (x - radius) + (y - radius) * (y - radius)))
            {
                _Sprite.pixels[offset + x] = 1;
            }
        }
    }
}

double area(double x1, double y1, double x2, double y2, double x3, double y3) {
    return abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

void DrawTriangle(Sprite frame, double x1, double y1, double x2, double y2, double x3, double y3)
{
    int up = ceil(max(y1, y2, y3));
    int down = floor(min(y1, y2, y3));
    int right = ceil(max(x1, x2, x3));
    int left = floor(min(x1, x2, x3));

    for (int x = left; x < right; x++)
    {
        for (int y = down; y < up; y++)
        {
            int A = area(x1, y1, x2, y2, x3, y3);
            int A1 = area(x, y, x2, y2, x3, y3);
            int A2 = area(x1, y1, x, y, x3, y3);
            int A3 = area(x1, y1, x2, y2, x, y);

            if (abs(A - (A1 + A2 + A3)) < 1)
                frame.pixels[y * frame.sizex + x] = 1;
        }
    }
}