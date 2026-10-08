export interface GalleryAttach {
  id: string;
  originName: string;
  size: number;
  extension: string;
  createdData: string;
  url: string;
}

export interface GalleryImage {
  id: string;
  attach: GalleryAttach;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

export async function fetchGalleryImages(limit?: number): Promise<GalleryImage[]> {
  try {
    const url = limit
      ? `${API_BASE_URL}/api/v1/gallery/public?limit=${limit}`
      : `${API_BASE_URL}/api/v1/gallery/public`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch gallery images: ${response.status}`);
    }

    const data: GalleryImage[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}
