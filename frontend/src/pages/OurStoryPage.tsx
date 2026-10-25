import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Gem, Compass, MapPin, ArrowRight, Award } from 'lucide-react';
import './OurStoryPage.css';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="story-page">
      {/* Hero Banner */}
      <section className="story-hero">
        <div className="story-hero-glow" />
        <div className="container-wide story-hero-content">
          <span className="eyebrow">OUR HERITAGE & CRAFT</span>
          <h1 className="story-hero-title">
            THE PURSUIT OF <span className="font-editorial-italic">SARTORIAL SIGHT</span>
          </h1>
          <p className="story-hero-lead">
            Eyora was founded with a singular conviction: that spectacles are not merely corrective lenses, but an intimate architectural mask that shapes human perception and dialogue.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Two Epicenters */}
      <section className="story-chapter container-wide">
        <div className="chapter-grid">
          <div className="chapter-text-col">
            <span className="caption-label">CHAPTER I: DUAL GEOGRAPHY</span>
            <h2 className="chapter-title">Between Sabae and Cadore</h2>
            <div className="craft-divider" />
            <p>
              In the mountainous sanctuary of Fukui Prefecture, Japan, artisans have spent over a century mastering cold-forged beta-titanium. Titanium cannot be rushed; it fractures under blunt force, demanding diamond micro-milling and controlled heat annealing.
            </p>
            <p>
              Across the globe in Cadore, Italy, generational cellulose masters cure plant-based cotton acetate for months in climate-controlled cellars until every internal molecular stress is pacified.
            </p>
            <p>
              Eyora bridges these two venerable civilizations of lunetterie, integrating Japanese structural eternity with Italian color luminescence.
            </p>
          </div>

          <div className="chapter-media-col">
            <div className="chapter-img-frame">
              <img
                src="/images/atelier-craft.jpg"
                alt="Eyora master craftsman at workbench"
                className="chapter-img"
              />
              <div className="chapter-img-tag">FUKUI PREFECTURE ATELIER</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The 52-Step Method */}
      <section className="story-method-section" id="craftsmanship">
        <div className="container-wide">
          <div className="method-header">
            <span className="eyebrow">UNCOMPROMISING DISCIPLINES</span>
            <h2 className="method-title">
              THE 52-STEP <span className="font-editorial-italic">ALCHEMIC PROCESS</span>
            </h2>
            <p className="method-desc">
              From raw 10mm organic cotton block to finished optical heirloom, every pair of Eyora spectacles journeys through 52 manual stations.
            </p>
          </div>

          <div className="steps-cards-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3 className="step-title">Diamond-Cut 3D Faceting</h3>
              <p className="step-desc">
                Front eyewires are milled with precise 37-degree bevels to direct natural daylight across the cheekbones with chiaroscuro definition.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">02</div>
              <h3 className="step-title">96-Hour Beechwood Tumbling</h3>
              <p className="step-desc">
                Barrel-tumbled in Japanese seasoned beechwood pegs infused with natural pumice paste for an organic, deep liquid luster.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">03</div>
              <h3 className="step-title">Through-Pinned Riveting</h3>
              <p className="step-desc">
                Hinges are cold-riveted completely through the frame temples by hand—guaranteeing lifetime mechanical stability without adhesives.
              </p>
            </div>

            <div className="step-card">
              <div className="step-num">04</div>
              <h3 className="step-title">Hand-Buffed Carnauba Wax</h3>
              <p className="step-desc">
                The final tactile finish is applied by senior lunetiers using unbleached organic cotton wheels and Brazilian carnauba wax.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Flagship Salons */}
      <section className="story-salons-section">
        <div className="container-wide">
          <div className="salons-header">
            <span className="eyebrow">PHYSICAL SPACES</span>
            <h2 className="salons-title">
              THE PRIVATE <span className="font-editorial-italic">SALONS</span>
            </h2>
            <p className="salons-desc">
              Experience private appointments, corneal curvature mapping, and custom bespoke fitting at our intimate salons.
            </p>
          </div>

          <div className="salons-grid">
            <div className="salon-card">
              <div className="salon-img-wrap">
                <img src="/images/still-frames.jpg" alt="Mumbai Flagship" />
              </div>
              <div className="salon-info">
                <span className="salon-tag">MAISON MUMBAI</span>
                <h3 className="salon-name">Aura House, Apollo Bunder, Colaba</h3>
                <p className="salon-detail">Overlooking the Arabian Sea. Private fitting rooms & complete optical dispensary.</p>
                <a href="mailto:mumbai@eyora-atelier.com" className="link-editorial">
                  REQUEST SALON APPOINTMENT <ArrowRight size={13} />
                </a>
              </div>
            </div>

            <div className="salon-card">
              <div className="salon-img-wrap">
                <img src="/images/hero-campaign.jpg" alt="New Delhi Salon" />
              </div>
              <div className="salon-info">
                <span className="salon-tag">ATELIER NEW DELHI</span>
                <h3 className="salon-name">The Crescent at Qutab, Mehrauli</h3>
                <p className="salon-detail">Surrounded by historic stone arches. Dedicated to bespoke titanium commissions.</p>
                <a href="mailto:delhi@eyora-atelier.com" className="link-editorial">
                  REQUEST SALON APPOINTMENT <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
