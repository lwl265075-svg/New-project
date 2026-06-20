import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero.jsx'
import AnimatedBackground from './AnimatedBackground.jsx'
import CustomCursor from './CustomCursor.jsx'
import HoverRestoreFallingText from './HoverRestoreFallingText.jsx'
import Counter from './Counter.jsx'
import SketchCarousel from './SketchCarousel.jsx'
import BorderGlow from './BorderGlow.jsx'
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Bot,
  ChevronDown,
  CircleDot,
  Cpu,
  Layers3,
  Mail,
  MapPin,
  PenTool,
  Phone,
  ScanLine,
  Sparkles,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_DETAIL_HASH = '#project-01'
const PROJECT_TWO_DETAIL_HASH = '#project-02'
const PRODUCT_VIDEO_REFERENCE_DURATION = 34.667
const IGNIFIER_FRAME_COUNT = 240
const IGNIFIER_FRAME_BASE = '/ignifier-sequence'
const IGNIFIER_SCROLL_VIDEO_SOURCES = [
  { src: '/assets/ignifier-scroll.webm', type: 'video/webm' },
  { src: '/assets/ignifier-scroll-compressed.mp4', type: 'video/mp4' },
]
const PROJECT_TWO_HEAD_ASSET_BASE = '/project-02/head-follow'
const PROJECT_TWO_STORY_ASSET_BASE = '/project-02/story'
const PROJECT_TWO_MOTION_ASSET_BASE = '/project-02/motion-demo'
const MOBILE_EXPERIENCE_QUERY = '(max-width: 768px), (pointer: coarse)'

const getMobileExperience = () => (
  typeof window !== 'undefined' && window.matchMedia(MOBILE_EXPERIENCE_QUERY).matches
)

function useMobileExperience() {
  const [isMobileExperience, setIsMobileExperience] = useState(getMobileExperience)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_EXPERIENCE_QUERY)
    const sync = () => setIsMobileExperience(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return isMobileExperience
}

const projectDetailOverlays = [
  {
    id: 'cover',
    start: 0,
    end: 5,
    eyebrow: 'PROJECT 01',
    title: 'IGNIFIER 原野',
    subtitle: '便携式户外伸缩冲顶炉设计',
    meta: 'Portable Outdoor Telescopic Stove',
    body: '以收纳、展开、点火与稳定支撑为核心的户外炉具设计。',
    position: 'left-top',
  },
  {
    id: 'storage',
    start: 8,
    end: 11,
    title: '一体化收纳结构',
    body: '将炉头、防风罩与支撑模块压缩为紧凑筒体，减少户外携带体积，使炉具在收纳状态下保持完整、安全、易携带。',
    position: 'right-bottom',
  },
  {
    id: 'expand',
    start: 14,
    end: 18,
    title: '展开式支撑系统',
    body: '侧向防风翼与锅具支架同步打开，形成更大的承托面积。结构展开过程清晰直接，强化产品从收纳到使用状态的仪式感。',
    position: 'left-bottom',
  },
  {
    id: 'gas',
    start: 22,
    end: 26,
    title: '旋转接入气罐',
    body: '炉体通过旋转方式与气罐快速连接，降低安装判断成本。使用者可以通过直观的旋转动作完成固定，使户外环境下的操作更稳定、更高效。',
    position: 'right-bottom',
  },
  {
    id: 'ignition',
    start: 27,
    end: 30,
    title: '杠杆式压电点火',
    body: '中部控制杆兼具操作识别与点火功能，通过旋转动作完成压电点火。橙色细节点强化交互提示，使用户能快速理解操作方向与使用状态。',
    position: 'left-bottom',
    indicator: true,
  },
]

const navItems = [
  { label: '经历', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '优势', href: '#strengths' },
  { label: '联系', href: '#contact' },
]

const metrics = [
  { value: 70, places: [10, 1], suffix: '+', label: '设计竞赛奖项' },
  { value: 20, places: [10, 1], suffix: '+', label: '国家级奖项' },
  { value: 1, places: [1], secondaryValue: 256, secondaryPlaces: [100, 10, 1], label: '专业绩点/综测排名' },
  { value: 6, places: [1], suffix: '+', label: '产品与空间项目方向' },
]

const introText = '产品设计师、AI 设计师与 ID 设计师，具备产品设计本硕背景。曾在深圳安克创新、创异帧设计工作室与海象艺术教育设计工作室积累工业设计、作品集指导、学科竞赛指导、项目统筹经验，也参与过正佳帽峰湾文旅服务设计、乡村振兴、公共空间改造、企业产品落地等项目。'

const introHighlights = [
  '产品设计师',
  'AI 设计师',
  'ID 设计师',
  '产品设计本硕背景',
  '深圳安克创新',
  '创异帧设计工作室',
  '海象艺术教育设计工作室',
  '工业设计',
  '作品集指导',
  '学科竞赛指导',
  '项目统筹',
  '正佳帽峰湾文旅服务设计',
  '乡村振兴',
  '公共空间改造',
  '企业产品落地',
]

const timeline = [
  {
    time: '2025.09 - 至今',
    title: '广州美术学院',
    role: '产品设计 / 硕士研究生',
    detail: '持续深耕智能产品设计方法、设计策略与商业转化能力。',
  },
  {
    time: '2025.08 - 至今',
    title: '广州海象艺术教育',
    role: '考研手绘主教 / 作品集辅导主教',
    detail: '负责快题设计、马克笔表现与作品集选题、排版、视觉呈现辅导。',
  },
  {
    time: '2025.05 - 2025.07',
    title: '深圳市安克创新',
    role: '工业设计师',
    detail: '协助完成 3C 产品与消费类电子产品的方案设计，以及产品相关 CMF 设计。',
  },
  {
    time: '2024.06 - 2024.09',
    title: '深圳市浪尖科技',
    role: '实习工业设计师',
    detail: '推进家电、医疗等多品类产品从概念草图到量产落地，并优化电商主图与详情页视觉表现。',
  },
]

const projects = [
  {
    title: 'IGNIS FIRE',
    type: '伸缩式冲顶炉设计',
    image: '/assets/project-ignis-fire-clean.png',
    tags: ['工业设计', '户外装备', '结构表达'],
    detail: '围绕露营烹饪场景展开产品形态、结构比例与可用性设计，强调便携、稳定与机械感表达。',
  },
  {
    title: 'GLIDE COMPANION',
    type: '轻陪伴式扫拖机器人设计',
    image: '/assets/project-glide-companion-clean.png',
    tags: ['工业设计', '智能家居', '结构交互'],
    detail: '围绕多层家庭清洁场景展开产品形态、移动结构与交互方式设计，强调轻便、亲和与智能陪伴表达。',
  },
  {
    title: 'NEATPAW',
    type: '宠物指甲护理系统设计',
    image: '/assets/project-sunward-path-clean.png',
    tags: ['工业设计', '宠物护理', '智能交互'],
    detail: '围绕宠物指甲护理场景展开产品形态、握持结构与安全交互设计，强调温和、安心与高效护理体验。',
  },
  {
    title: 'THERMO FLEX',
    type: '多形态热敷便携筋膜枪',
    image: '/assets/project-neatpaw-system-clean.png',
    tags: ['工业设计', '运动康复', '热敷按摩'],
    detail: '围绕运动后肌肉放松场景展开产品形态、折叠结构与热敷按摩设计，强调便携、舒缓与全方位理疗体验。',
  },
  {
    title: 'SUN LIGHT',
    type: '儿童情绪夜灯设计',
    image: '/assets/project-neatpaw-care-clean.png',
    tags: ['工业设计', '儿童产品', '情感照明'],
    detail: '围绕儿童睡眠陪伴场景展开产品形态、开合结构与灯光交互设计，强调温暖、安全与情绪安抚表达。',
  },
  {
    title: 'FOLDSTEAM',
    type: '模块化折叠便携熨斗设计',
    image: '/assets/project-public-space-clean.png',
    tags: ['工业设计', '旅行收纳', '模块结构'],
    detail: '围绕快节奏出行中的衣物护理场景展开产品形态、折叠结构与便携收纳设计，强调轻量、灵活与即时护理体验。',
  },
  {
    title: 'CURIOUS EXPLORER',
    type: '儿童自然探索相机设计',
    image: '/assets/project-curious-explorer.png',
    tags: ['工业设计', '儿童产品', '自然教育'],
    detail: '围绕儿童户外探索场景展开产品形态、拍摄交互与陪伴体验设计，强调观察引导、知识启发与亲和成长表达。',
  },
  {
    title: 'WARM DRYER',
    type: '可烘衣取暖器设计',
    image: '/assets/project-warm-dryer.png',
    tags: ['工业设计', '家居电器', '安全结构'],
    detail: '围绕冬季取暖与衣物烘干场景展开产品形态、模块支架与安全防护设计，强调温暖、便捷与柔和家居表达。',
  },
  {
    title: 'POWSPUY',
    type: '线机一体式户外电源设计',
    image: '/assets/project-powspuy.png',
    tags: ['工业设计', '户外装备', '模块供电'],
    detail: '围绕户外办公与露营用电场景展开产品形态、线缆收纳与模块化照明设计，强调便携、稳定与持续供电体验。',
  },
  {
    title: 'AROMA EXTRACTOR',
    type: 'DIY 精油萃取机设计',
    image: '/assets/project-aroma-extractor.png',
    tags: ['工业设计', '香薰护理', '智能萃取'],
    detail: '围绕居家香薰与精油制作场景展开产品形态、萃取结构与交互控制设计，强调高端、便捷与自然疗愈体验。',
  },
  {
    title: 'MOVE CHARGE',
    type: '动感交互移动电源设计',
    image: '/assets/project-move-charge.png',
    tags: ['工业设计', '户外电子', '互动穿戴'],
    detail: '围绕户外移动充电场景展开产品形态、挂载方式与情感交互设计，强调便携、个性与动态陪伴体验。',
  },
  {
    title: 'OUTASK+PUBLIC',
    type: '公共空间物理灭蚊装置设计',
    image: '/assets/project-outask-public.png',
    tags: ['工业设计', '公共设施', '户外环保'],
    detail: '围绕公共空间灭蚊场景展开产品形态、太阳能供电与景观融合设计，强调环保、高效与便捷户外体验。',
  },
]

