class Mesh 
{
    //Takes an obj file and makes aa big mesh.
    static fromObj(string)
    {
        //parse the striing
        let lines = string.split('\n');

        let vertices = [];
        let uvs = [];
        let norms = [];
        let faces = [];

        // loop over the lines
        for (let line of lines)
        {
            //remove extra whitespace
            let trimmedLine = line.trim();

            //Ignores all-whitespace lines
            if (trimmedLine.length == 0)
            {
                continue;
            }

            let parts = line.trim().split(" ");

            let header = parts[0].trim();

            //vertices
            if (header == 'v')
            {
                vertices.push(new Vector3D(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }

            //uvs
            if (header == 'vt')
            {
                uvs.push(new Vector3D(parseFloat(parts[1]), parseFloat(parts[2])));
            }

            //norms
            if (header == 'vn')
            {
                norms.push(new Vector3D(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
            }

            //faces
            if (header == 'f')
            {
                let face = 
                {
                    points: []
                }

                for (let i = 1; i <= 3; i++)
                {
                    first = parts[i];

                    let coords = first.split('/');
                    let vertexIndex = parseInt(coords[0].trim()) - 1;
                    let uvIndex = parseInt(coords[1].trim()) - 1;
                    let normIndex = parseInt(coords[2].trim()) - 1;

                    let newVertex = new Vertex(vertices[vertexIndex], uvs[uvIndex], norms[normIndex]);
                    face.points.push(newVertex);
                }
                faces.push(face);
            }
        }

        //Generate triangle
        let triangle = new Triangle(faces[0].points[0], faces[0].points[1], faces[0].points[2]);

        //Use it to make am esh
        let mesh = new Mesh([triangle]);
        return mesh;
    }


    //Constructs a new mesh from an array of triangles.
    constructor (triangles)
    {
        this.triangles = triangles;
    }

    //Finds intersection between the passed ray and this mesh.
    intersect(rayOrigin, rayDirection)
    {
        let closest = Number.MAX_VALUE; //will have closest collision distance
        let best = undefined; //will have the closest collision object.

        //Goes through all triangles in the mesh and finds the intersect.
        for (let triangle of this.triangles)
        {
            let intersection = triangle.intersect(rayOrigin, rayDirection);

            //If an intersect exists
            if (intersection)
            {
                if (intersection.timeToCollision< closest)
                {
                    best = intersection;
                    closest = intersection.timeToCollision;
                }
            }
        }

        if (best)
        {
            return best;
        }
        else
        {
            return;
        }
    }
}