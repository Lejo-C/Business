import React, { useState, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 144;

const getFramePath = (index) => {
  const pad = String(index).padStart(4, '0');
  return `/frames/frame_${pad}.png`;
};

export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const imagesRef = useRef([]);
  const loadedFramesRef = useRef(new Set());
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const lastRenderedFrameRef = useRef(-1);

  // Preload high-resolution 2.5K PNG frames progressively
  useEffect(() => {
    setLoaded(true);

    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          images[index - 1] = img;
          loadedFramesRef.current.add(index);
          if (Math.round(currentFrameRef.current) === index) {
            renderFrame(index);
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
      });
    };

    // Load Frame 1 first for immediate display
    loadFrame(1).then(() => {
      renderFrame(1);
      // Progressively preload remaining frames
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    });
  }, []);

  // Helper to find nearest loaded frame if target frame is downloading
  const getNearestLoadedFrame = (targetIndex) => {
    if (loadedFramesRef.current.has(targetIndex)) {
      return imagesRef.current[targetIndex - 1];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 1 && loadedFramesRef.current.has(prev)) {
        return imagesRef.current[prev - 1];
      }
      const next = targetIndex + offset;
      if (next <= TOTAL_FRAMES && loadedFramesRef.current.has(next)) {
        return imagesRef.current[next - 1];
      }
    }
    return imagesRef.current[0];
  };

  // Direct High-Resolution Pixel Canvas Engine (1:1 Native Resolution Rendering)
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const img = getNearestLoadedFrame(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Physical device pixel resolution
    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    const canvasWidth = Math.round(cssWidth * dpr);
    const canvasHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    }

    // High fidelity bicubic smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate object-fit cover directly in physical device pixels
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = Math.round(canvasWidth / imgRatio);
      offsetX = 0;
      offsetY = Math.round((canvasHeight - drawHeight) / 2);
    } else {
      drawWidth = Math.round(canvasHeight * imgRatio);
      drawHeight = canvasHeight;
      offsetX = Math.round((canvasWidth - drawWidth) / 2);
      offsetY = 0;
    }

    // Direct 1:1 hardware blit onto physical buffer
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Scroll mapping & smooth animation loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      const newTarget = 1 + progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = prefersReducedMotion ? Math.round(newTarget) : newTarget;
    };

    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    let animationFrameId;

    const animLoop = () => {
      if (!prefersReducedMotion) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.001) {
          currentFrameRef.current += diff * 0.15; // Smooth LERP
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(currentFrameRef.current)));

      // Update normalized progress (0.0 to 1.0) for smooth text transitions
      const normProgress = Math.max(0, Math.min(1, (currentFrameRef.current - 1) / (TOTAL_FRAMES - 1)));
      setScrollProgress(normProgress);

      if (frameToDraw !== lastRenderedFrameRef.current) {
        renderFrame(frameToDraw);
        lastRenderedFrameRef.current = frameToDraw;
      }

      animationFrameId = requestAnimationFrame(animLoop);
    };

    animationFrameId = requestAnimationFrame(animLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute smooth seamless transitions for Stage 1 and Stage 2 text blocks
  const stage1Opacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.12) / 0.25));
  const stage1TranslateY = -Math.max(0, scrollProgress - 0.05) * 140;

  const stage2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.32) / 0.28));
  const stage2Opacity = stage2Progress;
  const stage2TranslateY = (1 - stage2Progress) * 70;

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#092b48] font-sans selection:bg-white/20 select-none"
    >
      {/* Pinned Sticky Full-Screen Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Full-Screen High-Resolution Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Subtle Sky Vignette Overlay for Text Legibility */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(6, 34, 59, 0.35) 0%, rgba(13, 56, 94, 0.1) 30%, transparent 60%, rgba(0,0,0,0.15) 100%)'
          }}
        />

        {/* Top Navigation Bar */}
        <header className="relative z-30 w-full pt-6 md:pt-7 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* Far Left Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-white text-base md:text-lg font-medium tracking-tight hover:opacity-90 transition-opacity"
            >
              PIKACHU
            </a>
          </div>

          {/* Center Desktop Navigation Pill */}
          <nav className="hidden md:flex items-center bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md border border-white/20 rounded-full px-7 py-2 transition-all duration-300 shadow-sm">
            <div className="flex items-center space-x-8 text-xs md:text-[13px] font-medium text-white/90">
              <a href="https://portfolio-lejo-c.netlify.app/" className="hover:text-white transition-colors">About Me</a>
              <a href="https://portfolio-lejo-c.netlify.app/" className="hover:text-white transition-colors">Contact Me</a>
            </div>
          </nav>

          {/* Far Right Action Links */}
          <div className="flex items-center space-x-5 md:space-x-6">
            <a 
              href="#login" 
              className="text-xs md:text-[13px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Login
            </a>
            <a 
              href="#get-started" 
              className="bg-white/[0.1] hover:bg-white/[0.2] active:scale-95 backdrop-blur-md border border-white/20 text-white text-xs md:text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-sm"
            >
              Get started
            </a>

            {/* Mobile Hamburger Button */}
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1.5 rounded-lg focus:outline-none bg-white/10"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Nav */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-6 right-6 mt-3 p-4 bg-[#0d385e]/95 backdrop-blur-xl border border-white/20 rounded-2xl md:hidden shadow-2xl flex flex-col space-y-3 z-50">
              <a href="#what-we-do" className="text-white/90 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/10 text-sm font-medium">What we do</a>
              <a href="#ai-intelligence" className="text-white/90 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/10 text-sm font-medium">AI Intelligence</a>
              <a href="#tools" className="text-white/90 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/10 text-sm font-medium">Tools</a>
              <a href="#blog" className="text-white/90 hover:text-white py-1.5 px-3 rounded-lg hover:bg-white/10 text-sm font-medium">Blog</a>
            </div>
          )}
        </header>

        {/* Hero Content Container */}
        <div className={`relative z-20 flex-1 flex items-center justify-center text-center px-4 pt-12 md:pt-16 pb-12 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Stage 1: Initial Headline Content (Fades out & floats up on scroll) */}
          <div 
            className="absolute inset-x-0 mx-auto max-w-5xl flex flex-col items-center px-4"
            style={{
              opacity: stage1Opacity,
              transform: `translateY(${stage1TranslateY}px)`,
              pointerEvents: stage1Opacity > 0.1 ? 'auto' : 'none'
            }}
          >
            {/* Main Handwritten Headline */}
            <h1 className="font-handwriting text-white text-6xl sm:text-8xl md:text-[105px] lg:text-[120px] xl:text-[128px] leading-[0.9] font-medium tracking-wide drop-shadow-md select-none">
              <span className="block">Every adventure</span>
              <span className="block mt-1 sm:mt-2">starts somewhere.</span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 md:mt-7 text-white/90 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-lg mx-auto tracking-wide">
              Explore a world of color, energy, and little moments worth chasing.
            </p>

            {/* Pill CTA Button */}
            <div className="mt-7 md:mt-9">
              <a
                href="#about"
                className="group relative inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-medium text-xs md:text-[13px] pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 rounded-full shadow-lg shadow-black/15 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="ml-1 font-semibold text-slate-900">About the platform</span>
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Stage 2: PIKACHU Headline Content (Fades in & rises seamlessly as you scroll halfway) */}
          <div 
            className="absolute inset-x-0 mx-auto max-w-5xl flex flex-col items-center px-4"
            style={{
              opacity: stage2Opacity,
              transform: `translateY(${stage2TranslateY}px)`,
              pointerEvents: stage2Opacity > 0.1 ? 'auto' : 'none'
            }}
          >
            {/* PIKACHU Handwritten Headline */}
            <h1 className="font-handwriting text-white text-7xl sm:text-9xl md:text-[130px] lg:text-[150px] xl:text-[170px] leading-[0.85] font-semibold tracking-wider drop-shadow-lg select-none">
              <span className="block">PIKACHU</span>
            </h1>

            {/* Subheading for PIKACHU */}
            <p className="mt-6 md:mt-7 text-white/90 text-xs sm:text-sm md:text-[16px] font-normal leading-relaxed max-w-lg mx-auto tracking-wide">
              Electric energy, unbridled joy, and a world waiting to be explored.
            </p>

            {/* Pill CTA Button */}
            <div className="mt-7 md:mt-9">
              <a
                href="#explore"
                className="group relative inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-medium text-xs md:text-[13px] pl-5 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2 rounded-full shadow-lg shadow-black/15 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="ml-1 font-semibold text-slate-900">Explore the world</span>
                <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="w-3 h-3 md:w-3.5 md:h-3.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 pb-6 flex justify-center items-center opacity-75">
          <div className="flex flex-col items-center gap-1.5 text-white/70 text-[11px] font-medium tracking-wider uppercase">
            <span>Scroll to animate</span>
            <div className="w-4 h-7 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
              <div className="w-1 h-1.5 bg-white/80 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
