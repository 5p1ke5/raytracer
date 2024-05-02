class Scene
{
    static scene;
    constructor(objects, camera, lights, options = {})
    {
        this.objects = objects;
        this.camera = camera;
        this.lights = lights;
        this.options = options;
    }
}