const strengths = [
  {
    icon: ScanLine,
    title: '完整设计链路',
    detail: '覆盖调研、用户分析、草图推演、3D 建模、渲染表达、汇报与落地执行。',
  },
  {
    icon: Bot,
    title: 'AI 设计工作流',
    detail: '熟练使用 Claude Code、ChatGPT、Gemini 等 AI Agent，提升策略整理、方案生成与表达效率。',
  },
  {
    icon: Cpu,
    title: 'ID 与产品表达',
    detail: '熟练 Rhino、KeyShot、Figma、Photoshop、Illustrator，能把概念推进到清晰的视觉资产。',
  },
  {
    icon: Layers3,
    title: '跨场景项目经验',
    detail: '覆盖 3C、家电、户外装备、宠物用品、包装、公共空间与服务设计等多类型项目。',
  },
  {
    icon: Award,
    title: '高标准自驱',
    detail: '国家奖学金、70+ 竞赛奖项，以及两年军旅经历带来的执行力和抗压能力。',
  },
  {
    icon: PenTool,
    title: '教学与表达能力',
    detail: '担任考研设计作品、手绘与作品集辅导主教，擅长拆解设计逻辑、组织版面叙事和项目表达。',
  },
]

const projectRouteFromHash = () => {
  if (window.location.hash === PROJECT_DETAIL_HASH) return 'project-01'
  if (window.location.hash === PROJECT_TWO_DETAIL_HASH) return 'project-02'
  return null
}

function HomeMotion({ rootRef }) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const isMobileMotion = getMobileExperience()

    const ctx = gsap.context(() => {
      const hero = root.querySelector('.js-page-intro')
      const selectedWorks = root.querySelector('.js-selected-works')

      if (hero) {
        const navItems = hero.querySelectorAll('.js-home-nav > *, .js-home-meta > span')
        const title = hero.querySelector('.js-home-title')
        const titleWrap = hero.querySelector('.js-home-title-wrap')
        const portrait = hero.querySelector('.heroPortraitStack')
        const infoItems = hero.querySelectorAll('.js-home-info > *')
        const counter = hero.querySelector('.heroCounter')
        const ornament = hero.querySelector('.js-home-ornament')

        if (titleWrap) gsap.set(titleWrap, { overflow: 'hidden' })

        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } })

        if (navItems.length) {
          intro.fromTo(
            navItems,
            { y: isMobileMotion ? -12 : -24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.92,
              stagger: 0.065,
              clearProps: 'transform,opacity,visibility',
            },
          )
        }

        if (title) {
          intro.fromTo(
            title,
            {
              y: isMobileMotion ? 42 : 118,
              scaleY: isMobileMotion ? 0.92 : 0.78,
              autoAlpha: 0,
              clipPath: isMobileMotion ? 'inset(0 0 40% 0)' : 'inset(0 0 100% 0)',
              transformOrigin: 'left bottom',
            },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.56,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.18',
          )
        }

        if (portrait) {
          intro.fromTo(
            portrait,
            { y: isMobileMotion ? 28 : 86, scale: isMobileMotion ? 0.985 : 0.94, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.36,
              ease: 'power4.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=1.24',
          )
        }

        if (infoItems.length) {
          intro.fromTo(
            infoItems,
            { y: isMobileMotion ? 16 : 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.92,
              stagger: 0.12,
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.64',
          )
        }

        if (counter || ornament) {
          intro.fromTo(
            [counter, ornament].filter(Boolean),
            { y: isMobileMotion ? 12 : 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.82,
              stagger: 0.11,
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.48',
          )
        }

        if (portrait && !isMobileMotion) {
          gsap.to(portrait, {
            yPercent: 3.5,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          })
        }
      }

      if (selectedWorks) {
        const kicker = selectedWorks.querySelector('.js-section-kicker')
        const title = selectedWorks.querySelector('.js-section-title')
        const copy = selectedWorks.querySelector('.js-section-copy')
        const cards = gsap.utils.toArray(selectedWorks.querySelectorAll('.js-project-card'))
        const images = gsap.utils.toArray(selectedWorks.querySelectorAll('.js-reveal-image'))
        const imageMedia = gsap.utils.toArray(selectedWorks.querySelectorAll('.js-reveal-image img'))
        const cardText = gsap.utils.toArray(
          selectedWorks.querySelectorAll('.js-card-kicker, .js-card-title, .tagList, .projectBody > p, .projectStoryCta'),
        )

        const worksTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: selectedWorks,
            start: 'top 80%',
            once: true,
          },
          defaults: { ease: 'power4.out', immediateRender: false },
        })

        if (kicker) {
          worksTimeline.fromTo(
            kicker,
            {
              y: isMobileMotion ? 24 : 72,
              scaleY: isMobileMotion ? 0.94 : 0.82,
              autoAlpha: 0,
              clipPath: isMobileMotion ? 'inset(0 0 36% 0)' : 'inset(0 0 100% 0)',
              transformOrigin: 'left bottom',
            },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.08,
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )
        }

        if (title) {
          worksTimeline.fromTo(
            title,
            {
              y: isMobileMotion ? 36 : 124,
              scaleY: isMobileMotion ? 0.94 : 0.8,
              autoAlpha: 0,
              clipPath: isMobileMotion ? 'inset(0 0 36% 0)' : 'inset(0 0 100% 0)',
              transformOrigin: 'left bottom',
            },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.38,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.76',
          )
        }

        if (copy) {
          worksTimeline.fromTo(
            copy,
            { y: isMobileMotion ? 14 : 34, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.82, clearProps: 'transform,opacity,visibility' },
            '-=0.68',
          )
        }

        if (cards.length) {
          worksTimeline.fromTo(
            cards,
            { y: isMobileMotion ? 28 : 92, scale: isMobileMotion ? 0.985 : 0.94, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.16,
              stagger: 0.14,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.18',
          )
        }

        if (images.length) {
          worksTimeline.fromTo(
            images,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.24,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'clipPath',
            },
            '<',
          )
        }

        if (imageMedia.length) {
          worksTimeline.fromTo(
            imageMedia,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.42,
              stagger: 0.1,
              ease: 'power4.out',
              clearProps: 'transform',
            },
            '<',
          )
        }

        if (cardText.length) {
          worksTimeline.fromTo(
            cardText,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.045,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.98',
          )
        }
      }

      const about = root.querySelector('#about')
      if (about) {
        const kicker = about.querySelector('.sectionHead span')
        const title = about.querySelector('.sectionHead h2')
        const glowFrames = gsap.utils.toArray(about.querySelectorAll('.aboutGlowFrame'))
        const portraitImage = about.querySelector('.portraitPanel img')
        const bioItems = gsap.utils.toArray(about.querySelectorAll('.contactStrip > *, .metric'))
        const timelineItems = gsap.utils.toArray(about.querySelectorAll('.timeline article'))

        const aboutTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: about,
            start: 'top 78%',
            once: true,
          },
          defaults: { ease: 'power4.out', immediateRender: false },
        })

        if (kicker) {
          aboutTimeline.fromTo(
            kicker,
            { y: 62, scaleY: 0.84, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1,
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )
        }

        if (title) {
          aboutTimeline.fromTo(
            title,
            { y: 112, scaleY: 0.8, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.34,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.62',
          )
        }

        if (glowFrames.length) {
          aboutTimeline.fromTo(
            glowFrames,
            { y: 78, scale: 0.955, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.14,
              stagger: 0.16,
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.5',
          )
        }

        if (portraitImage) {
          aboutTimeline.fromTo(
            portraitImage,
            { scale: 1.12, clipPath: 'inset(0 0 100% 0)' },
            {
              scale: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.42,
              ease: 'power4.out',
              clearProps: 'transform,clipPath',
            },
            '-=1.02',
          )
        }

        if (bioItems.length) {
          aboutTimeline.fromTo(
            bioItems,
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.78,
              stagger: 0.065,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.68',
          )
        }

        if (timelineItems.length) {
          aboutTimeline.fromTo(
            timelineItems,
            { y: 64, scale: 0.955, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.11,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.08',
          )
        }
      }

      const sketch = root.querySelector('#sketches')
      if (sketch) {
        const kicker = sketch.querySelector('.sectionHead span')
        const title = sketch.querySelector('.sectionHead h2')
        const copy = sketch.querySelector('.sketchSectionIntro p')
        const controls = gsap.utils.toArray(sketch.querySelectorAll('.sketchControls > *'))
        const carousel = sketch.querySelector('.sketchCarousel')
        const sketchCards = gsap.utils.toArray(sketch.querySelectorAll('.sketchCard'))
        const sketchImages = gsap.utils.toArray(sketch.querySelectorAll('.sketchCardImage'))
        const sketchMedia = gsap.utils.toArray(sketch.querySelectorAll('.sketchCardImage img'))

        const sketchTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sketch,
            start: 'top 76%',
            once: true,
          },
          defaults: { ease: 'power4.out', immediateRender: false },
        })

        if (kicker) {
          sketchTimeline.fromTo(
            kicker,
            { y: 62, scaleY: 0.84, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.98,
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )
        }

        if (title) {
          sketchTimeline.fromTo(
            title,
            { y: 116, scaleY: 0.8, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.3,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.6',
          )
        }

        if (copy || controls.length) {
          sketchTimeline.fromTo(
            [copy, ...controls].filter(Boolean),
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.075,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.64',
          )
        }

        if (carousel) {
          sketchTimeline.fromTo(
            carousel,
            { y: 72, scale: 0.965, autoAlpha: 0, clipPath: 'inset(0 0 20% 0)' },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.22,
              ease: 'power4.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.28',
          )
        }

        if (sketchCards.length) {
          sketchTimeline.fromTo(
            sketchCards,
            { y: 46, scale: 0.965, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.075,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.84',
          )
        }

        if (sketchImages.length) {
          sketchTimeline.fromTo(
            sketchImages,
            { clipPath: 'inset(0 0 100% 0)' },
            {
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.06,
              stagger: 0.06,
              ease: 'power4.out',
              clearProps: 'clipPath',
            },
            '-=0.86',
          )
        }

        if (sketchMedia.length) {
          sketchTimeline.fromTo(
            sketchMedia,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.18,
              stagger: 0.06,
              ease: 'power4.out',
              clearProps: 'transform',
            },
            '<',
          )
        }
      }

      const strengthsSection = root.querySelector('#strengths')
      if (strengthsSection) {
        const kicker = strengthsSection.querySelector('.sectionHead span')
        const title = strengthsSection.querySelector('.sectionHead h2')
        const cards = gsap.utils.toArray(strengthsSection.querySelectorAll('.strengthCard'))

        const strengthsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: strengthsSection,
            start: 'top 78%',
            once: true,
          },
          defaults: { ease: 'power4.out', immediateRender: false },
        })

        if (kicker) {
          strengthsTimeline.fromTo(
            kicker,
            { y: 60, scaleY: 0.84, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.96,
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )
        }

        if (title) {
          strengthsTimeline.fromTo(
            title,
            { y: 108, scaleY: 0.8, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.24,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.58',
          )
        }

        if (cards.length) {
          strengthsTimeline.fromTo(
            cards,
            { y: 74, scale: 0.945, autoAlpha: 0 },
            {
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 1.04,
              stagger: 0.13,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.16',
          )
        }
      }

      const contact = root.querySelector('#contact')
      if (contact) {
        const mark = contact.querySelector('.contactMark')
        const title = contact.querySelector('.contactFrame h2')
        const actions = gsap.utils.toArray(contact.querySelectorAll('.contactActions > *'))
        const footer = gsap.utils.toArray(contact.querySelectorAll('footer > *'))

        const contactTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: contact,
            start: 'top 78%',
            once: true,
          },
          defaults: { ease: 'power4.out', immediateRender: false },
        })

        if (mark) {
          contactTimeline.fromTo(
            mark,
            { y: 56, scaleY: 0.84, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.92,
              clearProps: 'transform,opacity,visibility,clipPath',
            },
          )
        }

        if (title) {
          contactTimeline.fromTo(
            title,
            { y: 118, scaleY: 0.8, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
            {
              y: 0,
              scaleY: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 1.36,
              ease: 'expo.out',
              clearProps: 'transform,opacity,visibility,clipPath',
            },
            '-=0.44',
          )
        }

        if (actions.length || footer.length) {
          contactTimeline.fromTo(
            [...actions, ...footer],
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            },
            '-=0.62',
          )
        }
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, root)

    return () => ctx.revert()
  }, [rootRef])

  return null
}

