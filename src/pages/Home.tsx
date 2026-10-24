import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { FeaturedCollections } from '../components/FeaturedCollections/FeaturedCollections';
import { Bestsellers } from '../components/Bestsellers/Bestsellers';
import { BrandCraftsmanship } from '../components/BrandCraftsmanship/BrandCraftsmanship';
import { PressReviews } from '../components/PressReviews/PressReviews';
import { EditorialJournalSnippet } from '../components/EditorialJournal/EditorialJournalSnippet';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="homepage-wrapper">
      {/* Section A: Cinematic Hero */}
      <Hero />

      {/* Section B: Featured Collections */}
      <FeaturedCollections />

      {/* Section C: Bestselling Eyewear */}
      <Bestsellers />

      {/* Brand Craftsmanship & Atelier Philosophy */}
      <BrandCraftsmanship />

      {/* Editorial Press Acclaim */}
      <PressReviews />

      {/* Editorial Journal Chronicles */}
      <EditorialJournalSnippet />
    </div>
  );
};
