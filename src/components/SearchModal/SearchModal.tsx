import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { apiService } from '../../services/apiService';
import { Product } from '../../types';
import { formatINR } from '../../utils/formatters';
import './SearchModal.css';

const TRENDING_SEARCHES = [
  'Japanese Beta-Titanium',
  'Amber Havana Sunglasses',
  'Architectural Square',
  'Atelier Calibre 88',
  'Panto Round Optical',
  'Cadore Bio-Acetate',
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const doSearch = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const found = await apiService.getProducts({ searchQuery });
        setResults(found);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(doSearch, 150);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={closeSearch} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-bar">
          <Search size={22} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by silhouette, material, or design code..."
            className="search-main-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="search-clear-btn"
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="search-close-btn"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        {/* Search Body: Results or Trending */}
        <div className="search-modal-body">
          {searchQuery.trim() === '' ? (
            <div className="search-suggestions-wrap">
              <span className="caption-label">
                <Sparkles size={13} className="sparkle-icon" /> CURATED QUERIES
              </span>
              <div className="search-chips">
                {TRENDING_SEARCHES.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(chip)}
                    className="search-chip"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="search-category-shortcuts">
                <span className="caption-label">QUICK ARCHIVE LINKS</span>
                <div className="shortcuts-grid">
                  <Link
                    to="/collection?category=eyeglasses"
                    onClick={closeSearch}
                    className="shortcut-card"
                  >
                    <span className="shortcut-title">Optical Spectacles</span>
                    <span className="shortcut-sub">Titanium & horn frames</span>
                    <ArrowRight size={13} className="shortcut-arrow" />
                  </Link>

                  <Link
                    to="/collection?category=sunglasses"
                    onClick={closeSearch}
                    className="shortcut-card"
                  >
                    <span className="shortcut-title">Sculpted Sunglasses</span>
                    <span className="shortcut-sub">10mm bio-acetate & mineral glass</span>
                    <ArrowRight size={13} className="shortcut-arrow" />
                  </Link>

                  <Link
                    to="/collection?category=atelier"
                    onClick={closeSearch}
                    className="shortcut-card"
                  >
                    <span className="shortcut-title">Atelier Editions</span>
                    <span className="shortcut-sub">Numbered limited commissions</span>
                    <ArrowRight size={13} className="shortcut-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="search-results-wrap">
              <div className="search-results-header">
                <span className="results-count-text">
                  {isSearching ? 'SEARCHING ARCHIVE...' : `${results.length} FRAMES DISCOVERED`}
                </span>
              </div>

              {results.length === 0 && !isSearching ? (
                <div className="search-no-results">
                  <p>No eyewear match found for "{searchQuery}".</p>
                  <span>Try exploring by material like "Titanium" or "Acetate".</span>
                </div>
              ) : (
                <div className="search-results-grid">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="search-result-card"
                    >
                      <div className="search-result-thumb">
                        <img src={product.defaultImage} alt={product.name} />
                      </div>
                      <div className="search-result-info">
                        <span className="search-result-tag">{product.category.toUpperCase()} • {product.shape.toUpperCase()}</span>
                        <h4 className="search-result-name">{product.name}</h4>
                        <p className="search-result-sub">{product.subtitle}</p>
                        <span className="search-result-price">{formatINR(product.price)}</span>
                      </div>
                      <ArrowRight size={16} className="result-arrow" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
