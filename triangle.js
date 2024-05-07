class Triangle
{
    constructor(one, two, three)
    {
        this.vertices = [];
        this.vertices.push(...[one, two, three]);
    }

    //These get the three vertices in the triangle.
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

    //Calculates a collision point with the triangle.
    intersect(origin, direction)
    {
        let ABC = this.oneTwo.cross(this.threeTwo).norm();

        if (ABC.dot(direction) == 0)
        {
                return;
        }

        //D from the plane with this triangle.
        let d = -(ABC.dot(this.one.position));

        //Calculate time to collision
        let timeToCollision = (-d - origin.dot(ABC)) / direction.dot(ABC);

        if (timeToCollision <= 0)
        {
            return;
        }

        let collisionLocation = origin.add(direction.scale(timeToCollision));

        //Return that as a collision object.

        return new Collision(timeToCollision, collisionLocation, ABC);
    }

}