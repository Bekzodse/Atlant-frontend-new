const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

export interface AttachDTO {
  id: string;
  originName: string;
  size: number;
  extension: string;
  createdData: string;
  url: string;
}

export interface TeamMemberResponseDTO {
  id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  nameUz: string;
  role: string;
  roleEn: string;
  roleRu: string;
  roleUz: string;
  phoneNumber: string;
  image: AttachDTO;
}

export async function fetchTeamMembers(locale: string = 'ru'): Promise<TeamMemberResponseDTO[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/team/public`, {
      headers: {
        'Accept-Language': locale,
      },
      cache: 'no-store', // Let SWR handle caching
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.status}`);
    }

    const data: TeamMemberResponseDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
