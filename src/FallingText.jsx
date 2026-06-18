import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import Matter from 'matter-js'
import './FallingText.css'

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const FallingText = ({
  className = '',
  text = '',
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'auto',
  restored = false,
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  wordSpacing = '2px',
  floorRatio = 1,
}) => {
  const containerRef = useRef(null)
  const tokenRefs = useRef([])
  const restoredRef = useRef(restored)
  const [effectStarted, setEffectStarted] = useState(trigger === 'auto')
  const [isReady, setIsReady] = useState(false)

  restoredRef.current = restored

  const tokens = useMemo(() => {
    const highlights = [...highlightWords].sort((a, b) => b.length - a.length)
    const highlightPattern = highlights.map(escapeRegExp).join('|')
    const splitPattern = new RegExp(`(${highlightPattern}|\\s+|[，。；：！？、])`, 'g')
    const roughTokens = text.split(splitPattern).filter(Boolean)
    const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
      ? new Intl.Segmenter('zh-CN', { granularity: 'word' })
      : null

    return roughTokens.flatMap((token) => {
      if (highlights.includes(token) || /^\s+$/.test(token) || /^[，。；：！？、]$/.test(token)) {
        return token
      }
      return segmenter ? [...segmenter.segment(token)].map(({ segment }) => segment) : [token]
    })
  }, [text, highlightWords])

  useLayoutEffect(() => {
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setEffectStarted(true)
          observer.disconnect()
        }
      }, { threshold: 0.1 })
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }

    return undefined
  }, [trigger])

  useLayoutEffect(() => {
    if (!effectStarted || !containerRef.current) return undefined

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height
    if (width <= 0 || height <= 0) return undefined

    const engine = Matter.Engine.create()
    engine.world.gravity.y = gravity

    const boundaryOptions = { isStatic: true, render: { visible: wireframes } }
    const floorY = height * floorRatio
    const boundaries = [
      Matter.Bodies.rectangle(width / 2, floorY + 20, width, 40, boundaryOptions),
      Matter.Bodies.rectangle(-24, height / 2, 48, height, boundaryOptions),
      Matter.Bodies.rectangle(width + 24, height / 2, 48, height, boundaryOptions),
      Matter.Bodies.rectangle(width / 2, -24, width, 48, boundaryOptions),
    ]

    const wordBodies = tokenRefs.current.filter(Boolean).map((element) => {
      const rect = element.getBoundingClientRect()
      const target = {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        angle: 0,
      }
      const body = Matter.Bodies.rectangle(
        target.x,
        target.y,
        Math.max(rect.width, 4),
        Math.max(rect.height, 4),
        {
          restitution: 0.62,
          frictionAir: 0.018,
          friction: 0.22,
          render: { fillStyle: backgroundColor },
        },
      )
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2.4, y: 0 })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.025)
      return { element, body, target }
    })

    wordBodies.forEach(({ element, body }) => {
      element.style.position = 'absolute'
      element.style.left = `${body.position.x}px`
      element.style.top = `${body.position.y}px`
      element.style.margin = '0'
      element.style.transform = 'translate(-50%, -50%)'
    })

    const mouse = Matter.Mouse.create(container)
    // Matter's Mouse helper prevents wheel scrolling on its source element.
    // Keep pointer interaction for the words, but let page scroll pass through.
    if (mouse.mousewheel && mouse.element) {
      mouse.element.removeEventListener('wheel', mouse.mousewheel)
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    }
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })

    Matter.World.add(engine.world, [
      ...boundaries,
      ...wordBodies.map(({ body }) => body),
      mouseConstraint,
    ])

    let animationFrame
    let wasRestored = restoredRef.current
    let lastTime = performance.now()

    const updateWords = (time) => {
      const delta = Math.min(time - lastTime, 32)
      lastTime = time
      const isRestoring = restoredRef.current

      if (isRestoring) {
        engine.world.gravity.y = 0

        if (!wasRestored) {
          wordBodies.forEach(({ body }) => {
            Matter.Body.setStatic(body, true)
            Matter.Body.setVelocity(body, { x: 0, y: 0 })
            Matter.Body.setAngularVelocity(body, 0)
          })
        }

        const restoreEase = 1 - Math.pow(0.001, delta / 620)
        wordBodies.forEach(({ body, target }) => {
          const dx = target.x - body.position.x
          const dy = target.y - body.position.y
          Matter.Body.setPosition(body, {
            x: body.position.x + dx * restoreEase,
            y: body.position.y + dy * restoreEase,
          })
          Matter.Body.setAngle(body, body.angle * (1 - restoreEase))

          if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2 && Math.abs(body.angle) < 0.003) {
            Matter.Body.setPosition(body, target)
            Matter.Body.setAngle(body, 0)
          }
        })
      } else {
        engine.world.gravity.y = gravity
        if (wasRestored) {
          wordBodies.forEach(({ body }) => {
            Matter.Body.setStatic(body, false)
            Matter.Sleeping.set(body, false)
            Matter.Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 1.5,
              y: 0.8 + Math.random() * 0.8,
            })
          })
        }
      }

      wasRestored = isRestoring
      if (!isRestoring) Matter.Engine.update(engine, delta)

      wordBodies.forEach(({ body, element }) => {
        element.style.left = `${body.position.x}px`
        element.style.top = `${body.position.y}px`
        element.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })

      animationFrame = requestAnimationFrame(updateWords)
    }

    setIsReady(true)
    animationFrame = requestAnimationFrame(updateWords)

    return () => {
      cancelAnimationFrame(animationFrame)
      Matter.Mouse.clearSourceEvents(mouse)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
  }, [effectStarted, gravity, backgroundColor, wireframes, mouseConstraintStiffness, floorRatio])

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true)
    }
  }

  let wordIndex = 0

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${isReady ? 'is-ready' : ''} ${restored ? 'is-restoring' : 'is-falling'} ${className}`}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      style={{ fontSize }}
    >
      <div className="falling-text-target">
        {tokens.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span className="falling-text-space" key={`${token}-${index}`}>{token}</span>
          }

          const currentWordIndex = wordIndex
          wordIndex += 1
          const isHighlighted = highlightWords.includes(token)
          return (
            <span
              ref={(element) => { tokenRefs.current[currentWordIndex] = element }}
              className={`falling-text-word ${isHighlighted ? highlightClass : ''}`}
              style={{ marginInline: wordSpacing }}
              key={`${token}-${index}`}
            >
              {token}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default FallingText
