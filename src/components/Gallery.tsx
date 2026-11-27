import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

const shots = [
  { src: '/images/interior.jpg', alt: 'The A1 Beauty Salon styling floor', caption: 'The floor', className: 'g1' },
  { src: '/images/nails.jpg', alt: 'Nail art finish at A1 Beauty Salon', caption: 'Nail art', className: 'g2' },
  { src: '/images/hair-colour.jpg', alt: 'Caramel balayage hair colour', caption: 'Global colour', className: 'g3' },
  { src: '/images/bride.jpg', alt: 'HD bridal makeup and styling', caption: 'Bridal HD', className: 'g4' },
  { src: '/images/men.jpg', alt: 'Men’s cut and styling', caption: 'Men’s grooming', className: 'g5' },
  { src: '/images/hair-spa.jpg', alt: 'Hair spa treatment at the basin', caption: 'Hair spa', className: 'g6' },
]

export default function Gallery() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>('.gallery__item').forEach((item) => {
        const depth = Number(item.dataset.depth ?? 0)
        if (!depth) return
        gsap.fromTo(
          item,
          { yPercent: depth },
          {
            yPercent: -depth,
            ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      gsap.from('.gallery__item', {
        autoAlpha: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.09,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.gallery__grid', start: 'top 82%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gallery" id="gallery" ref={root}>
      <div className="container">
        <div className="gallery__head">
          <p className="eyebrow">
            <span className="dot" />
            06 — In the chair
          </p>
          <h2 className="h2">
            The work, <em>up close.</em>
          </h2>
          <p className="gallery__note">A look at the finishes we are known for around Patia.</p>
        </div>

        <div className="gallery__grid">
          {shots.map((shot, i) => (
            <figure
              className={`gallery__item ${shot.className}`}
              key={shot.src}
              data-depth={i % 2 === 0 ? 3 : 6}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <figcaption>
                <span>{shot.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
