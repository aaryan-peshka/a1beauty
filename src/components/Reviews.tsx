import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { business, reviews } from '../data'
import type { Review } from '../data'

function Card({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase()
  return (
    <figure className="review-card" data-cursor>
      <span className="stars" aria-label={`${review.stars} out of 5`}>
        {'★'.repeat(review.stars)}
      </span>
      <blockquote>
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="review-card__name">
        <span className="review-card__avatar" aria-hidden="true">
          {initial}
        </span>
        <span>
          <span className="review-card__who">{review.name}</span>
          <span className="review-card__meta">
            {review.meta} · {review.when}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Reviews() {
  const root = useRef<HTMLElement>(null)
  const rowA = useRef<HTMLDivElement>(null)
  const rowB = useRef<HTMLDivElement>(null)
  const band = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      if (rowA.current) {
        gsap.to(rowA.current, { xPercent: -50, duration: 74, ease: 'none', repeat: -1 })
      }
      if (rowB.current) {
        gsap.set(rowB.current, { xPercent: -50 })
        gsap.to(rowB.current, { xPercent: 0, duration: 88, ease: 'none', repeat: -1 })
      }
      if (band.current) {
        gsap.fromTo(
          band.current,
          { xPercent: 0 },
          {
            xPercent: -18,
            ease: 'none',
            scrollTrigger: { trigger: '.reviews__band', start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        )
      }

      gsap.from('.reviews__head > *', {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.reviews__head', start: 'top 85%' },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const rowOne = [...reviews, ...reviews]
  const rowTwo = [...reviews.slice(2), ...reviews.slice(0, 2), ...reviews.slice(2), ...reviews.slice(0, 2)]

  return (
    <section className="reviews" id="reviews" ref={root}>
      <div className="container reviews__head">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            05 — Guest book
          </p>
          <h2 className="h2">
            Rated <em>{business.rating}</em> by the
            <br />
            people in the chair.
          </h2>
        </div>
        <div className="reviews__score">
          <b>{business.rating}</b>
          <span>
            {business.reviewCount} Google reviews
            <br />
            <span className="stars">★★★★★</span>
          </span>
        </div>
      </div>

      <div className="reviews__rows">
        <div className="review-row" ref={rowA}>
          {rowOne.map((review, i) => (
            <Card review={review} key={`a-${review.name}-${i}`} />
          ))}
        </div>
        <div className="review-row" ref={rowB}>
          {rowTwo.map((review, i) => (
            <Card review={review} key={`b-${review.name}-${i}`} />
          ))}
        </div>
      </div>

      <div className="reviews__band" aria-hidden="true">
        <div className="reviews__band-track" ref={band}>
          <span className="reviews__band-text is-fill">totally osm</span>
          <span className="reviews__band-text">totally osm</span>
          <span className="reviews__band-text is-fill">totally osm</span>
          <span className="reviews__band-text">totally osm</span>
          <span className="reviews__band-text is-fill">totally osm</span>
        </div>
      </div>

      <div className="container reviews__foot">
        <a className="link-arrow" href={business.mapsUrl} target="_blank" rel="noreferrer">
          Read all {business.reviewCount} reviews on Google
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
        <p>Reviews reproduced from the salon&rsquo;s public Google Business profile.</p>
      </div>
    </section>
  )
}
