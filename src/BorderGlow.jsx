import React, { useEffect, useRef } from 'react'
import './BorderGlow.css'

function parseHsl(value) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 18, s: 95, l: 58 }
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) }
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHsl(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const clampedIntensity = Math.min(Math.max(intensity, 0), 1)
  const alpha = (value) => Math.min(Math.max(value * clampedIntensity, 0), 1).toFixed(3)

  return {
    '--glow-fill-color': `hsl(${base} / ${alpha(0.24)})`,
    '--glow-border-color': `hsl(${base} / ${alpha(0.56)})`,
    '--glow-edge-color': `hsl(${base} / ${alpha(0.18)})`,
  }
}

export default function BorderGlow({
  children,
  className = '',
  glowColor = '18 95 58',
  backgroundColor = '#181512',
  borderRadius = 0,
  glowRadius = 28,
  glowIntensity = 0.65,
  animated = false,
  fillOpacity = 0.12,
}) {
  const cardRef = useRef(null)
  const rectRef = useRef(null)
  const rafRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })

  const writeGlowPosition = () => {
    const card = cardRef.current
    const rect = rectRef.current
    if (!card || !rect) {
      rafRef.current = 0
      return
    }

    const x = Math.min(Math.max(pointerRef.current.x, 0), rect.width)
    const y = Math.min(Math.max(pointerRef.current.y, 0), rect.height)

    card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`)
    card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`)
    rafRef.current = 0
  }

  const queueGlowPosition = (event) => {
    const card = cardRef.current
    if (!card) return

    if (!rectRef.current) rectRef.current = card.getBoundingClientRect()
    pointerRef.current = {
      x: event.clientX - rectRef.current.left,
      y: event.clientY - rectRef.current.top,
    }

    if (!rafRef.current) rafRef.current = requestAnimationFrame(writeGlowPosition)
  }

  const handlePointerEnter = (event) => {
    const card = cardRef.current
    if (!card) return

    rectRef.current = card.getBoundingClientRect()
    card.dataset.glowActive = 'true'
    queueGlowPosition(event)
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    rafRef.current = 0
    rectRef.current = null
    if (card) delete card.dataset.glowActive
  }

  useEffect(() => {
    const card = cardRef.current
    if (!animated || !card) return undefined

    card.classList.add('sweep-active')
    card.style.setProperty('--mouse-x', '82%')
    card.style.setProperty('--mouse-y', '18%')
    const timeout = window.setTimeout(() => card.classList.remove('sweep-active'), 760)

    return () => {
      window.clearTimeout(timeout)
      card.classList.remove('sweep-active')
    }
  }, [animated])

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`borderGlowCard ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={queueGlowPosition}
      onPointerLeave={handlePointerLeave}
      style={{
        '--card-bg': backgroundColor,
        '--border-radius': `${borderRadius}px`,
        '--glow-size': `${Math.max(300, glowRadius * 15)}px`,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
      }}
    >
      <span className="edgeLight" />
      <div className="borderGlowInner">{children}</div>
    </div>
  )
}
