const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

export interface AttachDTO {
  id: string;
  originName: string;
  size: number;
  extension: string;
  createdData: string;
  url: string;
}

export interface LicenseResponseDTO {
  id: string;
  title: string;
  titleEn: string;
  titleRu: string;
  titleUz: string;
  image: AttachDTO;
  createdAt: string;
}

export async function fetchLicenses(locale: string = 'ru', limit?: number): Promise<LicenseResponseDTO[]> {
  try {
    const url = limit
      ? `${API_BASE_URL}/api/v1/licenses/public?limit=${limit}`
      : `${API_BASE_URL}/api/v1/licenses/public`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': locale,
      },
      cache: 'no-store', // Let SWR handle caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch licenses: ${response.status}`);
    }

    const data: LicenseResponseDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching licenses:', error);
    return [];
  }
}

export function getDownloadUrl(fileId: string): string {
  return `${API_BASE_URL}/attach/download/${fileId}`;
}
