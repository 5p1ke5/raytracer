"use strict"

function evenRand(amount)
{
    return (Math.random() * 2 - 1) * amount;
}

async function main()
{
    let canvas = document.querySelector("canvas");
    canvas.width = width * 2;
    canvas.height = height;
    let context = canvas.getContext("2d");

    let image = Array.from(Array(width), () => new Array(height))
    let noise = Array.from(Array(width), () => new Array(height))
    let maxIteration = 0;
    let minCount = 5;
    let stop = samples;
    let noiseMax = 50;

    for (let i = 0; i < stop; i++)
    {
        for (let y = 0; y < height; y++)
        {
            setTimeout(()=> {
                for (let x = 0; x < height; x++)
                {
                        if (!image[x][y])
                        {
                            image[x][y] = [];
                        }
                        if (!noise[x][y])
                        {
                            noise[x][y] = 0;
                        }
                    let entry = image[x][y];
                    let count = entry.length;
                    if (count > minCount)
                    {
                        let noop;
                        if (noise[x][y] < noiseMax)
                        {
                            continue; 
                        }
                    }
                    if (x == 200 && y == 0)
                    {
                        let noop;
                    }

                    let color = render(x, y, jitterAmount);
                }
            })
        }
    }
}

function render (x, y, jitterAmount)
{
    let backgroundColor = Scene.scene?.options?.backgroundColor ?  Scene.scene.options.backgroundColor : new Vector3D(100, 100, 100)

    if (x == 170 && y == 148)
    {
        let noop;
    }

    //Color of the closest collision
    let rayTracedPixel = backgroundColor;

    let startX = x - width/2;
    let startY = y - height/2;

    //TODO: Scene.scene is returning undefined. This is because I have no scenes.js file. Fix this.
    let origin = Scene.scene.camera.getOrigin(startX, startY);
    let direction = Scene.scene.camera.getDirection(startX / (width / 2), startY / (height / 2));

    let jittered = direction.add(new Vector3 (evenRand(jitterAmount), evenRand(jitterAmount), evenRand(jitterAmount)));

    direction = jittered;

    let result = closestCollision(origin, direction, null, 1);
    if (!result)
    {
        return rayTracedPixel;
    }

    rayTracedPixel = result.rayTracedObject.shader.illuminateObject
    (
        origin, 
        result.collisionLocation,
        result.normalAtCollision,
        result.rayTracedObject,
        10
    );

    return rayTracedPixel;
}


function closestCollision(origin, direction, ignored = null, remaining = 1)
{
    if (remaining <= 0)
    {
        return;
    }

    let closestPositiveT = Number.MAX_VALUE;
    let closestCollision;

    //Gets the color of the closest collision
    for (let rayTracedObject of Scene.scene.objects)
    {
        if (rayTracedObject == ignored) 
        {
            continue;
        }
        

        let geometry = rayTracedObject.geometry;

        //Finds the intersection with the geoemtry
        let collision = geometry.intersect(origin, direction);

        //If the collision exists and is closer than other collisions
        if (collision && collision.timeToCollision < closestPositiveT)
        {
            closestPositiveT = collision.timeToCollision;
            collision.rayTracedObject = rayTracedObject;

            closestCollision = collision;

            let c = collision.collisionLocation;
            let normal = collision.normalAtCollision;
        }
    }

    return closestCollision;
}

main();