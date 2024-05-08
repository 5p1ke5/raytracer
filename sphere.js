class Sphere
{
    constructor (center, radius)
    {
        this.center = center;
        this.radius = radius;
    }

//Calculates intersection between a ray and this sphere
intersect(origin, dir)
{
    let _center = this.center;
    let _radius = this.radius;

    let originToCenter = origin.minus(this.center);

    let a = 1;
    let b = 2 * dir.dot(originToCenter);
    let c = (dir.dot(originToCenter)) ** 2 - this.radius ** 2;

    let discriminant = b ** 2 - 4 * a * c;

    if (discriminant <= 0)
    {
        return undefined;
    }

    let sqrt = Math.sqrt((dir.dot(originToCenter)) ** 2 - (originToCenter.dot(originToCenter) - _radius ** 2));
    let t1 = (-dir.dot(originToCenter) - sqrt);
    let t2 = (dir.dot(originToCenter) + sqrt);

    let timeToCollision;

    //Chooses the closest collision point if both are positive.
    if (t1 > 0 && t2 > 0)
    {
        timeToCollision = Math.min(t1, t2);
    }
    //if they're not both in front
    else
    {
        if (t1 > 0)
        {
            timeToCollision = t1;
        }
        else if (t2 > 0)
        {
            timeToCollision = t2;
        }
        else
        {
            return undefined;
        }
    }

    let collisionLocation = origin.add(dir.scale(timeToCollision));
    return new Collision(timeToCollision, collisionLocation, collisionLocation.minus(this.center).norm());
    }
}