function ProjectDetailMotion({ rootRef, projectId }) {
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const isMobileMotion = getMobileExperience()

    const ctx = gsap.context(() => {
      if (projectId === 'project-01') {
        const story = root.querySelector('.productScrollStory')
        if (story) {
          const chromeItems = story.querySelectorAll('.productDetailChrome > *')
          const canvas = story.querySelector('.productScrollCanvas')
          const firstOverlay = story.querySelector('.productDetailOverlay.is-active')
          const progress = story.querySelector('.productScrollProgress')

          const projectOneIntro = gsap.timeline({ defaults: { ease: 'power4.out' } })

          if (chromeItems.length) {
            projectOneIntro.fromTo(
              chromeItems,
              { y: -26, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.1,
                clearProps: 'transform,opacity,visibility',
              },
            )
          }

          if (canvas) {
            projectOneIntro.fromTo(
              canvas,
              { y: 76, scale: 0.965, autoAlpha: 0 },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.32,
                ease: 'power4.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.34',
            )
          }

          if (firstOverlay) {
            const overlayText = firstOverlay.querySelectorAll('span, h1, strong, small, p')
            projectOneIntro.fromTo(
              overlayText.length ? overlayText : firstOverlay,
              { y: 72, scaleY: 0.82, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' },
              {
                y: 0,
                scaleY: 1,
                autoAlpha: 1,
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.1,
                stagger: 0.08,
                ease: 'expo.out',
                clearProps: 'transform,opacity,visibility,clipPath',
              },
              '-=0.78',
            )
          }

          if (progress) {
            projectOneIntro.fromTo(
              progress,
              { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 },
              {
                scaleX: 1,
                autoAlpha: 1,
                duration: 0.74,
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.42',
            )
          }
        }
      }

      if (projectId === 'project-02') {
        const hero = root.querySelector('.projectTwoHero')
        if (hero) {
          const backButton = hero.querySelector('.projectTwoBackButton')
          const topLine = hero.querySelector('.projectTwoHeroTopline')
          const title = hero.querySelector('.projectTwoHeroCopy h1')
          const subcopy = hero.querySelectorAll('.projectTwoHeroKicker, .projectTwoHeroIntro')
          const product = hero.querySelector('.projectTwoProductStage')
          const actionItems = hero.querySelectorAll(
            '.projectTwoHeroIndex, .projectTwoFeature, .projectTwoButtonRow button',
          )

          const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } })

          if (backButton || topLine) {
            heroTimeline.fromTo(
              [backButton, topLine].filter(Boolean),
              { y: isMobileMotion ? -12 : -26, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.1,
                clearProps: 'transform,opacity,visibility',
              },
            )
          }

          if (title) {
            heroTimeline.fromTo(
              title,
              {
                y: isMobileMotion ? 38 : 112,
                scaleY: isMobileMotion ? 0.94 : 0.78,
                autoAlpha: 0,
                clipPath: isMobileMotion ? 'inset(0 0 36% 0)' : 'inset(0 0 100% 0)',
                transformOrigin: 'center bottom',
              },
              {
                y: 0,
                scaleY: 1,
                autoAlpha: 1,
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.48,
                ease: 'expo.out',
                clearProps: 'transform,opacity,visibility,clipPath',
              },
              '-=0.26',
            )
          }

          if (subcopy.length) {
            heroTimeline.fromTo(
              subcopy,
              { y: isMobileMotion ? 14 : 34, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.7',
            )
          }

          if (product) {
            heroTimeline.fromTo(
              product,
              { y: isMobileMotion ? 24 : 82, scale: isMobileMotion ? 0.985 : 0.945, autoAlpha: 0 },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.34,
                ease: 'power4.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.64',
            )
          }

          if (actionItems.length) {
            heroTimeline.fromTo(
              actionItems,
              { y: isMobileMotion ? 12 : 30, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.84,
                stagger: 0.065,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.5',
            )
          }
        }

        const story = !isMobileMotion ? root.querySelector('#project-02-story') : null
        if (story) {
          const meta = story.querySelector('.projectTwoStoryMetaRail')
          const stage = story.querySelector('.projectTwoStoryStage')
          const progress = story.querySelector('.projectTwoStoryProgress')
          const counter = story.querySelector('.projectTwoStoryCounter')

          const storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: story,
              start: 'top 72%',
              once: true,
            },
            defaults: { ease: 'power4.out', immediateRender: false },
          })

          if (meta) {
            storyTimeline.fromTo(
              meta,
              { x: -46, autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
              {
                x: 0,
                autoAlpha: 1,
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.02,
                clearProps: 'transform,opacity,visibility,clipPath',
              },
            )
          }

          if (stage) {
            storyTimeline.fromTo(
              stage,
              { y: 64, scale: 0.965, autoAlpha: 0 },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.14,
                ease: 'power4.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.64',
            )
          }

          if (progress || counter) {
            storyTimeline.fromTo(
              [progress, counter].filter(Boolean),
              { y: 30, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.82,
                stagger: 0.1,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.48',
            )
          }
        }

        const motionDemo = !isMobileMotion ? root.querySelector('#project-02-motion-demo') : null
        if (motionDemo) {
          const meta = motionDemo.querySelector('.projectTwoMotionMeta')
          const frame = motionDemo.querySelector('.projectTwoMotionFrame')
          const progress = motionDemo.querySelector('.projectTwoMotionProgress')

          const motionTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: motionDemo,
              start: 'top 72%',
              once: true,
            },
            defaults: { ease: 'power4.out', immediateRender: false },
          })

          if (meta) {
            motionTimeline.fromTo(
              meta,
              { x: -46, autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
              {
                x: 0,
                autoAlpha: 1,
                clipPath: 'inset(0 0% 0 0)',
                duration: 1,
                clearProps: 'transform,opacity,visibility,clipPath',
              },
            )
          }

          if (frame) {
            motionTimeline.fromTo(
              frame,
              { y: 66, scale: 0.965, autoAlpha: 0 },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.16,
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.56',
            )
          }

          if (progress) {
            motionTimeline.fromTo(
              progress,
              { y: 30, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.78,
                ease: 'power3.out',
                clearProps: 'transform,opacity,visibility',
              },
              '-=0.44',
            )
          }
        }
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, root)

    return () => ctx.revert()
  }, [rootRef, projectId])

  return null
}

