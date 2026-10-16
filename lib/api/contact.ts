const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

export interface ContactRequestPayload {
  name: string;
  phone: string;
  message: string;
  type?: "GENERAL" | "PURCHASE";
}

export async function submitContactRequest(
  payload: ContactRequestPayload,
  locale: string = 'ru'
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/contact/public`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit contact request: ${response.status}`);
  }
}
