import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
} from 'lucide-react';
import './Hero.css';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoSource = '/videos/eyora-hero.mp4';
  const posterSource = '/images/eyora-hero-poster.jpg';
  const campaignPhoto = '/images/hero-campaign.jpg';

  // Check for prefers-reduced-motion and data-saver mode
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Check data saver connection
  useEffect(() => {
    const nav = navigator as any;
    if (nav.connection?.saveData) {
      setVideoError(true); // Gracefully fallback to poster on data saver
    }
  }, []);

  // Handle video playback
  useEffect(() => {
    if (prefersReducedMotion || videoError) return;

    if (videoRef.current) {
      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.info('Autoplay prevented or pending user interaction:', err);
            setIsPlaying(false);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, prefersReducedMotion, videoError]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Hero video failed to load, falling back to static poster.');
    setVideoError(true);
    setIsVideoLoaded(true);
  };

  return (
    <section className="hero-section" aria-label="Eyora Haute Lunetterie Editorial Campaign">
      {/* 1. Cinematic Video Background Layer */}
      <div className="hero-video-backdrop" aria-hidden="true">
        {!videoError && !prefersReducedMotion ? (
          <video
            ref={videoRef}
            src={videoSource}
            poster={posterSource}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            className={`hero-video-element ${isVideoLoaded ? 'is-visible' : ''}`}
          />
        ) : null}

        {/* Static Poster Fallback (active while loading, on reduced motion, or on video error) */}
        <div
          className={`hero-video-poster-fallback ${
            videoError || prefersReducedMotion || !isVideoLoaded ? 'is-active' : ''
          }`}
          style={{ backgroundImage: `url(${posterSource})` }}
        />

        {/* Deep Espresso & Warm Amber Readability Scrims */}
        <div className="hero-espresso-overlay" />
        <div className="hero-amber-light-sweep" />
      </div>

      {/* 2. Ambient Radial Glow Elements */}
      <div className="hero-glow-layer hero-glow-primary" />
      <div className="hero-glow-layer hero-glow-secondary" />

      {/* 3. Decorative Editorial Grid Lines */}
      <div className="hero-grid-lines container-wide" aria-hidden="true">
        <div className="grid-line line-left" />
        <div className="grid-line line-center" />
        <div className="grid-line line-right" />
      </div>

      {/* 4. Main Hero Content Layout */}
      <div className="container-wide hero-container">
        <div className="hero-layout">
          {/* Left: Editorial Typography & Actions (Fades in seamlessly once media is ready) */}
          <div className={`hero-content ${isVideoLoaded ? 'media-ready' : 'media-loading'}`}>
            <div className="hero-eyebrow-wrap animate-fade-in">
              <span className="eyebrow">THE ART OF SEEING</span>
              <span className="hero-edition-marker">EDITION 2026/27</span>
            </div>

            <h1 className="hero-title animate-fade-in">
              BEYOND
              <span className="hero-title-italic">THE ORDINARY.</span>
            </h1>

            <div className="hero-separator" />

            <p className="hero-description animate-fade-in">
              Distinctive eyewear. Handcrafted in Sabae and Cadore from aerospace Japanese beta-titanium and cured Italian bio-acetate. Thoughtfully designed for the way you see the world.
            </p>

            <div className="hero-actions animate-fade-in">
              <Link to="/collection" className="btn-primary hero-btn-main">
                <span>DISCOVER THE COLLECTION</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link to="/collection?category=eyeglasses" className="btn-secondary hero-btn-sub">
                <span>EXPLORE EYEGLASSES</span>
              </Link>
            </div>

            {/* Editorial Metadata / Craft badges */}
            <div className="hero-craft-notes">
              <div className="craft-note-item">
                <ShieldCheck size={16} className="craft-icon" />
                <div className="craft-note-text">
                  <span className="craft-note-title">JAPANESE TITANIUM</span>
                  <span className="craft-note-desc">Fukui Prefecture cold-forged</span>
                </div>
              </div>

              <div className="craft-note-divider" />

              <div className="craft-note-item">
                <Compass size={16} className="craft-icon" />
                <div className="craft-note-text">
                  <span className="craft-note-title">10MM MAZZUCCHELLI</span>
                  <span className="craft-note-desc">Plant-based Italian acetate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dramatic Hero Visual Composition */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-ambient-circle" />

            <div className="hero-image-frame">
              {/* Campaign Model Photograph / Macro Still */}
              <img
                src={campaignPhoto}
                alt="Eyora campaign featuring bespoke sculpted eyewear"
                className="hero-campaign-image"
                loading="eager"
              />

              {/* Gradient Vignette & Mood Overlays */}
              <div className="hero-image-overlay-vignette" />
              <div className="hero-image-overlay-amber" />

              {/* Floating Editorial Badge */}
              <div className="hero-floating-badge">
                <span className="floating-badge-tag">NEW ATELIER RELEASE</span>
                <span className="floating-badge-name">Aurelius N° 01 — Titanium Gold</span>
                <Link to="/product/aurelius-round-titanium" className="floating-badge-link">
                  VIEW FRAME SPECIFICATIONS <ArrowUpRight size={12} />
                </Link>
              </div>

              {/* Fine Framing Accents */}
              <div className="hero-frame-corner top-left" />
              <div className="hero-frame-corner top-right" />
              <div className="hero-frame-corner bottom-left" />
              <div className="hero-frame-corner bottom-right" />
            </div>

            {/* Optical Coordinate Marker */}
            <div className="hero-coords-marker">
              <span>LAT 35.9431° N, LON 136.1852° E</span>
              <span>SABAE ATELIER LAB</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Minimal Ambient Video Controls (Bottom Left/Right) */}
      {!videoError && !prefersReducedMotion && (
        <div className="hero-cinematic-controls" aria-label="Video playback controls">
          <div className="cinematic-tag">
            <Film size={12} className="tag-icon" />
            <span>CINÉMATIQUE • VOL. VII</span>
          </div>

          <div className="controls-buttons-group">
            <button
              onClick={togglePlay}
              className="cinematic-ctrl-btn"
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
              title={isPlaying ? 'Pause film' : 'Play film'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={toggleMute}
              className="cinematic-ctrl-btn"
              aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
              title={isMuted ? 'Audio muted' : 'Audio active'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          </div>
        </div>
      )}

      {/* 6. Hero Bottom Scroll Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-caption">SCROLL TO EXPLORE ARCHIVE</span>
        <div className="scroll-line-track">
          <div className="scroll-line-pulse" />
        </div>
      </div>
    </section>
  );
};
