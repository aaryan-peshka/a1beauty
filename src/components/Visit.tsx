import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { business, hours } from '../data'
import { getOpenState } from '../lib/hours'

export default function Visit() {
  const root = useRef<HTMLElement>(null)
  const [state, setState] = useState(() => getOpenState())

  useEffect(() => {
    const id = window.setInterval(() => setState(getOpenState()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from('.visit__panel > *', {
        y: 36,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.visit__panel', start: 'top 82%' },
      })
      gsap.from('.visit__map', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.visit__map', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="visit" id="visit" ref={root}>
      <div className="container">
        <div className="visit__head">
          <p className="eyebrow">
            <span className="dot" />
            07 — Find us
          </p>
          <h2 className="h2">
            Come in. <em>We&rsquo;re on KIIT Road.</em>
          </h2>
        </div>

        <div className="visit__grid">
          <div className="visit__panel">
            <div className="visit__block">
              <h3>Address</h3>
              <p>
                {business.address}
                <br />
                {business.locality}
              </p>
              <a className="link-arrow" href={business.directionsUrl} target="_blank" rel="noreferrer">
                Get directions
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
            </div>

            <div className="visit__block">
              <h3>Call or message</h3>
              <a className="visit__phone" href={`tel:${business.phoneHref}`}>
                {business.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
              </a>
              <p className="visit__hint">Walk-ins welcome. Calling ahead saves you a wait on Sundays.</p>
            </div>

            <div className="visit__block visit__block--hours">
              <div className="visit__hours-head">
                <h3>Hours</h3>
                <span className={`visit__status ${state.isOpen ? 'is-live' : ''}`}>
                  <span className="pulse" />
                  {state.label}
                </span>
              </div>
              <table className="visit__hours">
                <tbody>
                  {hours.map((day, i) => (
                    <tr key={day.day} className={i === state.todayIndex ? 'is-today' : ''}>
                      <td>{day.day}</td>
                      <td>{day.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="visit__hint">Hours as listed on the salon&rsquo;s Google profile.</p>
            </div>

            <div className="visit__actions">
              <a className="btn btn--gold" href={business.whatsapp} target="_blank" rel="noreferrer">
                Book on WhatsApp
              </a>
              <a className="btn btn--ghost" href={`tel:${business.phoneHref}`}>
                Call the studio
              </a>
            </div>
          </div>

          <div className="visit__map">
            <iframe
              title="A1 Beauty Salon on KIIT Road, Patia, Bhubaneswar"
              src={business.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="visit__map-link" href={business.mapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
