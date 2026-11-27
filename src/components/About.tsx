import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { splitWords } from '../lib/split'
import { business } from '../data'

const stats = [
  { value: 4.9, decimals: 1, suffix: '', label: 'Google rating' },
  { value: 371, decimals: 0, suffix: '', label: 'guest reviews' },
  { value: 55, decimals: 0, suffix: '+', label: 'treatments on the menu' },
  { value: 7, decimals: 0, suffix: '', label: 'days a week' },
]

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = splitWords(root.current?.querySelector<HTMLElement>('.about__lead') ?? null)
      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1 })
        return
      }

      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__lead',
            start: 'top 82%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )

      gsap.from('.about__frame', {
        clipPath: 'inset(18% 18% 18% 18%)',
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.about__frame', start: 'top 85%' },
      })

      gsap.to('.about__img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      gsap.utils.toArray<HTMLElement>('.stat__value').forEach((el) => {
        const target = Number(el.dataset.value ?? 0)
        const decimals = Number(el.dataset.decimals ?? 0)
        const counter = { n: 0 }
        gsap.to(counter, {
          n: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent = counter.n.toFixed(decimals) + (el.dataset.suffix ?? '')
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="about section" id="studio" ref={root}>
      <div className="container about__grid">
        <div className="about__visual">
          <div className="about__frame">
            <img className="about__img" src="/images/interior.jpg" alt="The A1 Beauty Salon interior in Prasanti Vihar" loading="lazy" />
          </div>
          <div className="about__caption" data-rise>
            <span className="rule" />
            <p>
              Prasanti Vihar, Patia
              <br />
              A few doors from Sani Mandir
            </p>
          </div>
        </div>

        <div className="about__copy">
          <p className="eyebrow" data-rise>
            <span className="dot" />
            01 — The studio
          </p>
          <h2 className="h2" data-rise>
            A neighbourhood studio with a <em>five-star habit.</em>
          </h2>
          <p className="about__lead">
            {business.name} opened on KIIT Road with a simple brief — do the work so well that guests
            come back, and bring their friends. A few hundred Google reviews later, that is still the
            plan. Cuts, colour, keratin, facials, threading, waxing, HD bridal makeup and men&rsquo;s
            grooming, all under one roof.
          </p>
          <p className="about__note" data-rise>
            No upselling scripts. Just trained hands, honest advice and a chair that feels like yours.
          </p>
        </div>
      </div>

      <div className="container">
        <dl className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt className="stat__label">{s.label}</dt>
              <dd className="stat__value" data-value={s.value} data-decimals={s.decimals} data-suffix={s.suffix}>
                {s.value.toFixed(s.decimals) + s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
