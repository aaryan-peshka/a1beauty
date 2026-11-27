import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/gsap'
import { business, marquee } from './data'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Bridal from './components/Bridal'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Gallery from './components/Gallery'
import Visit from './components/Visit'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  const handleDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1.05, touchMultiplier: 1.4 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) lenisRef.current?.stop()
    else lenisRef.current?.start()
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      event.preventDefault()
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target as HTMLElement, { offset: -70, duration: 1.4 })
      } else {
        ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts) document.fonts.ready.then(refresh).catch(() => undefined)
    window.addEventListener('load', refresh)
    const timeout = window.setTimeout(refresh, 1200)
    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <Preloader onDone={handleDone} />
      <Cursor />
      <Nav onOpenChange={setMenuOpen} />

      <main id="content">
        <Hero ready={ready} />
        <Marquee items={marquee} />
        <About />
        <Services />
        <Bridal />
        <Menu />
        <Reviews />
        <Gallery />
        <Visit />
      </main>

      <Footer />

      <div className="mobile-cta">
        <a className="btn btn--ghost" href={`tel:${business.phoneHref}`}>
          Call
        </a>
        <a className="btn btn--gold" href={business.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>

      <div className="grain" aria-hidden="true" />
    </>
  )
}
