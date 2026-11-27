import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { business } from '../data'
import { getOpenState } from '../lib/hours'

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [openState, setOpenState] = useState(() => getOpenState())

  useEffect(() => {
    const id = window.setInterval(() => setOpenState(getOpenState()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(['.hero__line', '.hero__fade'], { yPercent: 0, autoAlpha: 1, y: 0 })
        return
      }


      gsap.fromTo(
        '.hero__img',
        { scale: 1.22, filter: 'brightness(0.5)' },
        { scale: 1.02, filter: 'brightness(1)', duration: 2.6, ease: 'power3.out' },
      )

      gsap.set('.hero__line', { yPercent: 112 })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.to('.hero__line', { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.1)
        .fromTo('.hero__fade', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.09 }, 0.55)

      gsap.to('.hero__media', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__copy', {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__media">
        <img
          className="hero__img"
          src="/images/hero.jpg"
          alt="Glossy blow-dried waves and soft glam makeup at A1 Beauty Salon, Patia"
          fetchPriority="high"
        />
      </div>
      <div className="hero__shade" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="hero__eyebrow hero__fade">
            <span className="dot" />
            KIIT Road · Prasanti Vihar · Patia
          </p>

          <h1 className="hero__title">
            <span className="mask">
              <span className="hero__line">Look</span>
            </span>
            <span className="mask">
              <span className="hero__line">
                <em>extraordinary.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lead hero__fade">
            {business.legalName} — hair, colour, keratin, skin and bridal artistry, seven days a week
            in the neighbourhood that keeps coming back.
          </p>

          <div className="hero__actions hero__fade">
            <a className="btn btn--gold" href={business.whatsapp} target="_blank" rel="noreferrer">
              Book on WhatsApp
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <a className="btn btn--ghost" href={`tel:${business.phoneHref}`}>
              Call {business.phone}
            </a>
          </div>

          <div className="hero__badge hero__fade">
            <div className="hero__rating">
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>
              <strong>{business.rating}</strong>
              <span>{business.reviewCount} Google reviews</span>
            </div>
            <span className="hero__status">
              <span className={`pulse ${openState.isOpen ? 'is-live' : ''}`} />
              {openState.label}
            </span>
          </div>
        </div>
      </div>

      <div className="hero__foot container">
        <span className="hero__scroll">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span className="hero__tags">Hair · Colour · Bridal · Skin · Men</span>
        <span className="hero__pin">20.3630° N, 85.8209° E</span>
      </div>
    </section>
  )
}
