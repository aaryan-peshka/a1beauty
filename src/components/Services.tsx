import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { services } from '../data'

export default function Services() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      gsap.from('.service-card', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      })

      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const el = track.current
        const pinEl = pin.current
        if (!el || !pinEl) return

        const getDistance = () => Math.max(0, el.scrollWidth - window.innerWidth)

        const tween = gsap.to(el, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
            pin: pinEl,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        gsap.to('.rail__progress-bar', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
            scrub: true,
          },
        })

        return () => {
          tween.kill()
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="services" id="services" ref={root}>
      <div className="services__pin" ref={pin}>
        <div className="services__head container">
          <p className="eyebrow">
            <span className="dot" />
            02 — What we do
          </p>
          <h2 className="h2">
            Six things we do <em>exceptionally.</em>
          </h2>
          <p className="services__hint">
            <span>Scroll to travel the rail</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </p>
        </div>

        <div className="rail" ref={track}>
          {services.map((s) => (
            <article className="service-card" key={s.id}>
              <div className="service-card__media">
                <img src={s.image} alt={`${s.title} at A1 Beauty Salon`} loading="lazy" />
                <span className="service-card__index">{s.index}</span>
              </div>
              <div className="service-card__body">
                <p className="service-card__kicker">{s.kicker}</p>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__copy">{s.copy}</p>
                <p className="service-card__from">
                  From <strong>{s.from}</strong>
                </p>
              </div>
            </article>
          ))}

          <div className="rail__end">
            <p>
              Can&rsquo;t find it
              <br />
              on the list?
            </p>
            <a className="btn btn--gold" href="#menu">
              See the full menu
            </a>
          </div>
        </div>

        <div className="rail__progress">
          <div className="rail__progress-bar" />
        </div>
      </div>
    </section>
  )
}
