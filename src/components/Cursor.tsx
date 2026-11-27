import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dotEl = dot.current
    const ringEl = ring.current
    if (!dotEl || !ringEl) return

    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, autoAlpha: 0 })
    const dotX = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3' })
    const ringY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3' })

    const move = (e: MouseEvent) => {
      gsap.to([dotEl, ringEl], { autoAlpha: 1, duration: 0.3, overwrite: 'auto' })
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      gsap.to(ringEl, {
        scale: target ? 2.1 : 1,
        borderColor: target ? 'rgba(226,193,133,0.9)' : 'rgba(244,239,230,0.35)',
        duration: 0.35,
        ease: 'power3',
      })
      gsap.to(dotEl, { scale: target ? 0.4 : 1, duration: 0.35 })
    }

    const leave = () => gsap.to([dotEl, ringEl], { autoAlpha: 0, duration: 0.25 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
