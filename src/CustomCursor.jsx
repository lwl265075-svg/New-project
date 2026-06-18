import React, { useEffect, useRef } from 'react'

const interactiveSelector = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '.projectCard',
  '.projectCard--clickable',
  '.clickable',
  '[data-cursor="interactive"]',
].join(',')

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return undefined

    let frameId = 0
    let targetX = window.innerWidth * 0.5
    let targetY = window.innerHeight * 0.5
    let currentX = targetX
    let currentY = targetY
    let currentScale = 1
    let targetScale = 1
    let visible = false
    let isInteractive = false
    let isPressed = false

    const render = () => {
      currentX += (targetX - currentX) * 0.2
      currentY += (targetY - currentY) * 0.2
      targetScale = isPressed ? 0.88 : isInteractive ? 1.55 : 1
      currentScale += (targetScale - currentScale) * 0.22
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`
      frameId = requestAnimationFrame(render)
    }

    const onPointerMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY

      if (!visible) {
        visible = true
        currentX = targetX
        currentY = targetY
        cursor.dataset.visible = 'true'
      }

      const nextInteractive = Boolean(event.target.closest(interactiveSelector))
      if (nextInteractive !== isInteractive) {
        isInteractive = nextInteractive
        cursor.dataset.interactive = String(isInteractive)
      }
    }

    const onPointerDown = () => {
      isPressed = true
      cursor.dataset.pressed = 'true'
    }

    const onPointerUp = () => {
      isPressed = false
      cursor.dataset.pressed = 'false'
    }

    const onPointerLeave = () => {
      visible = false
      isInteractive = false
      isPressed = false
      cursor.dataset.visible = 'false'
      cursor.dataset.interactive = 'false'
      cursor.dataset.pressed = 'false'
    }

    const onPointerEnter = () => {
      if (visible) cursor.dataset.visible = 'true'
    }

    document.documentElement.classList.add('hasCustomCursor')
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('pointerup', onPointerUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.documentElement.addEventListener('pointerenter', onPointerEnter)
    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      document.documentElement.classList.remove('hasCustomCursor')
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.documentElement.removeEventListener('pointerenter', onPointerEnter)
    }
  }, [])

  return <span ref={cursorRef} className="customCursor" aria-hidden="true" />
}
