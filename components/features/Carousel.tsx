import { fetchCarouselImages } from '@/lib/api/carousel';
import { carouselImages as fallbackImages } from '@/data/products';
import CarouselSlider from './CarouselSlider';
import { Suspense } from 'react';

function CarouselSkeleton() {
    return (
        <div className="w-full mx-auto">
            <div className="relative w-full h-[300px] lg:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Loading carousel...</div>
            </div>
        </div>
    );
}

async function CarouselContent() {
    // Fetch carousel images from API
    const apiImages = await fetchCarouselImages();

    // Use API images if available, otherwise fallback to local images
    const images = apiImages.length > 0
        ? apiImages.map(img => img.imageUrl)
        : fallbackImages;

    return <CarouselSlider images={images} />;
}

export default function Carousel() {
    return (
        <Suspense fallback={<CarouselSkeleton />}>
            <CarouselContent />
        </Suspense>
    );
}