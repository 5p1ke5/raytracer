//abstract
class Shader
{

}

class DiffuseShader
{
    constructor(diffuseColor)
    {
        this.diffuseColor = diffuseColor;
    }

    illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    {
        let lightSum = Vector3D.zero;

        for (let light of Scene.scene.lights)
        {
            let inShadow = false;

            for (let object of Scene.scene.objects)
            {
                if (object == collisionObject)
                {
                    continue;
                }
                
                let directionToLight = light.angle.norm();

                let collision = object.geometry.intersect(rayCollision, directionToLight);
                if (collision)
                {
                    inShadow = true;
                    break;
                }
            }

            let dot = normal.dot(light.angle.norm());
            if (inShadow) dot = 0;
            if (dot <= 0)
            {
                dot = 0;
            }
            lightSum = lightSum.add(new Vector3D(this.diffuseColor.r * dot, this.diffuseColor.g * dot, this.diffuseColor.b * dot));
        }

        return { r: lightSum.r, g: lightSum.g, b:lightSum.b};
    }
}

class Ambientshader
{
    constructor(ambientColor)
    {
        this.ambientColor = ambientColor;
    }

    illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    {
        return this.ambientColor;
    }
}

class MixShader
{
    constructor (one, two, amount)
    {
        this.one = one;
        this.two = two;
        this.amount = amount;
    }
    illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    {
        let _one = this.one.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining);
        let _two = this.two.illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining);

        return {
            r: this.amount * _one.r + (1 - this.amount) * _two.r,
            g: this.amount * _one.g + (1 - this.amount) * _two.g,
            b: this.amount * _one.b + (1 - this.amount) * _two.b
        };
    }
}

class MirrorShader
{
    illuminateObject(rayFrom, rayCollision, normal, collisionObject, remaining)
    {
        if (remaining <= 0)
        {
            return {r: 0, g:0, b:0}
        }

        let original = rayFrom.negate();
        let reflectedRay = original.minus(normal.scale(original.dot(normal) * 2)).norm();

        let newOrigin = rayCollision;
        let newDirection = reflectedRay;

        //TODO: Make closestCollision script in raytracer!
        //FIX THIS ONCE DONE
        //let result = closestCollision(newOrigin, newDirection, collisionObject, 1);

        //
        if (!result)
        {
            return {r:100, r:100, r:100}
        }
    }   
}