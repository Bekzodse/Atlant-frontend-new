'use client'
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

interface CarouselSliderProps {
  images: string[];
}

export default function CarouselSlider({ images }: CarouselSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center'
    });
    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentSlide(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    if (images.length === 0) {
        return (
            <div className="w-full mx-auto">
                <div className="relative w-full h-[300px] lg:h-[500px] bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">No carousel images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            <div id="default-carousel" className="relative w-full h-[300px] lg:h-[500px] select-none overflow-hidden bg-gray-100">
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {images.map((src, index) => (
                            <div
                                key={index}
                                className="flex-[0_0_100%] min-w-0 relative h-full"
                            >
                                <Image
                                    src={src}
                                    className="w-full h-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                    width={1920}
                                    height={1080}
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute z-30 flex -translate-x-1/2 bottom-3 sm:bottom-4 left-1/2 space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                                index === currentSlide ? 'bg-primary' : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-current={index === currentSlide}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-30 cursor-pointer group focus:outline-none"
                    onClick={scrollPrev}
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors duration-200 group-focus:ring-4 group-focus:ring-primary/50">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>

                <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-30 cursor-pointer group focus:outline-none"
                    onClick={scrollNext}
                >
                    <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors duration-200 group-focus:ring-4 group-focus:ring-primary/50">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
