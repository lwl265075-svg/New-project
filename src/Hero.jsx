import React, { useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

const navItems = [
  { label: '经历', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

const revealArea = {
  left: 42,
  top: 6,
  right: 90,
  bottom: 86,
}

export default function Hero() {
  const [isRevealing, setIsRevealing] = useState(false)
  const heroRef = useRef(null)
  const portraitStackRef = useRef(null)

  const handleHeroPointerMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const hero = heroRef.current
    const portraitStack = portraitStackRef.current
    if (!hero || !portraitStack) return

    const heroBounds = hero.getBoundingClientRect()
    const heroX = ((event.clientX - heroBounds.left) / heroBounds.width) * 100
    const heroY = ((event.clientY - heroBounds.top) / heroBounds.height) * 100
    const insideRevealArea =
      heroX >= revealArea.left &&
      heroX <= revealArea.right &&
      heroY >= revealArea.top &&
      heroY <= revealArea.bottom

    setIsRevealing(insideRevealArea)
    if (!insideRevealArea) return

    const bounds = portraitStack.getBoundingClientRect()
    const x = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100))
    const y = Math.min(100, Math.max(0, ((event.clientY - bounds.top) / bounds.height) * 100))
    heroRef.current?.style.setProperty('--portrait-reveal-x', `${x}%`)
    heroRef.current?.style.setProperty('--portrait-reveal-y', `${y}%`)
  }

  return (
    <section
      ref={heroRef}
      className={`hero home-hero heroEditorialPage js-page-intro${isRevealing ? ' is-revealing' : ''}`}
      id="top"
      onPointerMoveCapture={handleHeroPointerMove}
      onPointerLeave={() => setIsRevealing(false)}
    >
      <div className="heroBackdrop" aria-hidden="true" />
      <div ref={portraitStackRef} className="heroPortraitStack home-hero__portrait-stack">
        <img
          className="heroPortraitBottom home-hero__bottom"
          src="/assets/hero-hover-portrait.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="heroPortraitFront home-hero__front"
          src="/assets/hero-portrait.jpg"
          alt="蓝炜亮个人肖像"
        />
      </div>
      <div className="heroShade" aria-hidden="true" />

      <header className="siteNav js-home-nav">
        <a className="brand" href="#top" aria-label="回到首页">
          <span>WIIILLY</span>
          <small>PORTFOLIO / 2026</small>
        </a>
        <nav className="hoverFadeGroup" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="navContact" href="mailto:1556832642@qq.com">
          CONTACT
          <ArrowUpRight size={16} />
        </a>
      </header>

      <div className="heroTopMeta js-home-meta">
        <span>© 2026 / WIIILLY LAN</span>
        <span>GUANGZHOU, CHINA</span>
        <span>PAGE <b>01</b></span>
      </div>

      <div className="heroEditorial js-home-title-wrap">
        <div className="heroTitleBlock">
          <span className="heroEyebrow">PRODUCT STRATEGY FOR</span>
          <h1 className="js-home-title">
            LAN WEILIANG
            <small>蓝炜亮</small>
          </h1>
        </div>

        <div className="heroCounter">
          <strong>0001</strong>
          <span>SELECTED PORTFOLIO</span>
        </div>
      </div>

      <div className="heroInfoGrid js-home-info">
        <div>
          <span>FOCUS</span>
          <p>产品定义 / 工业设计 / AI 设计工作流</p>
        </div>
        <div>
          <span>EXPERIENCE</span>
          <p>3C、家电、公共空间与服务设计</p>
        </div>
        <div>
          <span>PROFILE</span>
          <p>产品设计本硕 / 广州美术学院 / 国家奖学金</p>
        </div>
        <a href="#projects">
          VIEW SELECTED WORKS
          <ArrowUpRight size={17} />
        </a>
      </div>

      <a className="scrollCue" href="#about" aria-label="向下查看个人经历">
        <span>SCROLL</span>
        <ChevronDown size={18} />
      </a>
    </section>
  )
}
