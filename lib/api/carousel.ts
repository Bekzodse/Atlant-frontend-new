export interface CarouselImage {
  id: string;
  attachId: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

export async function fetchCarouselImages(): Promise<CarouselImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/carousel/public`, {
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch carousel images: ${response.status}`);
    }

    const data: CarouselImage[] = await response.json();

    // Filter only active images and sort by createdAt
    return data
      .filter(img => img.active)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    // Return empty array on error, component will handle fallback
    return [];
  }
}
