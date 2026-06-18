import React, { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: true })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let pixelRatio = 1
    let dotSpacing = 25
    let dotColumns = 0
    let dotRows = 0
    let dotCount = 0
    let dotX
    let dotY
    let dotRadius
    let dotOffsetX
    let dotOffsetY
    let dotVelocityX
    let dotVelocityY

    const fieldCell = 30
    let fieldColumns = 0
    let fieldRows = 0
    let fieldVelocityX
    let fieldVelocityY
    let nextFieldVelocityX
    let nextFieldVelocityY

    let frameId = 0
    let lastTime = performance.now()
    let pointerX = 0
    let pointerY = 0
    let previousPointerX = 0
    let previousPointerY = 0
    let pendingX = 0
    let pendingY = 0
    let pointerActive = false

    const fieldIndex = (column, row) => row * fieldColumns + column

    const buildField = () => {
      fieldColumns = Math.ceil(width / fieldCell) + 3
      fieldRows = Math.ceil(height / fieldCell) + 3
      const fieldCount = fieldColumns * fieldRows
      fieldVelocityX = new Float32Array(fieldCount)
      fieldVelocityY = new Float32Array(fieldCount)
      nextFieldVelocityX = new Float32Array(fieldCount)
      nextFieldVelocityY = new Float32Array(fieldCount)
    }

    const buildDots = () => {
      dotColumns = Math.ceil(width / dotSpacing) + 3
      dotRows = Math.ceil(height / dotSpacing) + 3
      dotCount = dotColumns * dotRows
      dotX = new Float32Array(dotCount)
      dotY = new Float32Array(dotCount)
      dotRadius = new Float32Array(dotCount)
      dotOffsetX = new Float32Array(dotCount)
      dotOffsetY = new Float32Array(dotCount)
      dotVelocityX = new Float32Array(dotCount)
      dotVelocityY = new Float32Array(dotCount)

      let index = 0
      for (let row = 0; row < dotRows; row += 1) {
        for (let column = 0; column < dotColumns; column += 1) {
          dotX[index] = (column - 1) * dotSpacing
          dotY[index] = (row - 1) * dotSpacing
          const tone = Math.sin(column * 2.17 + row * 0.83) * 0.5 + 0.5
          dotRadius[index] = 0.72 + tone * 0.28
          index += 1
        }
      }
    }

    const drawStatic = () => {
      context.clearRect(0, 0, width, height)
      context.beginPath()
      for (let index = 0; index < dotCount; index += 1) {
        const x = dotX[index]
        const y = dotY[index]
        context.moveTo(x + dotRadius[index], y)
        context.arc(x, y, dotRadius[index], 0, Math.PI * 2)
      }
      context.fillStyle = 'rgba(239, 233, 226, 0.19)'
      context.fill()
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      dotSpacing = width < 900 ? 23 : 25
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      buildField()
      buildDots()
      drawStatic()
    }

    const onPointerMove = (event) => {
      if (!pointerActive) {
        pointerActive = true
        pointerX = event.clientX
        pointerY = event.clientY
        previousPointerX = pointerX
        previousPointerY = pointerY
        return
      }

      pointerX = event.clientX
      pointerY = event.clientY
      pendingX += pointerX - previousPointerX
      pendingY += pointerY - previousPointerY
      previousPointerX = pointerX
      previousPointerY = pointerY
    }

    const onPointerLeave = () => {
      pointerActive = false
    }

    const injectPointerFlow = () => {
      const movement = Math.hypot(pendingX, pendingY)
      if (!pointerActive || movement < 0.08) return

      const centerColumn = pointerX / fieldCell + 1
      const centerRow = pointerY / fieldCell + 1
      const radius = 5.25
      const minColumn = Math.max(1, Math.floor(centerColumn - radius))
      const maxColumn = Math.min(fieldColumns - 2, Math.ceil(centerColumn + radius))
      const minRow = Math.max(1, Math.floor(centerRow - radius))
      const maxRow = Math.min(fieldRows - 2, Math.ceil(centerRow + radius))
      const directionX = pendingX / movement
      const directionY = pendingY / movement
      const strength = Math.min(22, movement) * 0.34

      for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
          const dx = column - centerColumn
          const dy = row - centerRow
          const distance = Math.hypot(dx, dy)
          if (distance >= radius) continue

          const falloff = Math.pow(1 - distance / radius, 2.15)
          const index = fieldIndex(column, row)
          const side = dx * -directionY + dy * directionX
          const curl = side * 0.035
          fieldVelocityX[index] += (directionX - directionY * curl) * strength * falloff
          fieldVelocityY[index] += (directionY + directionX * curl) * strength * falloff
        }
      }

      pendingX *= 0.16
      pendingY *= 0.16
    }

    const updateField = (delta) => {
      injectPointerFlow()
      const diffusion = 0.17 * delta
      const damping = Math.pow(0.944, delta)

      nextFieldVelocityX.fill(0)
      nextFieldVelocityY.fill(0)

      for (let row = 1; row < fieldRows - 1; row += 1) {
        for (let column = 1; column < fieldColumns - 1; column += 1) {
          const index = fieldIndex(column, row)
          const left = fieldIndex(column - 1, row)
          const right = fieldIndex(column + 1, row)
          const top = fieldIndex(column, row - 1)
          const bottom = fieldIndex(column, row + 1)
          const averageX = (fieldVelocityX[left] + fieldVelocityX[right] + fieldVelocityX[top] + fieldVelocityX[bottom]) * 0.25
          const averageY = (fieldVelocityY[left] + fieldVelocityY[right] + fieldVelocityY[top] + fieldVelocityY[bottom]) * 0.25

          nextFieldVelocityX[index] = (fieldVelocityX[index] + (averageX - fieldVelocityX[index]) * diffusion) * damping
          nextFieldVelocityY[index] = (fieldVelocityY[index] + (averageY - fieldVelocityY[index]) * diffusion) * damping
        }
      }

      ;[fieldVelocityX, nextFieldVelocityX] = [nextFieldVelocityX, fieldVelocityX]
      ;[fieldVelocityY, nextFieldVelocityY] = [nextFieldVelocityY, fieldVelocityY]
    }

    const sampleField = (x, y) => {
      const fieldX = clamp(x / fieldCell + 1, 1, fieldColumns - 2.001)
      const fieldY = clamp(y / fieldCell + 1, 1, fieldRows - 2.001)
      const column = Math.floor(fieldX)
      const row = Math.floor(fieldY)
      const fractionX = fieldX - column
      const fractionY = fieldY - row
      const topLeft = fieldIndex(column, row)
      const topRight = fieldIndex(column + 1, row)
      const bottomLeft = fieldIndex(column, row + 1)
      const bottomRight = fieldIndex(column + 1, row + 1)
      const topX = fieldVelocityX[topLeft] + (fieldVelocityX[topRight] - fieldVelocityX[topLeft]) * fractionX
      const bottomX = fieldVelocityX[bottomLeft] + (fieldVelocityX[bottomRight] - fieldVelocityX[bottomLeft]) * fractionX
      const topY = fieldVelocityY[topLeft] + (fieldVelocityY[topRight] - fieldVelocityY[topLeft]) * fractionX
      const bottomY = fieldVelocityY[bottomLeft] + (fieldVelocityY[bottomRight] - fieldVelocityY[bottomLeft]) * fractionX

      return [
        topX + (bottomX - topX) * fractionY,
        topY + (bottomY - topY) * fractionY,
      ]
    }

    const draw = (timestamp) => {
      const delta = clamp((timestamp - lastTime) / 16.67, 0.35, 1.8)
      lastTime = timestamp
      updateField(delta)
      context.clearRect(0, 0, width, height)
      context.beginPath()

      for (let index = 0; index < dotCount; index += 1) {
        const baseX = dotX[index]
        const baseY = dotY[index]
        const [flowX, flowY] = sampleField(baseX + dotOffsetX[index], baseY + dotOffsetY[index])

        dotVelocityX[index] += (flowX * 0.115 - dotOffsetX[index] * 0.052) * delta
        dotVelocityY[index] += (flowY * 0.115 - dotOffsetY[index] * 0.052) * delta
        dotVelocityX[index] *= Math.pow(0.875, delta)
        dotVelocityY[index] *= Math.pow(0.875, delta)
        dotOffsetX[index] += dotVelocityX[index] * delta
        dotOffsetY[index] += dotVelocityY[index] * delta

        const x = baseX + dotOffsetX[index]
        const y = baseY + dotOffsetY[index]
        const radius = dotRadius[index]
        context.moveTo(x + radius, y)
        context.arc(x, y, radius, 0, Math.PI * 2)
      }

      context.fillStyle = 'rgba(239, 233, 226, 0.19)'
      context.fill()
      pendingX *= 0.58
      pendingY *= 0.58

      if (!reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(draw)
      }
    }

    const startAnimation = () => {
      cancelAnimationFrame(frameId)
      if (reducedMotion.matches || document.hidden) {
        drawStatic()
        return
      }
      lastTime = performance.now()
      frameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', startAnimation)
    reducedMotion.addEventListener('change', startAnimation)
    resize()
    startAnimation()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', startAnimation)
      reducedMotion.removeEventListener('change', startAnimation)
    }
  }, [])

  return <canvas ref={canvasRef} className="ambientCanvas" aria-hidden="true" />
}