function App() {
  const [activeProject, setActiveProject] = useState(projectRouteFromHash)
  const homeRef = useRef(null)
  const projectOneRef = useRef(null)
  const projectTwoRef = useRef(null)

  useEffect(() => {
    const syncRoute = () => {
      setActiveProject(projectRouteFromHash())
    }

    window.addEventListener('hashchange', syncRoute)
    window.addEventListener('popstate', syncRoute)
    return () => {
      window.removeEventListener('hashchange', syncRoute)
      window.removeEventListener('popstate', syncRoute)
    }
  }, [])

  const openProjectDetail = (projectId = 'project-01') => {
    const nextHash = projectId === 'project-02' ? PROJECT_TWO_DETAIL_HASH : PROJECT_DETAIL_HASH

    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash)
    }
    setActiveProject(projectId)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const closeProjectDetail = () => {
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`)
    setActiveProject(null)
    requestAnimationFrame(() => {
      document.getElementById('projects')?.scrollIntoView({ block: 'start' })
    })
  }

  if (activeProject === 'project-01') {
    return (
      <main className="projectDetailShell" ref={projectOneRef}>
        <ProjectDetailMotion rootRef={projectOneRef} projectId="project-01" />
        <CustomCursor />
        <ProjectDetail onBack={closeProjectDetail} />
      </main>
    )
  }

  if (activeProject === 'project-02') {
    return (
      <main className="projectTwoShell" ref={projectTwoRef}>
        <ProjectDetailMotion rootRef={projectTwoRef} projectId="project-02" />
        <CustomCursor />
        <ProjectTwoHero onBack={closeProjectDetail} />
        <ProjectTwoScrollStory />
        <ProjectTwoMotionDemo />
      </main>
    )
  }

  return (
    <main className="portfolioHome" ref={homeRef}>
      <HomeMotion rootRef={homeRef} />
      <AnimatedBackground />
      <CustomCursor />
      <Hero />
      <About />
      <Projects onOpenProject={openProjectDetail} />
      <SketchCarousel />
      <Strengths />
      <Contact />
    </main>
  )
}

function ProjectDetail({ onBack }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const imagesRef = useRef([])
  const lastRenderedFrameRef = useRef(-1)
  const activeOverlayRef = useRef('cover')
  const finalTaglineRef = useRef(false)
  const [activeOverlayId, setActiveOverlayId] = useState('cover')
  const [showFinalTagline, setShowFinalTagline] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, behavior: 'auto' })
    let isMounted = true
    let loadedCount = 0

    const frameSrc = (index) => {
      return `${IGNIFIER_FRAME_BASE}/frame_${String(index + 1).padStart(4, '0')}.webp`
    }

    const updateCanvasSize = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(window.innerWidth * dpr)
      const height = Math.round(window.innerHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const drawImageContain = (image) => {
      const canvas = canvasRef.current
      if (!canvas || !image) return

      updateCanvasSize()
      const context = canvas.getContext('2d')
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const imageWidth = image.naturalWidth || image.width
      const imageHeight = image.naturalHeight || image.height
      const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight)
      const width = imageWidth * scale
      const height = imageHeight * scale
      const x = (canvasWidth - width) / 2
      const y = (canvasHeight - height) / 2

      context.fillStyle = '#d3d3d1'
      context.fillRect(0, 0, canvasWidth, canvasHeight)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, x, y, width, height)
    }

    const nearestLoadedFrame = (targetFrame) => {
      const images = imagesRef.current
      if (images[targetFrame]) return targetFrame
      for (let offset = 1; offset < IGNIFIER_FRAME_COUNT; offset += 1) {
        const previous = targetFrame - offset
        const next = targetFrame + offset
        if (previous >= 0 && images[previous]) return previous
        if (next < IGNIFIER_FRAME_COUNT && images[next]) return next
      }
      return -1
    }

    const drawFrame = (frameIndex) => {
      const drawableFrame = nearestLoadedFrame(frameIndex)
      if (drawableFrame < 0 || drawableFrame === lastRenderedFrameRef.current) return
      lastRenderedFrameRef.current = drawableFrame
      drawImageContain(imagesRef.current[drawableFrame])
    }

    const loadFrame = (index) => {
      if (imagesRef.current[index]) return Promise.resolve(imagesRef.current[index])

      return new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => {
          if (!isMounted) return
          imagesRef.current[index] = image
          loadedCount += 1
          if (index === 0) {
            drawFrame(0)
            setIsReady(true)
          }
          resolve(image)
        }
        image.onerror = reject
        image.src = frameSrc(index)
      })
    }

    const preloadFrames = async () => {
      try {
        await loadFrame(0)
        const priorityFrames = Array.from({ length: 60 }, (_, index) => index + 1)
        await Promise.all(priorityFrames.map(loadFrame))

        const remainingFrames = Array.from(
          { length: IGNIFIER_FRAME_COUNT - 61 },
          (_, index) => index + 61,
        )
        const concurrency = 10
        let cursor = 0
        const workers = Array.from({ length: concurrency }, async () => {
          while (cursor < remainingFrames.length) {
            const frameIndex = remainingFrames[cursor]
            cursor += 1
            await loadFrame(frameIndex)
          }
        })
        await Promise.all(workers)
      } catch (error) {
        console.error('Failed to preload IGNIFIER sequence frames', error)
      }
    }

    const updateTargetTime = () => {
      const section = sectionRef.current
      if (!section) return

      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight)
      const traveled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), scrollableDistance)
      const progress = traveled / scrollableDistance
      targetProgressRef.current = progress
      section.style.setProperty('--story-progress', progress.toFixed(4))
    }

    const overlayForTime = (time) => {
      const isFinalCleanFrame = time >= 30.2
      if (isFinalCleanFrame) return null

      return projectDetailOverlays.find((overlay) => {
        return time >= overlay.start && time <= overlay.end
      })
    }

    const animate = () => {
      const targetProgress = Math.min(Math.max(targetProgressRef.current, 0), 1)
      const delta = targetProgress - currentProgressRef.current
      const smoothing = Math.abs(delta) > 0.12 ? 0.2 : 0.12
      currentProgressRef.current = Math.abs(delta) < 0.0005
        ? targetProgress
        : currentProgressRef.current + delta * smoothing

      const frameIndex = Math.round(currentProgressRef.current * (IGNIFIER_FRAME_COUNT - 1))
      drawFrame(frameIndex)

      const currentTime = currentProgressRef.current * PRODUCT_VIDEO_REFERENCE_DURATION
      const overlay = overlayForTime(currentTime)
      const nextOverlayId = overlay?.id ?? null
      if (activeOverlayRef.current !== nextOverlayId) {
        activeOverlayRef.current = nextOverlayId
        setActiveOverlayId(nextOverlayId)
      }

      const nextShowFinalTagline = currentTime >= PRODUCT_VIDEO_REFERENCE_DURATION - 1.4
      if (finalTaglineRef.current !== nextShowFinalTagline) {
        finalTaglineRef.current = nextShowFinalTagline
        setShowFinalTagline(nextShowFinalTagline)
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      updateCanvasSize()
      updateTargetTime()
      const frameToRedraw = lastRenderedFrameRef.current < 0 ? 0 : lastRenderedFrameRef.current
      lastRenderedFrameRef.current = -1
      drawFrame(frameToRedraw)
    }

    updateCanvasSize()
    updateTargetTime()
    window.addEventListener('scroll', updateTargetTime, { passive: true })
    window.addEventListener('resize', handleResize)
    preloadFrames()
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      isMounted = false
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', updateTargetTime)
      window.removeEventListener('resize', handleResize)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`productScrollStory${activeOverlayId ? '' : ' is-clean-frame'}${isReady ? ' is-ready' : ''}`}
    >
      <div className="productScrollSticky">
        <div className="productDetailChrome">
          <button className="projectBackButton" type="button" onClick={onBack}>
            <ArrowLeft size={15} />
            Back to works
          </button>
          <span>WIIILLY / PROJECT 01</span>
        </div>

        <canvas
          ref={canvasRef}
          className="productScrollCanvas"
          aria-label="IGNIFIER 原野产品展开滚动动画"
        />

        <video
          className="productScrollFallbackVideo"
          preload="metadata"
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          {IGNIFIER_SCROLL_VIDEO_SOURCES.map((source) => (
            <source key={source.type} src={source.src} type={source.type} />
          ))}
        </video>

        <div className="productScrollVignette" aria-hidden="true" />

        {projectDetailOverlays.map((overlay) => (
          <article
            className={`productDetailOverlay productDetailOverlay--${overlay.id} productDetailOverlay--${overlay.position}${overlay.indicator ? ' has-indicator' : ''}${activeOverlayId === overlay.id ? ' is-active' : ''}`}
            key={overlay.id}
            aria-hidden={activeOverlayId !== overlay.id}
          >
            {overlay.eyebrow && <span>{overlay.eyebrow}</span>}
            <h1>{overlay.title}</h1>
            {overlay.subtitle && <strong>{overlay.subtitle}</strong>}
            {overlay.meta && <small>{overlay.meta}</small>}
            <p>{overlay.body}</p>
          </article>
        ))}

        <div
          className={`productFinalTagline${showFinalTagline ? ' is-active' : ''}`}
          aria-hidden={!showFinalTagline}
        >
          露营野炊自由不设限制
        </div>

        <div className="productScrollProgress" aria-hidden="true" />
      </div>
    </section>
  )
}

const projectTwoHeroFeatures = [
  { label: '楼梯适应', icon: Layers3 },
  { label: '交互头部', icon: Bot },
  { label: '多层清洁', icon: ScanLine },
]

const projectTwoMotionStates = [
  '初始状态',
  '中臂提升',
  '横扫阶梯',
  '爬升状态',
  '收臂状态',
  '旋转双臂',
  '翻转双臂',
  '完成翻越',
]

const projectTwoExpressions = [
  '开始干活',
  '你好，主人',
  '好喜欢呀',
  '来抱一抱',
  '哇哦，真棒',
  '不想上班',
]

const projectTwoStoryChapters = [
  {
    id: 'problem-insight',
    number: '01',
    title: '问题洞察',
    english: 'Problem Insight',
    summary: '多层家庭清洁存在断点，传统扫地机器人止步于平层，楼梯、转角与边缘区域仍依赖人工处理。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-2.png`,
    layout: 'problem',
    tags: ['多层住宅', '楼梯死角', '反馈缺失'],
    facts: [
      '楼梯边缘与转角区域难以被连续覆盖。',
      '跨层清洁仍需要人工接力，场景体验被打断。',
      '传统清洁工具缺乏反馈，使用过程不够安心。',
    ],
  },
  {
    id: 'concept-definition',
    number: '02',
    title: '概念定义',
    english: 'Concept Definition',
    summary: 'Glide-轻伴面向多层家庭清洁场景，通过可变结构完成台阶与复杂空间适应，并以顶部交互头建立更温和的人机沟通。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-3.png`,
    layout: 'concept',
    tags: ['Sunward Care Path', '可变结构', '温和陪伴'],
    facts: [
      '围绕“清洁 + 沟通”双重角色建立产品性格。',
      '结构适应多层空间，交互头承担情绪反馈。',
    ],
  },
  {
    id: 'stair-scenario',
    number: '03',
    title: '楼梯场景',
    english: 'Stair Scenario',
    summary: '产品通过可变支撑结构跨越阶梯边界，在台阶表面完成横向清洁与稳定移动。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-4.png`,
    layout: 'stair',
    tags: ['阶梯跨越', '横向清洁', '稳定支撑'],
    facts: [
      '双臂在台阶边缘形成新的受力面。',
      '头部方向与机身姿态协同强化工作状态提示。',
    ],
  },
  {
    id: 'motion-system',
    number: '04',
    title: '结构运动系统',
    english: 'Motion System',
    summary: '从初始状态到翻越完成，整套动作围绕台阶适应、横扫清洁与翻越逻辑展开。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-5.png`,
    layout: 'motion',
    steps: projectTwoMotionStates,
  },
  {
    id: 'app-interaction',
    number: '05',
    title: '移动端交互',
    english: 'App Interaction',
    summary: '通过移动端界面整合清洁地图、状态反馈、设备管理与陪伴互动，让用户在家庭场景中获得更清晰的控制感。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-6.png`,
    layout: 'app',
    tags: ['清洁地图', '状态反馈', '设备管理', '陪伴互动'],
  },
  {
    id: 'cleaning-scenario',
    number: '06',
    title: '清洁场景',
    english: 'Cleaning Scenario',
    summary: '面向地毯、灰尘团与复杂地面环境，产品以更灵活的形态适应多样家庭表面。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-7.png`,
    layout: 'cleaning',
    tags: ['地毯过渡', '灰尘团', '复杂地面'],
  },
  {
    id: 'human-computer-interaction',
    number: '07',
    title: '人机互动',
    english: 'Human-Computer Interaction',
    summary: '顶部交互头通过方向、表情与反馈建立情绪化沟通，使产品从单一清洁工具转向轻陪伴式家庭服务机器人。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-8.png`,
    layout: 'interaction',
    tags: ['方向反馈', '表情沟通', '轻陪伴关系'],
  },
  {
    id: 'expression-system',
    number: '08',
    title: '表情系统',
    english: 'Expression System',
    summary: '通过姿态、眼神与对话气泡的组合，建立一套更亲和、更具角色感的产品表情语言。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-9.png`,
    secondaryAsset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-10.png`,
    layout: 'expression',
    expressions: projectTwoExpressions,
  },
]

const projectTwoStoryPages = [
  {
    number: '01',
    title: '项目概览',
    english: 'Project Overview',
    summary: 'Glide-轻伴项目原始展示页，保留 PDF 页面比例与完整画面。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-1.png`,
  },
  {
    number: '02',
    title: '问题洞察',
    english: 'Problem Insight',
    summary: '多层家庭清洁痛点、楼梯死角与工具反馈缺失。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-2.png`,
  },
  {
    number: '03',
    title: '概念定义',
    english: 'Concept Definition',
    summary: '面向多层家庭清洁场景的产品概念与使用路径。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-3.png`,
  },
  {
    number: '04',
    title: '楼梯场景',
    english: 'Stair Scenario',
    summary: '楼梯横扫与跨越边界的核心工作场景。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-4.png`,
  },
  {
    number: '05',
    title: '结构运动系统',
    english: 'Motion System',
    summary: '结构动作序列与台阶适应过程。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-5.png`,
  },
  {
    number: '06',
    title: '移动端交互',
    english: 'App Interaction',
    summary: '清洁地图、状态反馈与设备管理界面。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-6.png`,
  },
  {
    number: '07',
    title: '清洁场景',
    english: 'Cleaning Scenario',
    summary: '地毯、灰尘团与复杂地面的清洁适应。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-7.png`,
  },
  {
    number: '08',
    title: '人机互动',
    english: 'Human-Computer Interaction',
    summary: '人与产品之间的方向、表情和反馈关系。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-8.png`,
  },
  {
    number: '09',
    title: '表情系统',
    english: 'Expression System',
    summary: '产品表情和状态反馈的视觉语言。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-9.png`,
  },
  {
    number: '10',
    title: '形态表情延展',
    english: 'Expression Extension',
    summary: '不同姿态与情绪状态下的产品表达。',
    asset: `${PROJECT_TWO_STORY_ASSET_BASE}/page-10.png`,
  },
]

