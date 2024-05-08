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

    get r()
    {
      return this.x;
    }
  
    get g()
    {
      return this.y;
    }
    
    get b()
    {
      return this.z
    }

    norm()
    {
        return new Vector3D(this.x / this.length(), this.y / this.length(), this.z / this.length())
    }

    length()
    {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    dot(other)
    {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross(other)
    {
        return new Vector3D(this.y * other.z - this.z * other.y, this.z * other.x - this.x * other.z, this.x * other.y - this.y * other.x);
    }

    add(other)
    {
        return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    negate()
    {
        return new Vector3D(-this.x, -this.y, -this.z);
    }

     minus(other)
     {
        return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
     }

     scale(scalar)
     {
        return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar)
     }
}