import axios from "axios";
import { API_BASE_URL, PRODUCTS_PER_PAGE } from "@/lib/constants";
import { Product, ProductsResponse } from "@/lib/types";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getProducts = async (
  limit: number = PRODUCTS_PER_PAGE,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return response.data;
};


export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};


export const searchProducts = async (
  query: string,
  limit: number = PRODUCTS_PER_PAGE,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>("/products/search", {
    params: { q: query, limit, skip },
  });
  return response.data;
};


export const getCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>("/products/category-list");
  return response.data;
};


export const getProductsByCategory = async (
  category: string,
  limit: number = PRODUCTS_PER_PAGE,
  skip: number = 0
): Promise<ProductsResponse> => {
  const response = await apiClient.get<ProductsResponse>(
    `/products/category/${category}`,
    { params: { limit, skip } }
  );
  return response.data;
};

export default apiClient;
