import React from 'react';
import { Quote } from 'lucide-react';
import { PRESS_QUOTES } from '../../data/products';
import './PressReviews.css';

export const PressReviews: React.FC = () => {
  return (
    <section className="press-section" aria-label="Press and Editorial Reviews">
      <div className="container">
        <div className="press-header">
          <span className="eyebrow">ACCLAIM & CRITIQUE</span>
          <h2 className="press-heading">
            AS NOTED BY <span className="font-editorial-italic">THE CRITICS</span>
          </h2>
        </div>

        <div className="press-grid">
          {PRESS_QUOTES.map((item, idx) => (
            <div key={idx} className="press-card">
              <Quote size={28} className="press-quote-icon" />
              <blockquote className="press-quote-text">
                "{item.quote}"
              </blockquote>
              <div className="press-attribution">
                <span className="press-pub-name">{item.publication}</span>
                <span className="press-pub-edition">{item.edition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
