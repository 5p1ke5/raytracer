class Camera
{
    static Othrographic = 0;
    static Perspective = 0;

    constructor (origin, direction, up, type, angle = Math.PI/4)
    {
        this.origin = origin;
        this.direction = direction.norm();
        this.up = up.norm();
        this.type = type;
        this.angle = angle;
    }

    getOrigin(x,y)
    {
        if (this.type == Camera.Othrographic)
        {
            return new Vector3D(x, y, this.origin.z);
        }
        else
        {
            return this.origin;
        }
    }

    getDirection(x, y)
    {
        if (this.type == Camera.Othrographic)
        {
            return this.direction;
        }
        else
        {
            let right = this.direction.cross(this.up).norm();
            let up = right.cross(this.direction).norm();

            let cos = Math.cos(this.angle);
            let sin = Math.sin(this.angle);

            let xOffset = right.scale(x).scale(sin);
            let yOffset = up.scale(y).scale(sin);

            return this.direction.scal(cos).add(xOffset).add(yOffset).norm();
        }
    }
}