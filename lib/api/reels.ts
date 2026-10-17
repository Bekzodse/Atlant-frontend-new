export interface ReelAttach {
  id: string;
  url: string;
  originName?: string;
}

export interface Reel {
  id: string;
  attach: ReelAttach;
  createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://atlant-backend-production.up.railway.app";

export async function fetchReels(limit?: number): Promise<Reel[]> {
  const url = `${API_BASE_URL}/api/v1/reels/public${limit ? `?limit=${limit}` : ""}`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch reels: ${response.status}`);
  }
  return response.json();
}
