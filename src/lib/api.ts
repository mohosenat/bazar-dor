import type { Category, Product } from "@/types/product";

const BASE_URL ="https://openapi.programming-hero.com/api/bazardor";

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const getProducts = () =>
  getJson<Product[]>(`${BASE_URL}/products`);

export const getProduct = async (id: number) => {
  try {
    return await getJson<Product>(
      `${BASE_URL}/products/${id}`
    );
  } catch {
    return null;
  }
};

export const getCategoryProducts = (category: string) =>
  getJson<Product[]>(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`
  );

export const getCategories = () =>
  getJson<Category[]>(`${BASE_URL}/categories`);

export const getCategory = async (id: string) => {
  try {
    return await getJson<Category>(
      `${BASE_URL}/categories/${encodeURIComponent(id)}`
    );
  } catch {
    return null;
  }
};
