import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { femaleMenu, maleMenu } from '../data'

type Tab = 'female' | 'male'

export default function Menu() {
  const [tab, setTab] = useState<Tab>('female')
  const root = useRef<HTMLElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const groups = tab === 'female' ? femaleMenu : maleMenu

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from('.menu__head > *', {
        y: 34,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion() || !list.current) return
    const rows = list.current.querySelectorAll('.menu-group')
    const tween = gsap.fromTo(
      rows,
      { y: 26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.04, ease: 'power2.out', overwrite: true },
    )
    return () => {
      tween.kill()
    }
  }, [tab])

  return (
    <section className="menu" id="menu" ref={root}>
      <div className="container">
        <div className="menu__head">
          <div>
            <p className="eyebrow">
              <span className="dot" />
              04 — The price list
            </p>
            <h2 className="h2">
              Everything we do,
              <br />
              <em>priced honestly.</em>
            </h2>
          </div>
          <p className="menu__note">
            Lifted straight from the printed menu in the studio. S / M / L refers to hair length.
            Ask on the phone for the current offer — the studio runs them from time to time.
          </p>
        </div>

        <div className="menu__tabs" role="tablist" aria-label="Price menu">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'female'}
            className={`menu__tab ${tab === 'female' ? 'is-active' : ''}`}
            onClick={() => setTab('female')}
          >
            Female services
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'male'}
            className={`menu__tab ${tab === 'male' ? 'is-active' : ''}`}
            onClick={() => setTab('male')}
          >
            Men services
          </button>
        </div>

        <div className="menu__groups" ref={list}>
          {groups.map((group) => (
            <div className="menu-group" key={group.title}>
              <h3 className="menu-group__title">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li className="menu-row" key={`${group.title}-${item.name}`}>
                    <span className="menu-row__name">{item.name}</span>
                    <span className="menu-row__dots" aria-hidden="true" />
                    {item.note && <span className="menu-row__note">{item.note}</span>}
                    <span className="menu-row__price">₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
