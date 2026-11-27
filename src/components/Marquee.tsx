import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

type Props = {
  items: string[]
  speed?: number
  reverse?: boolean
  variant?: 'gold' | 'outline'
}

export default function Marquee({ items, speed = 38, reverse = false, variant = 'gold' }: Props) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!track.current || prefersReducedMotion()) return
    const el = track.current
    gsap.set(el, { xPercent: reverse ? -50 : 0 })
    const tween = gsap.to(el, {
      xPercent: reverse ? 0 : -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    })

    let last = window.scrollY
    let timer = 0
    const onScroll = () => {
      const now = window.scrollY
      const delta = now - last
      last = now
      const boost = gsap.utils.clamp(1, 5, 1 + Math.abs(delta) * 0.06)
      tween.timeScale(delta === 0 ? 1 : delta > 0 ? boost : -boost)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => tween.timeScale(1), 260)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
      tween.kill()
    }
  }, [speed, reverse])

  const row = (
    <div className="marquee__row">
      {items.map((item, i) => (
        <span className="marquee__item" key={`${item}-${i}`}>
          {item}
          <i aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee marquee--${variant}`} aria-hidden="true">
      <div className="marquee__track" ref={track}>
        {row}
        {row}
      </div>
    </div>
  )
}
