import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './FeaturedCollections.css';

interface CollectionItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  isLarge?: boolean;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'sig-optics',
    tag: 'ARCHITECTURAL PRECISION',
    title: 'Signature Eyeglasses',
    subtitle: 'Cold-forged Japanese titanium eyewires & coin-edge filigree',
    description: 'Minimalist contours designed for intellectual weightlessness. Engineered to rest naturally upon the nasal bridge with zero pinch points.',
    image: '/images/products/frame-aurelius.jpg',
    link: '/collection?category=eyeglasses',
    isLarge: true,
  },
  {
    id: 'sculpt-sun',
    tag: 'CINEMATIC CHIAROSCURO',
    title: 'Sculpted Sunglasses',
    subtitle: '10mm cured Italian Mazzucchelli bio-acetate',
    description: 'Substantial silhouettes cut with 37-degree light-catching bevels and warm bronze polarized mineral glass.',
    image: '/images/sculpted-sunglasses.jpg',
    link: '/collection?category=sunglasses',
  },
  {
    id: 'atelier-edition',
    tag: 'LIMITED ARCHIVE',
    title: 'The Atelier Collection',
    subtitle: 'Water buffalo horn, 24K gold accents & numbered editions',
    description: 'Masterworks produced in Sabae, Japan. Individually serialized and presented in handcrafted walnut chests.',
    image: '/images/still-frames.jpg',
    link: '/collection?category=atelier',
  },
  {
    id: 'modern-classics',
    tag: 'HERITAGE ARCHETYPES',
    title: 'Modern Classics',
    subtitle: 'Reimagined aviators, panto shapes & tailored geometric forms',
    description: 'Timeless archetypes refined through high-precision modern metallurgy and biocompatible finishes.',
    image: '/images/products/frame-soleil.jpg',
    link: '/collection',
  },
];

export const FeaturedCollections: React.FC = () => {
  return (
    <section className="collections-section" aria-label="Curated Eyewear Collections">
      {/* Background Ambience */}
      <div className="collections-ambient-glow" />

      <div className="container-wide">
        {/* Section Header */}
        <div className="collections-header">
          <div className="collections-header-left">
            <span className="eyebrow">CURATED SUITES</span>
            <h2 className="collections-section-title">
              THE FOUR <span className="font-editorial-italic">ARCHETYPES</span>
            </h2>
          </div>
          <div className="collections-header-right">
            <p className="collections-intro-text">
              Four distinct design philosophies united by uncompromising artisanal mastery. Every pair is shaped through up to 280 meticulous steps across our Japanese and Italian workshops.
            </p>
            <Link to="/collection" className="link-editorial">
              VIEW COMPLETE ARCHIVE <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="collections-grid">
          {/* Card 1: Large Featured Lead Card */}
          <div className="collection-card collection-card--large">
            <div className="collection-card-media">
              <img
                src={COLLECTIONS[0].image}
                alt={COLLECTIONS[0].title}
                className="collection-img"
              />
              <div className="collection-img-gradient" />
            </div>

            <div className="collection-card-body">
              <span className="collection-card-tag">{COLLECTIONS[0].tag}</span>
              <h3 className="collection-card-title">{COLLECTIONS[0].title}</h3>
              <p className="collection-card-subtitle">{COLLECTIONS[0].subtitle}</p>
              <p className="collection-card-desc">{COLLECTIONS[0].description}</p>
              <Link to={COLLECTIONS[0].link} className="btn-primary collection-btn">
                <span>EXPLORE SIGNATURE OPTICAL</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column with Cards 2 & 3 */}
          <div className="collections-column-stack">
            {COLLECTIONS.slice(1, 3).map((item) => (
              <div key={item.id} className="collection-card collection-card--medium">
                <div className="collection-card-media">
                  <img src={item.image} alt={item.title} className="collection-img" />
                  <div className="collection-img-gradient" />
                </div>
                <div className="collection-card-body">
                  <span className="collection-card-tag">{item.tag}</span>
                  <h3 className="collection-card-title">{item.title}</h3>
                  <p className="collection-card-subtitle">{item.subtitle}</p>
                  <Link to={item.link} className="link-editorial collection-link">
                    EXPLORE SUITE <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Wide Banner Card 4: Modern Classics */}
          <div className="collection-card collection-card--wide">
            <div className="collection-card-media">
              <img
                src={COLLECTIONS[3].image}
                alt={COLLECTIONS[3].title}
                className="collection-img"
              />
              <div className="collection-img-gradient collection-img-gradient--horizontal" />
            </div>
            <div className="collection-card-body">
              <span className="collection-card-tag">{COLLECTIONS[3].tag}</span>
              <h3 className="collection-card-title">{COLLECTIONS[3].title}</h3>
              <p className="collection-card-desc">{COLLECTIONS[3].description}</p>
              <Link to={COLLECTIONS[3].link} className="link-editorial collection-link">
                DISCOVER CLASSICS <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
