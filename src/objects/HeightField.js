import { Geometry, Mesh, DoubleSide, Vector3, Face3 } from 'three'
import HeightFieldShaderMaterial from '../material/HeightFieldShaderMaterial'

class HeightField {
  constructor (width, height, rows, columns, materialOptions) {
    this._width = width
    this._height = height
    this._rows = rows
    this._columns = columns
    this._geometryInfo = this._createHeightField(width, height, rows, columns)
    let geometry = new Geometry()
    geometry.vertices = this._geometryInfo.vertices
    geometry.faces = this._geometryInfo.faces
    geometry.computeBoundingSphere()
    geometry.computeVertexNormals()
    // let material = new HeightFieldShaderMaterial(materialOptions)
    // let material = {}
    this.content = new Mesh(
      geometry, {}
    )
  }

  _createHeightField () {
    let time0 = Date.now()
    let rows = this._rows
    let columns = this._columns
    let width = this._width
    let height = this._height
    let vertices = []
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < columns; ++j) {
        vertices.push(new Vector3(
          -width / 2 + (i / (rows - 1)) * width,
          -height / 2 + (j / (columns - 1)) * height,
          0
        ))
      }
    }
    let time1 = Date.now()
    console.log(time1 - time0)
    let faces = []
    for (let i = 0; i < rows - 1; ++i) {
      for (let j = 0; j < columns - 1; ++j) {
        faces.push(new Face3(
          this.getVerticeIndex(i, j, rows, columns),
          this.getVerticeIndex(i + 1, j + 1, rows, columns),
          this.getVerticeIndex(i + 1, j, rows, columns)
        ))
        faces.push(new Face3(
          this.getVerticeIndex(i + 1, j + 1, rows, columns),
          this.getVerticeIndex(i, j, rows, columns),
          this.getVerticeIndex(i, j + 1, rows, columns)
        ))
      }
    }
    let time2 = Date.now()
    console.log(time2 - time1)
    for (let i = 0; i < rows; ++i) {
      for (let j = 0; j < columns; ++j) {
        let vertice = vertices[this.getVerticeIndex(i, j, rows, columns)]
        vertice.z += this.heightByFormula(vertice.clone(), width, height)
      }
    }

    return {
      vertices,
      faces
    }
  }

  getVerticeIndex (i, j, rows, columns) {
    return i + j * rows
  }

  heightByFormula (vertice) {
    let point = vertice.clone().sub(new Vector3(this._width/2, this._height/2))
    point.z = 0
    let P1 = 0.003
    let P2 = 0.0039999
    let P3 = 0.0059661
    let NRM = 4
    let maxHill = 300
    let SHIFT = 0
    let AMP = 1
    let PIdiv2 = Math.PI / 2
    let len = Math.max(1.,0.0001*point.length())
    let hx = Math.max(0., (Math.sin(P1*(point.x+point.y)) + AMP*Math.sin(P2*point.x+PIdiv2) + SHIFT) )
    let hy = Math.max(0., (Math.sin(P1*(point.y+.5*point.x)) + AMP*Math.sin(P3*point.y+PIdiv2) + SHIFT))
    return maxHill*(hx+hy)/NRM/len
  }

  normalInPoint (pt) {
    let rows = this._rows
    let columns = this._columns
    let width = this._width
    let height = this._height
    let step = 0.001
    let cpt = new Vector3(
      pt.x, pt.y, this.heightByFormula(pt)
    )
    let xpt = new Vector3(
      pt.x + step,
      pt.y,
      0
    )
    xpt.z = this.heightByFormula(xpt)
    let ypt = new Vector3(
      pt.x,
      pt.y + step,
      0
    )
    ypt.z = this.heightByFormula(ypt)
    return new Vector3().crossVectors(
      xpt.sub(cpt), ypt.sub(cpt)
    ).normalize()
  }
}

export default HeightField
