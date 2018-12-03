// import OBJLoader from 'three/examples/js/loaders/OBJLoader'
// import MTLLoader from 'three/examples/js/loaders/MTLLoader'

let loadmtl = (mtlpath, onLoad, onProgress, onError) => {
  new THREE.MTLLoader()
    .load(mtlpath, onLoad, onProgress, onError)
}
let loadobj = (objpath, materials, onLoad, onProgress, onError) => {
  new THREE.OBJLoader()
    .setMaterials(materials)
    .load(objpath, onLoad, onProgress, onError)
}
let loadmtlobj = (mtlpath, objpath, onLoad, onError) => {
  loadmtl(mtlpath, (materials) => {
    console.log(materials)
    loadobj(objpath, materials, onLoad, undefined, onError)
  }, undefined, onError)
}

export {
  loadmtl,
  loadobj,
  loadmtlobj
}
