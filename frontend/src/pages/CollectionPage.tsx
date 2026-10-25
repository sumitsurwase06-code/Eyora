import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { apiService } from '../services/apiService';
import { Product, EyewearCategory, EyewearShape, EyewearMaterial } from '../types';
import { ProductCard } from '../components/ProductCard/ProductCard';
import './CollectionPage.css';

export const CollectionPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Read filter states from URL search params or fallback
  const categoryParam = (searchParams.get('category') as EyewearCategory) || 'all';
  const shapeParam = (searchParams.get('shape') as EyewearShape) || 'all';
  const materialParam = (searchParams.get('material') as EyewearMaterial) || 'all';
  const sortParam = (searchParams.get('sortBy') as 'featured' | 'price-asc' | 'price-desc' | 'newest') || 'featured';

  const [category, setCategory] = useState<EyewearCategory>(categoryParam);
  const [shape, setShape] = useState<EyewearShape>(shapeParam);
  const [material, setMaterial] = useState<EyewearMaterial>(materialParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>(sortParam);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync with searchParams
  useEffect(() => {
    const cat = (searchParams.get('category') as EyewearCategory) || 'all';
    const shp = (searchParams.get('shape') as EyewearShape) || 'all';
    const mat = (searchParams.get('material') as EyewearMaterial) || 'all';
    const srt = (searchParams.get('sortBy') as any) || 'featured';

    setCategory(cat);
    setShape(shp);
    setMaterial(mat);
    setSortBy(srt);
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getProducts({
          category,
          shape,
          material,
          sortBy,
        });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching collection:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category, shape, material, sortBy]);

  const updateParam = (key: string, val: string) => {
    const current = new URLSearchParams(searchParams);
    if (val === 'all') {
      current.delete(key);
    } else {
      current.set(key, val);
    }
    setSearchParams(current);
  };

  const handleCategoryChange = (cat: EyewearCategory) => {
    setCategory(cat);
    updateParam('category', cat);
  };

  const handleShapeChange = (shp: EyewearShape) => {
    setShape(shp);
    updateParam('shape', shp);
  };

  const handleMaterialChange = (mat: EyewearMaterial) => {
    setMaterial(mat);
    updateParam('material', mat);
  };

  const handleSortChange = (srt: any) => {
    setSortBy(srt);
    updateParam('sortBy', srt);
  };

  const resetAllFilters = () => {
    setCategory('all');
    setShape('all');
    setMaterial('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = category !== 'all' || shape !== 'all' || material !== 'all' || sortBy !== 'featured';

  return (
    <div className="collection-page">
      {/* Editorial Header Banner */}
      <section className="collection-hero-banner">
        <div className="collection-hero-glow" />
        <div className="container-wide">
          <span className="eyebrow">THE ARCHIVE</span>
          <h1 className="collection-hero-title">
            HAUTE LUNETTERIE <span className="font-editorial-italic">CATALOGUE</span>
          </h1>
          <p className="collection-hero-desc">
            Explore our meticulously engineered spectacles and sculpted sunglasses. Each piece is hand-finished in Sabae and Cadore from Japanese beta-titanium and Italian bio-acetate.
          </p>

          {/* Category Tabs */}
          <div className="collection-category-tabs" role="tablist">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`cat-tab-btn ${category === 'all' ? 'active' : ''}`}
            >
              All Masterworks
            </button>
            <button
              onClick={() => handleCategoryChange('eyeglasses')}
              className={`cat-tab-btn ${category === 'eyeglasses' ? 'active' : ''}`}
            >
              Optical Spectacles
            </button>
            <button
              onClick={() => handleCategoryChange('sunglasses')}
              className={`cat-tab-btn ${category === 'sunglasses' ? 'active' : ''}`}
            >
              Sculpted Sunglasses
            </button>
            <button
              onClick={() => handleCategoryChange('atelier')}
              className={`cat-tab-btn ${category === 'atelier' ? 'active' : ''}`}
            >
              The Atelier Editions
            </button>
          </div>
        </div>
      </section>

      {/* Main Filter & Grid Container */}
      <div className="container-wide collection-main-section">
        {/* Controls Bar */}
        <div className="collection-controls-bar">
          <div className="controls-left">
            <span className="results-count">
              {isLoading ? 'Cataloguing...' : `SHOWING ${products.length} ATELIER CREATIONS`}
            </span>

            {hasActiveFilters && (
              <button onClick={resetAllFilters} className="reset-filters-btn">
                <RotateCcw size={13} />
                <span>RESET FILTERS</span>
              </button>
            )}
          </div>

          <div className="controls-right">
            {/* Shape Filter Dropdown */}
            <div className="filter-select-wrap">
              <label htmlFor="shape-select">Silhouette:</label>
              <select
                id="shape-select"
                value={shape}
                onChange={(e) => handleShapeChange(e.target.value as EyewearShape)}
                className="custom-select"
              >
                <option value="all">All Geometries</option>
                <option value="round">Round & Panto</option>
                <option value="geometric">Geometric Hexagonal</option>
                <option value="square">Architectural Square</option>
                <option value="cat-eye">Sculpted Cat-Eye</option>
                <option value="aviator">Pilot Double-Bridge</option>
              </select>
            </div>

            {/* Material Filter Dropdown */}
            <div className="filter-select-wrap">
              <label htmlFor="material-select">Material:</label>
              <select
                id="material-select"
                value={material}
                onChange={(e) => handleMaterialChange(e.target.value as EyewearMaterial)}
                className="custom-select"
              >
                <option value="all">All Materials</option>
                <option value="titanium">Japanese Beta-Titanium</option>
                <option value="acetate">10mm Bio-Acetate</option>
                <option value="horn">Natural Water Buffalo Horn</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-select-wrap">
              <label htmlFor="sort-select">Sort By:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="custom-select"
              >
                <option value="featured">Featured & Signature</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="mobile-filter-trigger"
            >
              <SlidersHorizontal size={16} />
              <span>FILTERS</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="collection-loading-state">
            <span className="bestsellers-loader" />
            <p>Accessing the private collection vault...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="collection-empty-state">
            <h3 className="empty-heading">No Frames Match Your Selection</h3>
            <p className="empty-sub">
              Try adjusting your geometry or material filters to discover matching creations.
            </p>
            <button onClick={resetAllFilters} className="btn-primary">
              RESET ALL CRITERIA
            </button>
          </div>
        ) : (
          <div className="collection-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
