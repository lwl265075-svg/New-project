import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Draggable, useGSAP)

const sketches = Array.from({ length: 12 }, (_, index) => ({
  src: `/assets/sketch-carousel/sketch-${String(index + 1).padStart(2, '0')}.jpg`,
  number: String(index + 1).padStart(2, '0'),
}))

const loopedSketches = Array.from({ length: 3 }, (_, copyIndex) =>
  sketches.map((sketch) => ({ ...sketch, copyIndex })),
).flat()

function SketchCarousel() {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const previousRef = useRef(null)
  const nextRef = useRef(null)

  useGSAP(
    function setupSketchCarousel() {
      const viewport = viewportRef.current
      const track = trackRef.current
      const previousButton = previousRef.current
      const nextButton = nextRef.current

      if (!viewport || !track || !previousButton || !nextButton) return undefined

      const cards = Array.from(track.querySelectorAll('.sketchCard'))

      if (cards.length < sketches.length + 2) return undefined

      const dragProxy = document.createElement('div')
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      let setWidth = 0
      let cardStep = 0
      let position = 0
      let dragStartX = 0
      let dragStartPosition = 0
      let isDragging = false
      let isHovering = false
      let snapTween = null

      const setTrackX = gsap.quickSetter(track, 'x', 'px')

      const render = () => {
        if (!setWidth) return
        position = gsap.utils.wrap(-2 * setWidth, -setWidth, position)
        setTrackX(position)
      }

      const measure = () => {
        const previousSetWidth = setWidth
        const firstCard = cards[0]
        const secondCard = cards[1]
        const firstCardOfMiddleSet = cards[sketches.length]

        setWidth = firstCardOfMiddleSet.offsetLeft - firstCard.offsetLeft
        cardStep = secondCard.offsetLeft - firstCard.offsetLeft

        if (!previousSetWidth) {
          position = -setWidth
        } else {
          const progress = gsap.utils.wrap(0, previousSetWidth, position + previousSetWidth) / previousSetWidth
          position = -setWidth + progress * setWidth
        }

        render()
      }

      const animateTo = (target) => {
        snapTween?.kill()

        if (reduceMotion) {
          position = target
          render()
          return
        }

        const state = { value: position }
        snapTween = gsap.to(state, {
          value: target,
          duration: 0.72,
          ease: 'power3.out',
          overwrite: true,
          onUpdate: () => {
            position = state.value
            render()
          },
          onComplete: render,
        })
      }

      const snapToNearestCard = () => {
        if (!cardStep) return
        animateTo(Math.round(position / cardStep) * cardStep)
      }

      const moveByCard = (direction) => {
        if (!cardStep) return
        animateTo(Math.round(position / cardStep) * cardStep - direction * cardStep)
      }

      const onPrevious = () => moveByCard(-1)
      const onNext = () => moveByCard(1)
      const onPointerEnter = () => {
        isHovering = true
      }
      const onPointerLeave = () => {
        isHovering = false
      }

      previousButton.addEventListener('click', onPrevious)
      nextButton.addEventListener('click', onNext)
      viewport.addEventListener('pointerenter', onPointerEnter)
      viewport.addEventListener('pointerleave', onPointerLeave)

      const draggable = Draggable.create(dragProxy, {
        type: 'x',
        trigger: viewport,
        cursor: 'none',
        activeCursor: 'none',
        minimumMovement: 4,
        onPress() {
          snapTween?.kill()
          isDragging = true
          dragStartX = this.x
          dragStartPosition = position
          viewport.classList.add('is-dragging')
        },
        onDrag() {
          position = dragStartPosition + this.x - dragStartX
          render()
        },
        onRelease() {
          isDragging = false
          viewport.classList.remove('is-dragging')
          snapToNearestCard()
        },
      })[0]

      const tick = (_, deltaTime) => {
        if (reduceMotion || isDragging || isHovering || snapTween?.isActive()) return
        position -= deltaTime * 0.026
        render()
      }

      const resizeObserver = new ResizeObserver(measure)
      resizeObserver.observe(viewport)
      gsap.ticker.add(tick)
      measure()

      return () => {
        previousButton.removeEventListener('click', onPrevious)
        nextButton.removeEventListener('click', onNext)
        viewport.removeEventListener('pointerenter', onPointerEnter)
        viewport.removeEventListener('pointerleave', onPointerLeave)
        resizeObserver.disconnect()
        gsap.ticker.remove(tick)
        snapTween?.kill()
        draggable.kill()
      }
    },
    { scope: rootRef },
  )

  return (
    <section className="section sketchSection" id="sketches" ref={rootRef}>
      <div className="sectionHead split sketchSectionHead">
        <div>
          <span>03 / Sketch Archive</span>
          <h2>手绘探索</h2>
        </div>
        <div className="sketchSectionIntro">
          <p>从形态草图、结构推演到场景表达，记录设计概念从模糊线索逐步走向清晰方案的过程。</p>
          <div className="sketchControls" aria-label="手绘轮播控制">
            <span>Drag to explore / 12 sketches</span>
            <button ref={previousRef} type="button" aria-label="上一张手绘">
              <ArrowLeft size={17} />
            </button>
            <button ref={nextRef} type="button" aria-label="下一张手绘">
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="sketchCarousel" ref={viewportRef}>
        <div className="sketchCarouselTrack" ref={trackRef}>
          {loopedSketches.map((sketch) => (
            <figure
              className="sketchCard"
              key={`${sketch.copyIndex}-${sketch.number}`}
              aria-hidden={sketch.copyIndex !== 1}
            >
              <div className="sketchCardImage">
                <img
                  src={sketch.src}
                  alt={sketch.copyIndex === 1 ? `工业设计手绘作品 ${sketch.number}` : ''}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </div>
              <figcaption>
                <strong>HAND SKETCH / {sketch.number}</strong>
                <span>FORM · STRUCTURE · SCENARIO</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SketchCarousel