function ProjectTwoHero({ onBack }) {
  const scrollToProjectTwoStory = () => {
    document.getElementById('project-02-story')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const scrollToProjectTwoMotionDemo = () => {
    document.getElementById('project-02-motion-demo')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="projectTwoHero" aria-labelledby="project-two-title">
      <button className="projectTwoBackButton" type="button" onClick={onBack}>
        <ArrowLeft size={15} />
        Back to works
      </button>

      <div className="projectTwoHeroTopline">PERSONAL PORTFOLIO</div>

      <div className="projectTwoHeroCopy">
        <h1 id="project-two-title">Glide-轻伴</h1>
        <p className="projectTwoHeroKicker">GLIDE COMPANION</p>
        <p className="projectTwoHeroIntro">一款适用于多层家庭的轻陪伴式扫地机器人</p>
      </div>

      <div className="projectTwoShowcase">
        <ProjectTwoHeadFollow />

        <div className="projectTwoHeroActions" aria-label="GLIDE COMPANION project actions">
          <div className="projectTwoHeroIndex">PROJECT 02 / GLIDE COMPANION</div>
          <div className="projectTwoFeatureRow" aria-label="Project highlights">
            {projectTwoHeroFeatures.map(({ label, icon: Icon }) => (
              <div className="projectTwoFeature" key={label}>
                <span>
                  <Icon size={15} strokeWidth={1.6} />
                </span>
                <p>{label}</p>
              </div>
            ))}
        </div>
        <div className="projectTwoButtonRow" aria-label="Project links">
            <button type="button">设计过程</button>
            <button
              className="projectTwoViewButton"
              type="button"
              aria-label="View Project"
              onClick={scrollToProjectTwoStory}
            >
              查看项目
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={scrollToProjectTwoMotionDemo}
            >
              交互演示
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectTwoScrollStoryLegacy() {
  const sectionRef = useRef(null)
  const frameRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

    const commitProgress = () => {
      frameRef.current = 0
      const section = sectionRef.current
      if (!section) return

      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight)
      const traveled = clamp(-section.getBoundingClientRect().top, 0, scrollableDistance)
      let nextProgress = traveled / scrollableDistance
      if (nextProgress < 0.01) nextProgress = 0
      if (nextProgress > 0.965) nextProgress = 1
      section.style.setProperty('--story-progress', nextProgress.toFixed(4))
      setProgress((previous) => (Math.abs(previous - nextProgress) < 0.001 ? previous : nextProgress))
    }

    const scheduleProgress = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(commitProgress)
    }

    commitProgress()
    window.addEventListener('scroll', scheduleProgress, { passive: true })
    window.addEventListener('resize', scheduleProgress)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', scheduleProgress)
      window.removeEventListener('resize', scheduleProgress)
    }
  }, [])

  const chapterCount = projectTwoStoryChapters.length
  const chapterFloat = progress * (chapterCount - 1)
  const activeIndex = Math.max(0, Math.min(chapterCount - 1, Math.round(chapterFloat)))
  const progressPercent = Math.round(progress * 100)
  const activeChapter = projectTwoStoryChapters[activeIndex]

  const chapterLayerStyle = (index) => {
    const distance = Math.abs(chapterFloat - index)
    const opacity = Math.max(0, 1 - distance * 1.1)
    const translateY = Math.min(40, distance * 28)
    const scale = 1 - Math.min(0.06, distance * 0.035)

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      zIndex: Math.max(1, 30 - Math.round(distance * 10)),
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
    }
  }

  const chapterInfoStyle = (index) => {
    const distance = Math.abs(chapterFloat - index)
    const opacity = Math.max(0, 1 - distance * 1.3)
    const translateY = Math.min(20, distance * 16)

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      zIndex: Math.max(1, 20 - Math.round(distance * 10)),
    }
  }

  const renderChapterScene = (chapter) => {
    if (chapter.layout === 'problem') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--problem">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--problem">
            <img src={chapter.asset} alt={`${chapter.title} PDF visual`} loading="lazy" />
          </figure>
          <div className="projectTwoStoryInsightGrid">
            {chapter.facts.map((fact, index) => (
              <article className="projectTwoStoryInsightCard" key={fact}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <p>{fact}</p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (chapter.layout === 'concept') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--concept">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--concept">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <aside className="projectTwoStoryAsideCard">
            <span>Concept Path</span>
            <strong>Sunward Care Path</strong>
            {chapter.facts.map((fact) => (
              <p key={fact}>{fact}</p>
            ))}
            <div className="projectTwoStoryTagRow">
              {chapter.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </aside>
        </div>
      )
    }

    if (chapter.layout === 'stair') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--stair">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--full">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <div className="projectTwoStoryCallout projectTwoStoryCallout--left">可变支撑跨越台阶边界</div>
          <div className="projectTwoStoryCallout projectTwoStoryCallout--right">横向清洁保持稳定移动</div>
          <div className="projectTwoStoryTagRow projectTwoStoryTagRow--floating">
            {chapter.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      )
    }

    if (chapter.layout === 'motion') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--motion">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--motion">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <div className="projectTwoStoryStepRow">
            {chapter.steps.map((step, index) => (
              <article className="projectTwoStoryStepCard" key={step}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{step}</span>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (chapter.layout === 'app') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--app">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--app">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <div className="projectTwoStoryCardStack">
            {chapter.tags.map((tag, index) => (
              <article className="projectTwoStoryInfoCard" key={tag}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <strong>{tag}</strong>
                <p>围绕家庭场景组织更清晰的控制路径与反馈界面。</p>
              </article>
            ))}
          </div>
        </div>
      )
    }

    if (chapter.layout === 'cleaning') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--cleaning">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--full">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <div className="projectTwoStoryTagRow projectTwoStoryTagRow--floating">
            {chapter.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      )
    }

    if (chapter.layout === 'interaction') {
      return (
        <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--interaction">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--interaction">
            <img src={chapter.asset} alt={`${chapter.title} visual`} loading="lazy" />
          </figure>
          <aside className="projectTwoStoryQuoteCard">
            <span>Human Touch</span>
            <strong>从工具到陪伴</strong>
            <p>交互头通过方向与表情建立更温和的家庭关系，让反馈本身也成为体验的一部分。</p>
          </aside>
        </div>
      )
    }

    return (
      <div className="projectTwoStorySceneLayout projectTwoStorySceneLayout--expression">
        <div className="projectTwoStoryExpressionGrid">
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--expression">
            <img src={chapter.asset} alt="Expression system page 1" loading="lazy" />
          </figure>
          <figure className="projectTwoStoryFigure projectTwoStoryFigure--expression">
            <img src={chapter.secondaryAsset} alt="Expression system page 2" loading="lazy" />
          </figure>
        </div>
        <div className="projectTwoStoryExpressionRow">
          {chapter.expressions.map((expression) => (
            <span key={expression}>{expression}</span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="projectTwoScrollStory"
      style={{
        height: `${chapterCount * 100}vh`,
        '--story-progress-angle': `${progress * 360}deg`,
      }}
    >
      <div className="projectTwoScrollSticky">
        <div className="projectTwoStoryMetaRail" aria-live="polite">
          {projectTwoStoryChapters.map((chapter, index) => (
            <article
              key={chapter.id}
              className="projectTwoStoryMetaCard"
              style={chapterInfoStyle(index)}
              aria-hidden={activeIndex !== index}
            >
              <span className="projectTwoStoryMetaEyebrow">PROJECT 02</span>
              <strong className="projectTwoStoryMetaProject">GLIDE-轻伴</strong>
              <div className="projectTwoStoryMetaCount">
                {chapter.number} / {String(chapterCount).padStart(2, '0')}
              </div>
              <h2>{chapter.title}</h2>
              <p className="projectTwoStoryMetaEnglish">{chapter.english}</p>
              <p className="projectTwoStoryMetaSummary">{chapter.summary}</p>
            </article>
          ))}
        </div>

        <div className="projectTwoStoryStage" aria-label="Project 02 scroll story content">
          {projectTwoStoryChapters.map((chapter, index) => (
            <article
              key={chapter.id}
              className={`projectTwoStoryScene projectTwoStoryScene--${chapter.layout}`}
              style={chapterLayerStyle(index)}
              aria-hidden={activeIndex !== index}
            >
              {renderChapterScene(chapter)}
            </article>
          ))}
        </div>

        <div className="projectTwoStoryProgress" aria-hidden="true">
          <strong>{progressPercent}%</strong>
          <span>SCROLL STORY</span>
        </div>

        <div className="projectTwoStoryCounter" aria-live="polite">
          {activeChapter.number} / {String(chapterCount).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}

function ProjectTwoScrollStory() {
  const sectionRef = useRef(null)
  const frameRef = useRef(0)
  const isMobileStory = useMobileExperience()
  const [progress, setProgress] = useState(0)
  const [slideTravelPx, setSlideTravelPx] = useState(null)
  const pageScrollStepVh = 74
  const slideGapPx = 44

  useEffect(() => {
    if (isMobileStory) return undefined

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

    const measureSlideTravel = () => {
      const image = sectionRef.current?.querySelector('.projectTwoPdfPageImage')
      const imageHeight = image?.getBoundingClientRect().height || 0
      if (!imageHeight) return

      const nextTravel = Math.round(imageHeight + slideGapPx)
      setSlideTravelPx((previous) => (
        previous && Math.abs(previous - nextTravel) < 1 ? previous : nextTravel
      ))
    }

    const commitProgress = () => {
      frameRef.current = 0
      const section = sectionRef.current
      if (!section) return

      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight)
      const traveled = clamp(-section.getBoundingClientRect().top, 0, scrollableDistance)
      let nextProgress = traveled / scrollableDistance
      if (nextProgress < 0.01) nextProgress = 0
      if (nextProgress > 0.985) nextProgress = 1
      section.style.setProperty('--story-progress', nextProgress.toFixed(4))
      setProgress((previous) => (Math.abs(previous - nextProgress) < 0.001 ? previous : nextProgress))
    }

    const scheduleProgress = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(commitProgress)
    }

    const handleResize = () => {
      measureSlideTravel()
      scheduleProgress()
    }

    const firstImage = sectionRef.current?.querySelector('.projectTwoPdfPageImage')
    if (firstImage && !firstImage.complete) {
      firstImage.addEventListener('load', handleResize, { once: true })
    }

    measureSlideTravel()
    commitProgress()
    window.addEventListener('scroll', scheduleProgress, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (firstImage) firstImage.removeEventListener('load', handleResize)
      window.removeEventListener('scroll', scheduleProgress)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileStory])

  const pageCount = projectTwoStoryPages.length
  const pageFloat = progress * (pageCount - 1)
  const activeIndex = Math.max(0, Math.min(pageCount - 1, Math.round(pageFloat)))
  const progressPercent = Math.round(progress * 100)
  const activePage = projectTwoStoryPages[activeIndex]

  if (isMobileStory) {
    return (
      <section className="projectTwoScrollStory projectTwoScrollStory--mobile" id="project-02-story">
        <div className="projectTwoMobilePdfList" aria-label="Project 02 PDF pages">
          {projectTwoStoryPages.map((page) => (
            <article key={page.asset} className="projectTwoMobilePdfPage">
              <div className="projectTwoMobilePdfMeta">
                <span>PROJECT 02</span>
                <strong>GLIDE-轻伴</strong>
                <small>{page.number} / {String(pageCount).padStart(2, '0')}</small>
                <h2>{page.title}</h2>
              </div>
              <img className="projectTwoPdfPageImage" src={page.asset} alt={`${page.title} PDF page`} loading="lazy" />
            </article>
          ))}
        </div>
      </section>
    )
  }

  const pageStyle = (index) => {
    const distance = index - pageFloat
    const absDistance = Math.abs(distance)
    const clampedDistance = Math.max(-1.15, Math.min(1.15, distance))
    const isVisible = absDistance <= 1.08

    return {
      opacity: isVisible ? 1 : 0,
      transform: slideTravelPx
        ? `translate3d(0, ${clampedDistance * slideTravelPx}px, 0)`
        : `translate3d(0, ${clampedDistance * 66}%, 0)`,
      zIndex: Math.max(1, pageCount - Math.round(absDistance * 2)),
      pointerEvents: absDistance < 0.55 ? 'auto' : 'none',
      visibility: isVisible ? 'visible' : 'hidden',
    }
  }

  const metaStyle = (index) => {
    const distance = Math.abs(pageFloat - index)

    return {
      opacity: Math.max(0, 1 - distance * 1.35),
      transform: `translateY(${Math.min(14, distance * 10)}px)`,
      zIndex: Math.max(1, 20 - Math.round(distance * 10)),
    }
  }

  return (
    <section
      ref={sectionRef}
      className="projectTwoScrollStory"
      id="project-02-story"
      style={{
        height: `${pageCount * pageScrollStepVh}vh`,
        '--story-progress-angle': `${progress * 360}deg`,
      }}
    >
      <div className="projectTwoScrollSticky">
        <div className="projectTwoStoryMetaRail" aria-live="polite">
          {projectTwoStoryPages.map((page, index) => (
            <article
              key={page.asset}
              className="projectTwoStoryMetaCard"
              style={metaStyle(index)}
              aria-hidden={activeIndex !== index}
            >
              <span className="projectTwoStoryMetaEyebrow">PROJECT 02</span>
              <strong className="projectTwoStoryMetaProject">GLIDE-轻伴</strong>
              <div className="projectTwoStoryMetaCount">
                {page.number} / {String(pageCount).padStart(2, '0')}
              </div>
              <h2>{page.title}</h2>
            </article>
          ))}
        </div>

        <div className="projectTwoStoryStage" aria-label="Project 02 PDF vertical carousel">
          {projectTwoStoryPages.map((page, index) => (
            <figure
              key={page.asset}
              className="projectTwoStoryScene projectTwoPdfPage"
              style={pageStyle(index)}
              aria-hidden={activeIndex !== index}
            >
              <img className="projectTwoPdfPageImage" src={page.asset} alt={`${page.title} PDF page`} loading="lazy" />
            </figure>
          ))}
        </div>

        <div className="projectTwoStoryProgress" aria-hidden="true">
          <strong>{progressPercent}%</strong>
          <span>SCROLL STORY</span>
        </div>

        <div className="projectTwoStoryCounter" aria-live="polite">
          {activePage.number} / {String(pageCount).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}

function ProjectTwoMotionDemo() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const frameRef = useRef(0)
  const isMobileMotionDemo = useMobileExperience()
  const progressRef = useRef(0)
  const targetTimeRef = useRef(0)
  const currentTimeRef = useRef(0)
  const durationRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isMobileMotionDemo) return undefined

    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return undefined

    let isMounted = true
    let progressDirty = true
    let lastSeekWriteAt = 0
    const seekSmoothing = 0.2
    const seekWriteIntervalMs = 28
    const seekWriteThreshold = 0.012

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

    const syncDuration = () => {
      durationRef.current = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0
      targetTimeRef.current = progressRef.current * durationRef.current
      if (!currentTimeRef.current) {
        currentTimeRef.current = video.currentTime || targetTimeRef.current
      }
    }

    const measureProgress = () => {
      progressDirty = false
      const scrollRoot = document.scrollingElement || document.documentElement
      const sectionTop = scrollRoot.scrollTop + section.getBoundingClientRect().top
      const scrollableDistance = Math.max(1, section.offsetHeight - window.innerHeight)
      const traveled = clamp(scrollRoot.scrollTop - sectionTop, 0, scrollableDistance)
      let nextProgress = traveled / scrollableDistance

      if (nextProgress < 0.005) nextProgress = 0
      if (nextProgress > 0.995) nextProgress = 1

      progressRef.current = nextProgress
      targetTimeRef.current = nextProgress * durationRef.current
      section.style.setProperty('--motion-progress-angle', `${nextProgress * 360}deg`)
      setProgress((previous) => (Math.abs(previous - nextProgress) < 0.001 ? previous : nextProgress))
    }

    const requestProgressMeasure = () => {
      progressDirty = true
    }

    const animate = (now = performance.now()) => {
      if (!isMounted) return

      if (progressDirty) measureProgress()

      if (durationRef.current > 0) {
        const targetTime = clamp(targetTimeRef.current, 0, durationRef.current)
        const diff = targetTime - currentTimeRef.current

        if (Math.abs(diff) < 0.006) {
          currentTimeRef.current = targetTime
        } else {
          currentTimeRef.current += diff * seekSmoothing
        }

        const nextTime = clamp(currentTimeRef.current, 0, durationRef.current)
        const timeDelta = Math.abs(video.currentTime - nextTime)
        const targetDelta = Math.abs(targetTime - video.currentTime)
        const canWrite = now - lastSeekWriteAt >= seekWriteIntervalMs
        const shouldCatchUp = targetDelta > 0.18

        if (timeDelta > seekWriteThreshold && (canWrite || shouldCatchUp)) {
          try {
            video.currentTime = nextTime
            lastSeekWriteAt = now
          } catch {
            // Ignore transient seek errors while metadata is still settling.
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    video.muted = true
    video.playsInline = true
    video.controls = false
    video.preload = 'auto'
    video.pause()
    video.addEventListener('loadedmetadata', syncDuration)
    video.addEventListener('loadeddata', syncDuration)
    video.addEventListener('canplay', syncDuration)
    syncDuration()
    measureProgress()
    video.load()
    window.addEventListener('scroll', requestProgressMeasure, { passive: true })
    window.addEventListener('resize', requestProgressMeasure)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      isMounted = false
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      video.removeEventListener('loadedmetadata', syncDuration)
      video.removeEventListener('loadeddata', syncDuration)
      video.removeEventListener('canplay', syncDuration)
      window.removeEventListener('scroll', requestProgressMeasure)
      window.removeEventListener('resize', requestProgressMeasure)
    }
  }, [isMobileMotionDemo])

  const progressPercent = Math.round(progress * 100)

  if (isMobileMotionDemo) {
    return (
      <section
        ref={sectionRef}
        className="projectTwoMotionDemo projectTwoMotionDemo--mobile"
        id="project-02-motion-demo"
      >
        <div className="projectTwoMotionSticky">
          <div className="projectTwoMotionMeta">
            <span>PROJECT 02</span>
            <strong>动态演示</strong>
            <h2>Motion Demo</h2>
            <p>Scroll-Controlled Product Motion</p>
            <small>通过滚轮控制产品动态进度，展示 Glide-轻伴在场景中的连续运动与交互反馈。</small>
          </div>

          <div className="projectTwoMotionFrame">
            <div className="projectTwoMotionVideoCrop">
              <video
                className="projectTwoMotionVideo"
                src={`${PROJECT_TWO_MOTION_ASSET_BASE}/glide-motion-demo.mp4`}
                muted
                playsInline
                loop
                autoPlay
                controls
                preload="metadata"
                aria-label="GLIDE Companion motion demo"
              />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="projectTwoMotionDemo"
      id="project-02-motion-demo"
      style={{ '--motion-progress-angle': `${progress * 360}deg` }}
    >
      <div className="projectTwoMotionSticky">
        <div className="projectTwoMotionMeta">
          <span>PROJECT 02</span>
          <strong>动态演示</strong>
          <h2>Motion Demo</h2>
          <p>Scroll-Controlled Product Motion</p>
          <small>通过滚轮控制产品动态进度，展示 Glide-轻伴在场景中的连续运动与交互反馈。</small>
        </div>

        <div className="projectTwoMotionFrame">
          <div className="projectTwoMotionVideoCrop">
            <video
              ref={videoRef}
              className="projectTwoMotionVideo"
              src={`${PROJECT_TWO_MOTION_ASSET_BASE}/glide-motion-demo.mp4`}
              muted
              playsInline
              preload="auto"
              aria-label="GLIDE Companion scroll controlled motion demo"
            />
          </div>
        </div>

        <div className="projectTwoMotionProgress" aria-hidden="true">
          <strong>{progressPercent}%</strong>
          <span>SCROLL MOTION</span>
        </div>
      </div>
    </section>
  )
}

function ProjectTwoHeadFollow() {
  const canvasRef = useRef(null)
  const posterRef = useRef(null)

  useEffect(() => {
    const FRAME_W = 960
    const FRAME_H = 540
    const SPRITE_COLUMNS = 12
    const INTRO_FRAME_COUNT = 60
    const INTRO_DURATION_MS = 2000
    const FRONT_SPRITE_INDEX = 30
    const LOOK_FRAME_START = 60
    const LOOK_FRAME_COUNT = 144
    const MOUSE_SMOOTHING = 0.12
    const LOOK_SMOOTHING = 0.18
    const STRENGTH_SMOOTHING = 0.16
    const MAX_LOOK_STEP = 3.5
    const MAX_STRENGTH_STEP = 0.055
    const FRONT_RETURN_THRESHOLD = 0.045

    const LOOK_VIDEO_FRAMES = [
      150, 153, 157, 160, 163, 167, 170, 173, 177, 180, 183, 187, 190, 193, 197, 200, 203, 207,
      210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295,
      300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385,
      390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 460, 465, 470, 475,
      480, 482, 483, 485, 487, 488, 490, 492, 493, 495, 497, 498, 500, 502, 503, 505, 507, 508,
      510, 512, 513, 515, 517, 518, 520, 522, 523, 525, 527, 528, 530, 532, 533, 535, 537, 538,
      540, 543, 547, 550, 553, 557, 560, 563, 567, 570, 573, 577, 580, 583, 587, 590, 593, 597,
      600, 603, 606, 608, 611, 614, 617, 619, 622, 625, 628, 631, 633, 636, 639, 642, 644, 647,
    ]

    const ANGLE_KEYS = [
      { name: 'right', angle: 0, frame: 480, lookFrame: 72 },
      { name: 'rightDown', angle: 45, frame: 510, lookFrame: 90 },
      { name: 'down', angle: 90, frame: 540, lookFrame: 108 },
      { name: 'leftDown', angle: 135, frame: 600, lookFrame: 126 },
      { name: 'left', angle: 180, frame: 150, lookFrame: 0 },
      { name: 'leftUp', angle: -135, frame: 210, lookFrame: 18 },
      { name: 'up', angle: -90, frame: 300, lookFrame: 36 },
      { name: 'rightUp', angle: -45, frame: 390, lookFrame: 54 },
      { name: 'front', angle: null, frame: 30, lookFrame: null },
    ]

    const ANGLE_ANCHORS = [
      { name: 'left', angle: -180, frame: 150, lookFrame: 0 },
      { name: 'leftUp', angle: -135, frame: 210, lookFrame: 18 },
      { name: 'up', angle: -90, frame: 300, lookFrame: 36 },
      { name: 'rightUp', angle: -45, frame: 390, lookFrame: 54 },
      { name: 'right', angle: 0, frame: 480, lookFrame: 72 },
      { name: 'rightDown', angle: 45, frame: 510, lookFrame: 90 },
      { name: 'down', angle: 90, frame: 540, lookFrame: 108 },
      { name: 'leftDown', angle: 135, frame: 600, lookFrame: 126 },
      { name: 'left', angle: 180, frame: 150, lookFrame: LOOK_FRAME_COUNT },
    ]

    const canvas = canvasRef.current
    if (!canvas) return undefined
    if (getMobileExperience()) return undefined

    const ctx = canvas.getContext('2d', { alpha: false })
    let spriteBitmap = null
    let centerX = window.innerWidth / 2
    let centerY = window.innerHeight / 2
    let targetMouseX = centerX
    let targetMouseY = centerY
    let smoothMouseX = centerX
    let smoothMouseY = centerY
    let currentFrame = 72
    let targetFrame = 72
    let currentStrength = 0
    let targetStrength = 0
    let phase = 'loading'
    let introStartTime = 0
    let rafId = 0
    let lastRenderedFrame = -1
    let isMounted = true

    window.__PROJECT_TWO_ANGLE_KEYS = ANGLE_KEYS

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
    const lerp = (a, b, t) => a + (b - a) * t
    const wrapLookFrame = (value) => ((value % LOOK_FRAME_COUNT) + LOOK_FRAME_COUNT) % LOOK_FRAME_COUNT
    const cyclicDiff = (target, current) => (
      (target - current + LOOK_FRAME_COUNT * 1.5) % LOOK_FRAME_COUNT
    ) - LOOK_FRAME_COUNT / 2

    const updateCenter = () => {
      centerX = window.innerWidth / 2
      centerY = window.innerHeight / 2
    }

    const maxRadius = () => Math.max(220, Math.min(window.innerWidth, window.innerHeight) * 0.46)

    const renderFrame = (spriteIndex) => {
      if (!spriteBitmap || spriteIndex === lastRenderedFrame) return
      lastRenderedFrame = spriteIndex

      const col = spriteIndex % SPRITE_COLUMNS
      const row = Math.floor(spriteIndex / SPRITE_COLUMNS)
      const sx = col * FRAME_W
      const sy = row * FRAME_H

      ctx.save()
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.globalCompositeOperation = 'copy'
      ctx.drawImage(spriteBitmap, sx, sy, FRAME_W, FRAME_H, 0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()
    }

    const nearestAnchorName = (lookFrame) => {
      let best = ANGLE_KEYS[0]
      let bestDistance = Infinity
      for (const key of ANGLE_KEYS) {
        if (key.lookFrame === null) continue
        const distance = Math.abs(cyclicDiff(key.lookFrame, lookFrame))
        if (distance < bestDistance) {
          best = key
          bestDistance = distance
        }
      }
      return best.name
    }

    const lookFrameFromAngle = (angle) => {
      const normalized = angle <= -180 ? -180 : angle >= 180 ? 180 : angle
      for (let i = 0; i < ANGLE_ANCHORS.length - 1; i += 1) {
        const start = ANGLE_ANCHORS[i]
        const end = ANGLE_ANCHORS[i + 1]
        if (normalized >= start.angle && normalized <= end.angle) {
          const t = (normalized - start.angle) / (end.angle - start.angle)
          return wrapLookFrame(lerp(start.lookFrame, end.lookFrame, t))
        }
      }
      return 72
    }

    const computePointerTarget = () => {
      const dx = smoothMouseX - centerX
      const dy = smoothMouseY - centerY
      const distance = Math.hypot(dx, dy)
      const strength = clamp(distance / maxRadius(), 0, 1)

      if (strength < 0.012) {
        return { lookFrame: currentFrame, strength: 0 }
      }

      const angle = Math.atan2(dy, dx) * 180 / Math.PI
      return { lookFrame: lookFrameFromAngle(angle), strength }
    }

    const renderIntroFrame = (frame) => {
      renderFrame(frame)
      document.documentElement.dataset.projectTwoLook = 'intro'
      document.documentElement.dataset.projectTwoVideoFrame = String(frame)
    }

    const renderLookFrame = () => {
      let spriteIndex = FRONT_SPRITE_INDEX
      let videoFrame = 30
      let name = 'front'

      if (currentStrength >= FRONT_RETURN_THRESHOLD) {
        const renderedLookFrame = Math.round(wrapLookFrame(currentFrame)) % LOOK_FRAME_COUNT
        spriteIndex = LOOK_FRAME_START + renderedLookFrame
        videoFrame = LOOK_VIDEO_FRAMES[renderedLookFrame]
        name = nearestAnchorName(currentFrame)
      }

      renderFrame(spriteIndex)
      document.documentElement.dataset.projectTwoLook = name
      document.documentElement.dataset.projectTwoVideoFrame = String(videoFrame)
    }

    const advanceInteractiveState = () => {
      smoothMouseX += (targetMouseX - smoothMouseX) * MOUSE_SMOOTHING
      smoothMouseY += (targetMouseY - smoothMouseY) * MOUSE_SMOOTHING

      const target = computePointerTarget()
      targetFrame = target.lookFrame
      targetStrength = target.strength

      const frameDiff = cyclicDiff(targetFrame, currentFrame)
      currentFrame = wrapLookFrame(
        currentFrame + clamp(frameDiff * LOOK_SMOOTHING, -MAX_LOOK_STEP, MAX_LOOK_STEP),
      )

      const strengthDiff = targetStrength - currentStrength
      currentStrength = clamp(
        currentStrength + clamp(strengthDiff * STRENGTH_SMOOTHING, -MAX_STRENGTH_STEP, MAX_STRENGTH_STEP),
        0,
        1,
      )

      if (currentStrength < 0.002 && targetStrength === 0) {
        currentStrength = 0
      }

      renderLookFrame()
    }

    const animate = (now) => {
      if (!isMounted) return

      if (phase === 'intro') {
        const elapsed = now - introStartTime
        const introFrame = Math.min(
          INTRO_FRAME_COUNT - 1,
          Math.floor((elapsed / INTRO_DURATION_MS) * INTRO_FRAME_COUNT),
        )
        renderIntroFrame(introFrame)

        if (elapsed >= INTRO_DURATION_MS) {
          const target = computePointerTarget()
          currentFrame = target.lookFrame
          targetFrame = target.lookFrame
          currentStrength = 0
          targetStrength = target.strength
          phase = 'interactive'
          lastRenderedFrame = -1
          renderLookFrame()
        }
      } else if (phase === 'interactive') {
        advanceInteractiveState()
      }

      rafId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (event) => {
      targetMouseX = event.clientX
      targetMouseY = event.clientY
    }

    const loadSprite = async () => {
      const image = new Image()
      image.decoding = 'async'
      image.src = `${PROJECT_TWO_HEAD_ASSET_BASE}/sprite.webp`
      await image.decode()
      if (!isMounted) return
      spriteBitmap = 'createImageBitmap' in window ? await createImageBitmap(image) : image
      if (!isMounted) return
      renderFrame(FRONT_SPRITE_INDEX)
      canvas.classList.add('is-ready')
      posterRef.current?.setAttribute('hidden', '')
      phase = 'intro'
      introStartTime = performance.now()
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateCenter, { passive: true })
    loadSprite().catch((error) => {
      console.error('Failed to load Project 02 head sprite', error)
      phase = 'error'
    })

    return () => {
      isMounted = false
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateCenter)
    }
  }, [])

  return (
    <div className="projectTwoProductStage" aria-label="Interactive GLIDE COMPANION product head">
      <img
        ref={posterRef}
        src={`${PROJECT_TWO_HEAD_ASSET_BASE}/frame_front.webp`}
        alt=""
        aria-hidden="true"
      />
      <canvas ref={canvasRef} width="960" height="540" />
    </div>
  )
}

function LegacyHero() {
  return (
    <section className="hero" id="top">
      <video
        className="heroVideo"
        src="/assets/hero-loop.mp4"
        poster="/assets/project-ignis-fire.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="heroShade" />
      <header className="siteNav">
        <a className="brand" href="#top" aria-label="回到首页">
          <span>Wiiilly</span>
          <small>Portfolio</small>
        </a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="navContact" href="mailto:1556832642@qq.com">
          <Mail size={17} />
          联系我
        </a>
      </header>

      <div className="heroInner">
        <div className="heroKicker">
          <CircleDot size={15} />
          Product Designer / AI Designer / ID Designer
        </div>
        <h1>
          蓝炜亮
          <span>把产品策略、AI 工作流与工业设计落到可见的体验。</span>
        </h1>
        <div className="heroMeta">
          <p>
            产品设计本硕，专业第一，国家奖学金获得者。专注产品定义、工业设计、空间体验与 AI
            辅助设计流程。
          </p>
          <a className="primaryButton" href="#projects">
            查看作品
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      <a className="scrollCue" href="#about" aria-label="向下查看个人经历">
        <ChevronDown size={20} />
      </a>
    </section>
  )
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="sectionHead">
        <span>01 / Experience</span>
        <h2>我始终相信设计是解决问题的艺术。</h2>
      </div>

      <div className="aboutGrid">
        <BorderGlow className="aboutGlowFrame" animated>
          <div className="portraitPanel">
            <img src="/assets/hero-portrait.jpg" alt="蓝炜亮个人肖像" />
            <div>
              <p>
                蓝炜亮 <span className="portraitEnglishName">Willy</span>
              </p>
              <span>广东肇庆 · 中共党员 · 2000.10</span>
            </div>
          </div>
        </BorderGlow>

        <BorderGlow className="aboutGlowFrame aboutGlowFrame--bio" animated>
          <div className="bioPanel">
            <HoverRestoreFallingText text={introText} highlightWords={introHighlights} />
            <div className="contactStrip hoverFadeGroup">
              <a href="tel:13336488942">
                <Phone size={18} />
                13336488942
              </a>
              <a href="mailto:1556832642@qq.com">
                <Mail size={18} />
                1556832642@qq.com
              </a>
              <span>
                <MapPin size={18} />
                Guangzhou / Shaoguan
              </span>
            </div>
            <MetricGrid />
          </div>
        </BorderGlow>
      </div>

      <div className="timeline hoverFadeGroup">
        {timeline.map((item) => (
          <article key={`${item.time}-${item.title}`}>
            <span>{item.time}</span>
            <h3>{item.title}</h3>
            <strong>{item.role}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function MetricGrid() {
  const gridRef = useRef(null)
  const [startCount, setStartCount] = useState(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || startCount) return undefined

    let isVisible = false
    let hasUserScrolled = false

    const startWhenReady = () => {
      if (isVisible && hasUserScrolled) {
        setStartCount(true)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3
      startWhenReady()
    }, { threshold: [0, 0.3, 1] })

    const markUserScroll = () => {
      hasUserScrolled = true
      startWhenReady()
    }

    const handleScrollKey = (event) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        markUserScroll()
      }
    }

    observer.observe(grid)
    window.addEventListener('wheel', markUserScroll, { passive: true })
    window.addEventListener('touchmove', markUserScroll, { passive: true })
    window.addEventListener('keydown', handleScrollKey)

    return () => {
      observer.disconnect()
      window.removeEventListener('wheel', markUserScroll)
      window.removeEventListener('touchmove', markUserScroll)
      window.removeEventListener('keydown', handleScrollKey)
    }
  }, [startCount])

  return (
    <div className="metricGrid" ref={gridRef}>
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <strong className="metricValue">
            <Counter
              value={startCount ? metric.value : 0}
              places={metric.places}
              fontSize={38}
              padding={2}
              gap={0}
              textColor="inherit"
              fontWeight={700}
              gradientHeight={6}
              gradientFrom="#181512"
              gradientTo="transparent"
            />
            {metric.secondaryValue !== undefined && (
              <>
                <span className="metricUnit">/</span>
                <Counter
                  value={startCount ? metric.secondaryValue : 0}
                  places={metric.secondaryPlaces}
                  fontSize={38}
                  padding={2}
                  gap={0}
                  textColor="inherit"
                  fontWeight={700}
                  gradientHeight={6}
                  gradientFrom="#181512"
                  gradientTo="transparent"
                />
              </>
            )}
            {metric.suffix && <span className="metricUnit">{metric.suffix}</span>}
          </strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  )
}

function Projects({ onOpenProject }) {
  return (
    <section className="section projects js-selected-works" id="projects">
      <div className="sectionHead split js-section-head">
        <div>
          <span className="js-section-kicker">02 / Selected Works</span>
          <h2 className="js-section-title">精选项目</h2>
        </div>
        <p className="js-section-copy">
          从场景洞察到形态推演，从建模渲染到完整表达，持续探索产品、人与环境之间更清晰的连接。
        </p>
      </div>

      <div className="projectGrid">
        {projects.map((project, index) => {
          const projectRoute = index === 0 ? 'project-01' : index === 1 ? 'project-02' : null
          const isClickableProject = Boolean(projectRoute)

          return (
          <article
            className={`projectCard js-project-card${isClickableProject ? ' projectCard--clickable' : ''}`}
            key={project.title}
            role={isClickableProject ? 'button' : undefined}
            tabIndex={isClickableProject ? 0 : undefined}
            onClick={isClickableProject ? () => onOpenProject(projectRoute) : undefined}
            onKeyDown={isClickableProject ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onOpenProject(projectRoute)
              }
            } : undefined}
          >
            <div className="projectImage js-reveal-image">
              <img src={project.image} alt={`${project.title} 项目图`} />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="projectBody">
              <div>
                <p className="js-card-kicker">{project.type}</p>
                <h3 className="js-card-title">{project.title}</h3>
              </div>
              <div className="tagList">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{project.detail}</p>
              {isClickableProject && (
                <span className="projectStoryCta">
                  {projectRoute === 'project-02' ? 'Interactive hero detail' : 'Scroll-controlled detail'}
                  <ArrowUpRight size={14} />
                </span>
              )}
            </div>
          </article>
          )
        })}
      </div>
    </section>
  )
}

function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="sectionHead">
        <span>04 / Capability</span>
        <h2>个人优势</h2>
      </div>

      <div className="strengthGrid hoverFadeGroup">
        {strengths.map(({ icon: Icon, title, detail }) => (
          <article className="strengthCard" key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contactEnd" id="contact">
      <div className="contactFrame">
        <span className="contactMark">
          <Sparkles size={18} />
          Available for product design / AI design / ID design
        </span>
        <h2>让下一个产品概念，变成可被理解、可被评审、可被落地的作品。</h2>
        <div className="contactActions hoverFadeGroup">
          <a className="primaryButton" href="mailto:1556832642@qq.com">
            <Mail size={18} />
            1556832642@qq.com
          </a>
          <a className="secondaryButton" href="tel:13336488942">
            <Phone size={18} />
            13336488942
          </a>
        </div>
      </div>
      <footer>
        <span>Wiiilly Lan</span>
        <span>Product & AI Designer</span>
      </footer>
    </section>
  )
}

export default App
