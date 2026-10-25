import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, ArrowLeft, Share2, Quote } from 'lucide-react';
import { ARTICLES } from '../data/products';
import { Article } from '../types';
import './JournalPage.css';

export const JournalPage: React.FC = () => {
  const location = useLocation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Check if URL hash matches an article
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      const found = ARTICLES.find((a) => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
        window.scrollTo(0, 0);
        return;
      }
    }
    setSelectedArticle(null);
  }, [location.hash]);

  return (
    <div className="journal-page">
      {/* Header Banner */}
      <section className="journal-hero">
        <div className="journal-hero-glow" />
        <div className="container-wide">
          <span className="eyebrow">CHRONICLES & CRITIQUE</span>
          <h1 className="journal-hero-title">
            THE JOURNAL <span className="font-editorial-italic">— VOLUME VII</span>
          </h1>
          <p className="journal-hero-sub">
            Essays on refractive geometry, sartorial optometry, Japanese metallurgy, and the philosophical language of chiaroscuro lighting.
          </p>
        </div>
      </section>

      <div className="container-wide journal-content-area">
        {selectedArticle ? (
          /* Single Article Reader View */
          <article className="single-article-view">
            <button
              onClick={() => setSelectedArticle(null)}
              className="article-back-btn"
            >
              <ArrowLeft size={16} />
              <span>RETURN TO ALL ESSAYS</span>
            </button>

            <header className="article-header">
              <span className="article-cat-tag">{selectedArticle.category}</span>
              <h1 className="article-title">{selectedArticle.title}</h1>
              <p className="article-subtitle">{selectedArticle.subtitle}</p>

              <div className="article-byline-row">
                <span className="byline-author">{selectedArticle.author}</span>
                <span className="byline-sep">•</span>
                <span className="byline-date">{selectedArticle.date}</span>
                <span className="byline-sep">•</span>
                <span className="byline-read">{selectedArticle.readTime}</span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="article-hero-image-frame">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
            </div>

            {/* Pull Quote */}
            <div className="article-pull-quote">
              <Quote size={28} className="pull-quote-icon" />
              <blockquote>"{selectedArticle.excerpt}"</blockquote>
            </div>

            {/* Article Paragraphs */}
            <div className="article-body-text">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <footer className="article-footer">
              <div className="article-share-note">
                <Share2 size={16} className="share-icon" />
                <span>Published in Eyora Private Salon Monograph • Sabae & Cadore Edition</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="btn-primary"
              >
                <span>EXPLORE MORE ESSAYS</span>
                <ArrowRight size={14} />
              </button>
            </footer>
          </article>
        ) : (
          /* All Articles Grid */
          <div className="journal-articles-grid">
            {ARTICLES.map((art) => (
              <article key={art.id} className="journal-index-card">
                <div
                  className="journal-index-media"
                  onClick={() => {
                    setSelectedArticle(art);
                    window.scrollTo(0, 0);
                  }}
                >
                  <img src={art.image} alt={art.title} />
                  <span className="journal-card-badge">{art.category}</span>
                </div>

                <div className="journal-index-body">
                  <div className="journal-index-meta">
                    <span>
                      <Calendar size={13} /> {art.date}
                    </span>
                    <span>
                      <Clock size={13} /> {art.readTime}
                    </span>
                  </div>

                  <h2
                    className="journal-index-title"
                    onClick={() => {
                      setSelectedArticle(art);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {art.title}
                  </h2>

                  <p className="journal-index-excerpt">{art.excerpt}</p>

                  <button
                    onClick={() => {
                      setSelectedArticle(art);
                      window.scrollTo(0, 0);
                    }}
                    className="link-editorial read-essay-btn"
                  >
                    READ ESSAY <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
