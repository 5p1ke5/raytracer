class Vector3D
{
    //Directions
    static zero = new Vector3D();
    static one = new Vector3D(1, 1, 1);
    static forward = new Vector3D(0, 0, -1);
    static backward = new Vector3D(0, 0, 1);

    //Shouldnt these be like (1, 0, 0)?
    static left = new Vector3D(0, 0, -1); 
    static right = new Vector3D(0, 0, 1);
    static up = new Vector3D(0, 1, 0);
    static down = new Vector3D(0, -1, 0);

    constructor(x = 0, y = 0, z = 0)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        Object.freeze(this);
    }
}