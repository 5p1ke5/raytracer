//let there be light
class Light
{
    constructor(color, angle)
    {
        this.color = color;
        this.angle = angle;
    }
    illumination(origin)
    {
        return this.color;
    }
}