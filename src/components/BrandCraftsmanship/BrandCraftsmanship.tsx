import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Award, Gem, Sliders, Eye } from 'lucide-react';
import './BrandCraftsmanship.css';

export const BrandCraftsmanship: React.FC = () => {
  return (
    <section className="craft-section" aria-label="Eyora Lunetterie Philosophy & Craftsmanship">
      <div className="container-wide">
        <div className="craft-grid">
          {/* Left Column: Visual with Atelier Master Photograph */}
          <div className="craft-visual-col">
            <div className="craft-image-frame">
              <img
                src="/images/atelier-craft.jpg"
                alt="Master artisan crafting bespoke Eyora titanium and horn frame"
                className="craft-main-img"
                loading="lazy"
              />
              <div className="craft-image-vignette" />

              {/* Floating Craft Inset */}
              <div className="craft-inset-card">
                <span className="craft-inset-tag">SABAE ATELIER LAB</span>
                <p className="craft-inset-quote">
                  "A millimeter in lunetterie is an eternity. We measure in tenths of a millimeter and calibrate by human touch."
                </p>
                <span className="craft-inset-author">— Kenji Takahashi, Senior Horological Lunetier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Craft Pillars */}
          <div className="craft-content-col">
            <span className="eyebrow">THE CRAFT OF SEEING</span>
            <h2 className="craft-section-title">
              THE PURSUIT OF <span className="font-editorial-italic">ABSOLUTE EQUILIBRIUM</span>
            </h2>

            <div className="craft-divider" />

            <p className="craft-lead-text">
              Eyewear is the only sartorial object that rests perpetually upon the nerve endings of your temples and nasal bone. It cannot simply look magnificent; it must disappear from your consciousness while defining your presence.
            </p>

            {/* 4 Pillars Grid */}
            <div className="craft-pillars-grid">
              <div className="craft-pillar-item">
                <div className="pillar-icon-wrap">
                  <Gem size={20} className="pillar-icon" />
                </div>
                <div className="pillar-text">
                  <h4 className="pillar-title">52-Step Beechwood Tumbling</h4>
                  <p className="pillar-desc">
                    Acetate frames are tumbled continuously for 96 hours in seasoned Japanese beechwood cubes and pumice paste to produce a mirror-like organic sheen.
                  </p>
                </div>
              </div>

              <div className="craft-pillar-item">
                <div className="pillar-icon-wrap">
                  <Sliders size={20} className="pillar-icon" />
                </div>
                <div className="pillar-text">
                  <h4 className="pillar-title">Zero-Fatigue Ergonomics</h4>
                  <p className="pillar-desc">
                    Weighted teardrop temple terminals counterbalance front lens load, shifting the gravitational center toward the ear curve.
                  </p>
                </div>
              </div>

              <div className="craft-pillar-item">
                <div className="pillar-icon-wrap">
                  <Award size={20} className="pillar-icon" />
                </div>
                <div className="pillar-text">
                  <h4 className="pillar-title">Pure Japanese Beta-Titanium</h4>
                  <p className="pillar-desc">
                    Cold-forged in Fukui Prefecture to withstand 1.2 million flex cycles without fatigue, pitting, or skin sensitization.
                  </p>
                </div>
              </div>

              <div className="craft-pillar-item">
                <div className="pillar-icon-wrap">
                  <Eye size={20} className="pillar-icon" />
                </div>
                <div className="pillar-text">
                  <h4 className="pillar-title">Chiaroscuro Mineral Clarity</h4>
                  <p className="pillar-desc">
                    High Abbe-value 58 optical lenses equipped with 7-layer oleophobic, hydrophobic, and anti-reflective inner coatings.
                  </p>
                </div>
              </div>
            </div>

            <div className="craft-action-row">
              <Link to="/our-story" className="btn-primary">
                <span>READ THE ATELIER MANIFESTO</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
