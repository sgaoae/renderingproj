import { Object3D, Mesh, BoxGeometry,
  MeshBasicMaterial, Geometry, Vector3,
  Line, LineBasicMaterial } from 'three'

class Actor extends Object3D {
  constructor () {
    super()
    this.add(
      new Mesh(
        new BoxGeometry(10, 10, 10),
        new MeshBasicMaterial({
          color: 0x0000ff
        })
      )
    )
    let linegeo = new Geometry()
    linegeo.vertices.push(
      new Vector3(0, 0, 0),
      new Vector3(0, 0, -30)
    )
    this.add(
      new Line(
        linegeo, new LineBasicMaterial({
          color: 0xff0000
        })
      )
    )
    // this.add(new AxesHelper(30))
  }
}

export default Actor
