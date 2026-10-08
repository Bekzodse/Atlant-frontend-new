const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://atlant-backend-production.up.railway.app';

// Enums
export enum ProductCategory {
  WATER_PURIFICATION_FILTERS = "WATER_PURIFICATION_FILTERS",
  CARBONATED_WATER_EQUIPMENT = "CARBONATED_WATER_EQUIPMENT",
  HOUSEHOLD_WATER_FILTERS = "HOUSEHOLD_WATER_FILTERS",
  WATER_DISPENSERS_COOLERS = "WATER_DISPENSERS_COOLERS",
  WATER_FILTER_SPARE_PARTS = "WATER_FILTER_SPARE_PARTS",
  OTHER_PRODUCTS_EQUIPMENT = "OTHER_PRODUCTS_EQUIPMENT"
}

export enum PaymentMethod {
  CASH = "CASH",
  HOMO = "HOMO",
  UZCARD = "UZCARD",
  ONLINE = "ONLINE",
  BANK_TRANSFER = "BANK_TRANSFER"
}

// Interfaces
export interface ProductImageDTO {
  id: string;
  attachId: string;
  path: string;
  displayOrder: number;
}

export interface ProductResponseDTO {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  name: string;
  paymentMethod: string;
  paymentMethodEn: string;
  paymentMethodRu: string;
  paymentMethodUz: string;
  delivery: string;
  deliveryEn: string;
  deliveryRu: string;
  deliveryUz: string;
  description: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionUz: string;
  price: number;
  brand: string;
  articleNumber: string;
  category: ProductCategory;
  discount: boolean;
  paymentMethods: PaymentMethod[];
  images: ProductImageDTO[];
  createdAt: string;
}

// API Functions
export async function fetchAllProducts(locale: string = 'ru'): Promise<ProductResponseDTO[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/products/public`, {
      headers: {
        'Accept-Language': locale,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data: ProductResponseDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductsByCategory(
  category: ProductCategory,
  locale: string = 'ru'
): Promise<ProductResponseDTO[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/products/public/category/${category}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.status}`);
    }

    const data: ProductResponseDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function fetchProductById(
  id: string,
  locale: string = 'ru'
): Promise<ProductResponseDTO | null> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/products/public/${id}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data: ProductResponseDTO = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchProductsByBrand(
  brand: string,
  locale: string = 'ru'
): Promise<ProductResponseDTO[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/products/public/brand/${brand}`,
      {
        headers: {
          'Accept-Language': locale,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products by brand: ${response.status}`);
    }

    const data: ProductResponseDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by brand:', error);
    return [];
  }
}

// Helper function to get primary image (sorted by displayOrder)
export function getPrimaryImage(product: ProductResponseDTO): string {
  if (!product.images || product.images.length === 0) {
    return '/placeholder-product.png'; // Fallback image
  }

  const sortedImages = [...product.images].sort((a, b) => a.displayOrder - b.displayOrder);
  return sortedImages[0].path;
}

// Helper function to format price
export function formatPrice(price: number, locale: string = 'ru'): string {
  const formatted = price.toLocaleString('ru-RU').replace(/,/g, ' ');

  if (locale === 'uz') {
    return `${formatted} so'm`;
  } else if (locale === 'en') {
    return `${formatted} UZS`;
  }
  return `${formatted} сум`;
}
