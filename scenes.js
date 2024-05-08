//todo: finish later maybe

//Obj strings
let objString = `
v 0.000000 0.000000 0.000000
v 1.000000 0.000000 0.000000
v 0.000000 1.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 0.0000 1.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString = `
v 0.000000 0.000000 0.100000
v 1.000000 0.000000 0.100000
v 0.000000 -1.000000 0.10000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString2 = `
v 0.000000 49.100000 0.000000
v 1.000000 49.100000 0.000000
v 0.000000 48.900000 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString3 = `
v 0.000000 90.100000 0.000000
v 1.000000 90.100000 0.000000
v 0.000000 89.900000 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString4 = `
v 0 0 900.100000 
v 1 0 900.100000 
v 0 -1 890.900000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

let planeString5 = `
v -900.100000 0 0.000000
v -900.100000 1 0.000000
v -890.900000 0 -1.00000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vn 0.0000 1.0000 0.0000
f 1/1/1 2/2/1 3/3/1
`

//Cameras
let orthographicCamera = new Camera(
    new Vector3D(0, 0, 51),
    Vector3D.forward,
    Vector3D.up,
    Camera.Orthographic
)


//Geometries
//Spheres
let sphere1 = new Sphere(new Vector3D(0, 20, 0), 50);
let sphere2 = new Sphere(new Vector3D(0, 20, 0), 50);
let sphere3 = new Sphere(new Vector3D(0, 20, 0), 50);
let sphere4 = new Sphere(new Vector3D(0, 20, 0), 50);
let sphere5 = new Sphere(new Vector3D(0, 20, 0), 50);
let sphere6 = new Sphere(new Vector3D(0, 20, 0), 50);



//lights
let sun = new Light(Vector3D.one, new Vector3D(0, -1, 0));

let lights = [sun];


//Shaders
let diffuseShaderWhite = new DiffuseShader({r:255, g:255, b:255});


//Raytraced objects
let rayTracedSphere1 = new RayTracedObject(sphere1, diffuseShaderWhite);


//Scenes
// let sampleScene = new Scene([], orthographicCamera, lights);
let sampleScene = new Scene([rayTracedSphere1],  orthographicCamera,lights );

if (!sceneIndex) 
{
    sceneIndex = 0;
}

let allScenes = 
[
    sampleScene
]

//Using magic number for now will turn to the commented line later.
//Scene.scene = allScenes[sceneIndex];
// Scene.scene = allScenes[0];
Scene.scene = sampleScene;
console.log(Scene.scene);