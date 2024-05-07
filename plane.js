class Plane
{
    constructor (one, two, three)
    {
        this.vertices = [];
        this.vertices.push(...[one, two, three]);
    }

    //Get vertices
    get one()
    {
        return this.vertices[0];
    }

    get two()
    {
        return this.vertices[1];
    }
    
    get three()
    {
        return this.vertices[2];
    }

    //These get vectors between two vertices
    get oneTwo()
    {
        return this.one.position.minus(this.two.position).norm();
    }

    get threeTwo()
    {
        return this.three.position.minus(this.two.position).norm();
    }


    //calculates collision point with triangle
    intersect(rayOrigin, rayDirection)
    {
        return new Collision(1000, Vector3D.zero, Vector3D.up);
    }
}