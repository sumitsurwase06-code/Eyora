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

  // Exact selected cinematic video file
  const videoSource = '/videos/eyora-cinematic-hero.mp4';
  const posterSource = '/images/eyora-hero-poster.jpg';

  // Check for prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Check data-saver mode
  useEffect(() => {
    const nav = navigator as any;
    if (nav.connection?.saveData) {
      setVideoError(true); // Fallback to poster on data-saver
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
            console.info('Autoplay pending user gesture:', err);
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
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
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
    <section className="hero-section" aria-label="Eyora Haute Lunetterie Cinematic Campaign">
      {/* 1. Full-Bleed Edge-to-Edge Cinematic Video */}
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
          className={`hero-fullbleed-video ${isVideoLoaded ? 'is-visible' : ''}`}
        />
      ) : null}

      {/* Static Poster Fallback (active while video buffers, on reduced motion, or error) */}
      <div
        className={`hero-poster-fallback ${
          videoError || prefersReducedMotion || !isVideoLoaded ? 'is-active' : ''
        }`}
        style={{ backgroundImage: `url(${posterSource})` }}
        aria-hidden="true"
      />

      {/* 2. Multi-Layered Editorial Readability Scrims */}
      <div className="hero-editorial-overlay" aria-hidden="true" />
      <div className="hero-amber-highlight-sweep" aria-hidden="true" />

      {/* 3. Subtle Editorial Atmospheric Glow */}
      <div className="hero-ambient-glow" aria-hidden="true" />

      {/* 4. Main Hero Typography & Actions (Positioned on Left) */}
      <div className="container-wide hero-container">
        <div className={`hero-editorial-content ${isVideoLoaded ? 'media-ready' : 'media-loading'}`}>
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
      </div>

      {/* 5. Discreet Ambient Video Controls (Bottom Right) */}
      {!videoError && !prefersReducedMotion && (
        <div className="hero-cinematic-controls" aria-label="Cinematic video playback controls">
          <div className="cinematic-tag">
            <Film size={12} className="tag-icon" />
            <span>CINÉMATIQUE • VOL. VII</span>
          </div>

          <div className="controls-buttons-group">
            <button
              type="button"
              onClick={togglePlay}
              className="cinematic-ctrl-btn"
              aria-label={isPlaying ? 'Pause cinematic film' : 'Play cinematic film'}
              title={isPlaying ? 'Pause film' : 'Play film'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="cinematic-ctrl-btn"
              aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
              title={isMuted ? 'Soundtrack muted' : 'Soundtrack active'}
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
