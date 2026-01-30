'use client';


import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Transition } from 'motion/react';

import { PageBlocksHero, PageBlocksHeroSlides } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Section } from '../layout/section';
import { AnimatedGroup } from '../motion-primitives/animated-group';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

// ============================================================================
// Constants
// ============================================================================

const AUTOPLAY_INTERVAL_MS = 5000;
const SLIDE_TRANSITION_MS = 700;

const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.75,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Normalizes slides data, supporting both new slides array and legacy single image
 */
function getSlides(data: PageBlocksHero): PageBlocksHeroSlides[] {
  if (data.slides && data.slides.length > 0) {
    return data.slides as PageBlocksHeroSlides[];
  }
  if (data.image) {
    return [data.image as PageBlocksHeroSlides];
  }
  return [];
}

/**
 * Extracts YouTube video ID from embed URL
 */
function extractYouTubeVideoId(url: string): string {
  const embedPrefix = '/embed/';
  const idx = url.indexOf(embedPrefix);
  if (idx !== -1) {
    return url.substring(idx + embedPrefix.length).split('?')[0];
  }
  return '';
}

/**
 * Gets YouTube thumbnail URL from video ID
 */
function getYouTubeThumbnail(videoId: string): string {
  return `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

// ============================================================================
// Custom Hook for Slider Logic
// ============================================================================

interface UseSliderProps {
  totalSlides: number;
  autoplayInterval?: number;
}

interface UseSliderReturn {
  currentSlide: number;
  isAutoPlaying: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

function useSlider({ totalSlides, autoplayInterval = AUTOPLAY_INTERVAL_MS }: UseSliderProps): UseSliderReturn {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides, autoplayInterval]);

  const goToSlide = React.useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  }, [totalSlides]);

  const prevSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  }, [totalSlides]);

  return { currentSlide, isAutoPlaying, goToSlide, nextSlide, prevSlide };
}

// ============================================================================
// Components
// ============================================================================

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
}) => {
  if (totalSlides <= 1) return null;

  return (
    <>
      {/* Arrow Navigation */}
      <button
        onClick={onPrevious}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full p-2 shadow-lg transition-all hover:scale-110 border border-border/50'
        aria-label='Previous slide'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>

      <button
        onClick={onNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background backdrop-blur-sm rounded-full p-2 shadow-lg transition-all hover:scale-110 border border-border/50'
        aria-label='Next slide'
      >
        <ChevronRight className='w-6 h-6' />
      </button>

      {/* Dot Indicators */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`transition-all duration-300 rounded-full ${currentSlide === index
              ? 'bg-primary w-8 h-2'
              : 'bg-background/60 hover:bg-background/80 w-2 h-2'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

interface SlideContentProps {
  slide: PageBlocksHeroSlides;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  // Video slide
  if (slide.videoUrl) {
    const videoId = extractYouTubeVideoId(slide.videoUrl);
    const thumbnailSrc = slide.src || (videoId ? getYouTubeThumbnail(videoId) : '');

    return (
      <div className='relative w-full h-full'>
        <HeroVideoDialog
          videoSrc={slide.videoUrl}
          thumbnailSrc={thumbnailSrc}
          thumbnailAlt='Hero Video'
        />
        {slide.actions && slide.actions.length > 0 && (
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center justify-center gap-2'>
            {slide.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className='bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5'
              >
                <Button
                  asChild
                  size='lg'
                  variant={action!.type === 'link' ? 'ghost' : 'default'}
                  className='rounded-xl px-5 text-base shadow-xl'
                >
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action.icon} />}
                    <span className='text-nowrap'>{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Image slide
  if (slide.src) {
    return (
      <div className='relative w-full h-full'>
        <Image
          className='z-2 border-border/25 aspect-15/8 relative rounded-2xl border w-full h-full object-cover'
          alt={slide.alt || 'Hero slide'}
          src={slide.src}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
        />
        {slide.actions && slide.actions.length > 0 && (
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center justify-center gap-2'>
            {slide.actions.map((action) => (
              <div
                key={action!.label}
                data-tina-field={tinaField(action)}
                className='bg-foreground/10 backdrop-blur-sm rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5'
              >
                <Button
                  asChild
                  size='lg'
                  variant={action!.type === 'link' ? 'ghost' : 'default'}
                  className='rounded-xl px-5 text-base shadow-xl'
                >
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action.icon} />}
                    <span className='text-nowrap'>{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

interface HeroSliderProps {
  slides: PageBlocksHeroSlides[];
  data: PageBlocksHero;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, data }) => {
  const totalSlides = slides.length;
  const { currentSlide, goToSlide, nextSlide, prevSlide } = useSlider({ totalSlides });

  if (slides.length === 0) return null;

  return (
    <AnimatedGroup variants={transitionVariants}>
      <div className='relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 max-w-full'>
        <div className='inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1'>
          <div className='relative overflow-hidden rounded-2xl'>
            {/* Slides Container */}
            <div className='relative' style={{ aspectRatio: '15/8' }}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className='absolute inset-0 transition-all ease-in-out'
                  style={{
                    opacity: currentSlide === index ? 1 : 0,
                    transform: `translateX(${(index - currentSlide) * 100}%)`,
                    transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
                  }}
                  data-tina-field={tinaField(data, 'slides', index)}
                >
                  <SlideContent slide={slide} />
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <SlideNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrevious={prevSlide}
              onNext={nextSlide}
              onGoToSlide={goToSlide}
            />
          </div>
        </div>
      </div>
    </AnimatedGroup>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const Hero: React.FC<{ data: PageBlocksHero }> = ({ data }) => {
  const slides = getSlides(data);

  return (
    <Section background={data.background ?? undefined}>
      <HeroSlider slides={slides} data={data} />
    </Section>
  );
};


