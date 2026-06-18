import React, { useState } from 'react'
import FallingText from './FallingText.jsx'

const HoverRestoreFallingText = ({ text, highlightWords }) => {
  const [isRestored, setIsRestored] = useState(false)

  return (
    <div
      className={`profileIntroCard ${isRestored ? 'is-restored' : 'is-fallen'}`}
      onMouseEnter={() => setIsRestored(true)}
      onMouseLeave={() => setIsRestored(false)}
    >
      <FallingText
        className="profileIntroFalling"
        text={text}
        highlightWords={highlightWords}
        highlightClass="falling-text-highlight"
        trigger="auto"
        restored={isRestored}
        gravity={0.68}
        floorRatio={0.94}
        fontSize="clamp(18px, 1.45vw, 23px)"
        mouseConstraintStiffness={0.28}
        wordSpacing="1px"
      />
    </div>
  )
}

export default HoverRestoreFallingText
