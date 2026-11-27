import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { business } from '../data'

export default function Bridal() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()

      mm.add('(min-width: 900px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=140%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        tl.fromTo('.bridal__img', { scale: 1.34 }, { scale: 1, ease: 'none' }).fromTo(
          '.bridal__panel > *',
          { y: 46, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
          0.05,
        )
      })

      mm.add('(max-width: 899px)', () => {
        gsap.from('.bridal__panel > *', {
          y: 36,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 65%' },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bridal" id="bridal" ref={root}>
      <div className="bridal__media">
        <img
          className="bridal__img"
          src="/images/bride.jpg"
          alt="HD bridal makeup with gold jewellery at A1 Beauty Salon"
          loading="lazy"
        />
      </div>
      <div className="bridal__veil" />

      <div className="bridal__panel container">
        <p className="eyebrow">
          <span className="dot" />
          03 — Bridal atelier
        </p>
        <h2 className="h2 h2--lg">
          The morning of,
          <br />
          in <em>good hands.</em>
        </h2>
        <p className="bridal__copy">
          HD base, lashes, hair and draping — planned around your outfit, your jewellery and the light
          in the room. Crylon or MAC, your call.
        </p>

        <div className="bridal__prices">
          <div className="bridal__price">
            Bridal · Crylon
            <strong>₹5,000 — ₹7,000</strong>
          </div>
          <div className="bridal__price">
            Bridal · MAC
            <strong>₹8,000 — ₹10,000</strong>
          </div>
          <div className="bridal__price">
            Party makeup
            <strong>₹2,500 — ₹3,000</strong>
          </div>
        </div>

        <a className="btn btn--gold" href={business.whatsapp} target="_blank" rel="noreferrer">
          Check your date
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
