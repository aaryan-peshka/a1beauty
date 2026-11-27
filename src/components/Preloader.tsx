import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(root.current, { display: 'none' })
      onDone()
      return
    }
    const value = { n: 0 }
    const tl = gsap.timeline({ onComplete: onDone })
    tl.from('.preloader__mark', { yPercent: 18, autoAlpha: 0, duration: 1, ease: 'expo.out' })
      .to(
        value,
        {
          n: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(value.n)).padStart(3, '0')
          },
        },
        0.15,
      )
      .to(bar.current, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.15)
      .to('.preloader__inner', { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, '+=0.1')
      .to(root.current, { yPercent: -100, duration: 1.15, ease: 'expo.inOut' }, '-=0.1')
      .set(root.current, { display: 'none' })

    return () => {
      tl.kill()
    }
  }, [onDone])

  return (
    <div className="preloader" ref={root}>
      <div className="preloader__inner">
        <img className="preloader__mark" src="/images/a1-logo.png" alt="A1 Beauty Salon" />
        <div className="preloader__meta">
          <span>Make up studio &amp; unisex salon</span>
          <span>Patia · Bhubaneswar</span>
        </div>
        <div className="preloader__track">
          <div className="preloader__bar" ref={bar} />
        </div>
      </div>
      <span className="preloader__count" ref={counter}>
        000
      </span>
    </div>
  )
}
