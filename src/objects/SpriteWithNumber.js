import { Sprite, SpriteMaterial, CanvasTexture, Texture } from 'three'

let createSpriteWithNumber = () => {
  let canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, 512, 256)
  ctx.fillStyle = 'red'
  ctx.font = '300px Arial'
  let map = new Texture(canvas)
  map.needsUpdate = true
  let sprite = new Sprite(
    new SpriteMaterial({map, color: 0xffffff})
  )
  sprite.material.needsUpdate = true
  sprite.needsUpdate = true
  sprite.needsUpdate = true
  sprite.scale.set(2, 1, 1)
  // console.log(canvas, ctx, map, sprite)
  return {
    sprite,
    drawNumber: (number, mode = 0) => {
      ctx.clearRect(0, 0, 512, 256)
      ctx.fillStyle = 'red'
      ctx.font = '300px Arial'
      ctx.fillText(number, mode === 0 ? 40 + 128 : 60, 256 - 20)
      sprite.material.map.needsUpdate = true
      sprite.material.needsUpdate = true
      sprite.needsUpdate = true
    }
  }
}

export { createSpriteWithNumber }
