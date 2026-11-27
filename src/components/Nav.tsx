import { useEffect, useRef, useState } from 'react'
import { business } from '../data'

const links = [
  { href: '#studio', label: 'The studio' },
  { href: '#services', label: 'Services' },
  { href: '#menu', label: 'Price menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

export default function Nav({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (progress.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    onOpenChange?.(open)
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, onOpenChange])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <div className="nav__bar container">
          <a className="nav__brand" href="#top" aria-label={`${business.legalName} — home`}>
            <img src="/images/a1-mark.png" alt="" className="nav__logo" />
            <span className="nav__wordmark">
              <strong>A1 Beauty</strong>
              <em>Studio &amp; salon · Patia</em>
            </span>
          </a>

          <nav className="nav__links" aria-label="Sections">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__phone" href={`tel:${business.phoneHref}`}>
              {business.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
            </a>
            <a className="btn btn--gold nav__cta" href={business.whatsapp} target="_blank" rel="noreferrer">
              Book a slot
            </a>
          </div>

          <button
            type="button"
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="nav__progress">
          <div className="nav__progress-bar" ref={progress} />
        </div>
      </header>

      <div className={`menu-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile sections">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${i * 60}ms` }}>
              <span>0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu-panel__foot">
          <p>{business.address}</p>
          <p>{business.locality}</p>
          <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
          <a className="btn btn--gold" href={business.whatsapp} target="_blank" rel="noreferrer">
            Book on WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
