import { business } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img className="footer__logo" src="/images/a1-logo.png" alt="A1 Beauty Salon" loading="lazy" />
            <p className="footer__tagline">
              {business.legalName}
              <br />
              KIIT Road, Prasanti Vihar, Patia
            </p>
            <p className="footer__rating">
              <span className="stars">★★★★★</span> {business.rating} · {business.reviewCount} Google reviews
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <h4>Explore</h4>
            <a href="#studio">The studio</a>
            <a href="#services">Services</a>
            <a href="#menu">Price menu</a>
            <a href="#reviews">Reviews</a>
            <a href="#visit">Visit</a>
          </nav>

          <div className="footer__contact">
            <h4>Say hello</h4>
            <a href={`tel:${business.phoneHref}`}>{business.phone}</a>
            <a href={business.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={business.mapsUrl} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            <p>
              Open seven days
              <br />
              6:30 am — 9:00 pm
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {business.legalName}</span>
          <span>Prices from the studio&rsquo;s printed menu · Nov 2026</span>
          <span>Patia · Bhubaneswar</span>
        </div>
      </div>
    </footer>
  )
}
