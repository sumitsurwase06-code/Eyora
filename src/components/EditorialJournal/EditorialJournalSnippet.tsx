import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { ARTICLES } from '../../data/products';
import './EditorialJournalSnippet.css';

export const EditorialJournalSnippet: React.FC = () => {
  return (
    <section className="journal-snippet-section" aria-label="Eyora Editorial Journal">
      <div className="container-wide">
        <div className="journal-snippet-header">
          <div className="journal-snippet-title-wrap">
            <span className="eyebrow">THE ATELIER CHRONICLES</span>
            <h2 className="journal-snippet-heading">
              JOURNAL <span className="font-editorial-italic">— VOLUME VII</span>
            </h2>
          </div>
          <Link to="/journal" className="link-editorial">
            READ ALL ESSAYS <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="journal-snippet-grid">
          {ARTICLES.map((article) => (
            <article key={article.id} className="journal-card">
              <Link to={`/journal#${article.slug}`} className="journal-card-media">
                <img src={article.image} alt={article.title} className="journal-img" loading="lazy" />
                <div className="journal-img-overlay" />
                <span className="journal-category-badge">{article.category}</span>
              </Link>

              <div className="journal-card-body">
                <div className="journal-meta-row">
                  <span className="journal-meta-item">
                    <Calendar size={13} /> {article.date}
                  </span>
                  <span className="journal-meta-item">
                    <Clock size={13} /> {article.readTime}
                  </span>
                </div>

                <h3 className="journal-card-title">
                  <Link to={`/journal#${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="journal-card-excerpt">{article.excerpt}</p>

                <Link to={`/journal#${article.slug}`} className="journal-read-link">
                  CONTINUE READING <ArrowUpRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
