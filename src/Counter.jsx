import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import React, { useEffect } from 'react'
import './Counter.css'

const CounterNumber = ({ number, placeValue, height }) => {
  const y = useTransform(placeValue, (latest) => {
    const current = latest % 10
    const offset = (10 + number - current) % 10
    return (offset > 5 ? offset - 10 : offset) * height
  })

  return (
    <motion.span className="counter-number" style={{ height, y }}>
      {number}
    </motion.span>
  )
}

const CounterDigit = ({ place, value, height }) => {
  const placeValue = useTransform(value, (latest) => Math.floor(latest / place))

  return (
    <span className="counter-digit" style={{ height }} aria-hidden="true">
      {Array.from({ length: 10 }, (_, number) => (
        <CounterNumber number={number} placeValue={placeValue} height={height} key={number} />
      ))}
    </span>
  )
}

const Counter = ({
  value,
  places = [10, 1],
  fontSize = 48,
  padding = 4,
  gap = 2,
  textColor = 'inherit',
  fontWeight = 500,
  gradientHeight = 10,
  gradientFrom = 'transparent',
  gradientTo = 'transparent',
  className = '',
}) => {
  const reduceMotion = useReducedMotion()
  const target = useMotionValue(0)
  const animatedValue = useSpring(target, {
    stiffness: 72,
    damping: 19,
    mass: 0.75,
  })
  const digitHeight = fontSize + padding * 2

  useEffect(() => {
    if (reduceMotion) {
      animatedValue.jump(value)
    } else {
      target.set(value)
    }
  }, [animatedValue, reduceMotion, target, value])

  return (
    <span
      className={`counter ${className}`}
      style={{
        '--counter-font-size': `${fontSize}px`,
        '--counter-font-weight': fontWeight,
        '--counter-gap': `${gap}px`,
        '--counter-color': textColor,
        '--counter-gradient-height': `${gradientHeight}px`,
        '--counter-gradient-from': gradientFrom,
        '--counter-gradient-to': gradientTo,
      }}
      role="img"
      aria-label={String(value)}
    >
      {places.map((place) => (
        <CounterDigit place={place} value={animatedValue} height={digitHeight} key={place} />
      ))}
      <span className="counter-gradient counter-gradient-top" aria-hidden="true" />
      <span className="counter-gradient counter-gradient-bottom" aria-hidden="true" />
    </span>
  )
}

export default Counter
