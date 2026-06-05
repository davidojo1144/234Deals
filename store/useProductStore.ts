import { create } from "zustand";
import { Product } from "@/lib/types";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import {
  getProducts,
  getProductById,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "@/services/api";

interface ProductState {
  // Product list
  products: Product[];
  total: number;
  skip: number;
  hasMore: boolean;

  // Selected product
  selectedProduct: Product | null;

  // Categories
  categories: string[];
  selectedCategory: string | null;

  // Search
  searchQuery: string;

  // UI states
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  isLoadingProduct: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  fetchMoreProducts: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string | null) => Promise<void>;
  setSearchQuery: (query: string) => Promise<void>;
  clearError: () => void;
  clearSelectedProduct: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  products: [],
  total: 0,
  skip: 0,
  hasMore: true,
  selectedProduct: null,
  categories: [],
  selectedCategory: null,
  searchQuery: "",
  isLoading: false,
  isLoadingMore: false,
  isRefreshing: false,
  isLoadingProduct: false,
  error: null,

  fetchProducts: async () => {
    const { searchQuery, selectedCategory } = get();
    set({ isLoading: true, error: null, skip: 0, products: [] });

    try {
      let response;

      if (searchQuery.trim()) {
        response = await searchProducts(searchQuery);
      } else if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory);
      } else {
        response = await getProducts();
      }

      set({
        products: response.products,
        total: response.total,
        skip: response.products.length,
        hasMore: response.products.length < response.total,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Failed to fetch products",
      });
    }
  },

  fetchMoreProducts: async () => {
    const { hasMore, isLoadingMore, skip, searchQuery, selectedCategory } =
      get();
    if (!hasMore || isLoadingMore) return;

    set({ isLoadingMore: true });

    try {
      let response;

      if (searchQuery.trim()) {
        response = await searchProducts(searchQuery, PRODUCTS_PER_PAGE, skip);
      } else if (selectedCategory) {
        response = await getProductsByCategory(
          selectedCategory,
          PRODUCTS_PER_PAGE,
          skip
        );
      } else {
        response = await getProducts(PRODUCTS_PER_PAGE, skip);
      }

      set((state) => ({
        products: [...state.products, ...response.products],
        skip: state.skip + response.products.length,
        hasMore: state.skip + response.products.length < response.total,
        isLoadingMore: false,
      }));
    } catch (error: any) {
      set({
        isLoadingMore: false,
        error: error.message || "Failed to load more products",
      });
    }
  },

  refreshProducts: async () => {
    set({ isRefreshing: true });
    const { searchQuery, selectedCategory } = get();

    try {
      let response;

      if (searchQuery.trim()) {
        response = await searchProducts(searchQuery);
      } else if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory);
      } else {
        response = await getProducts();
      }

      set({
        products: response.products,
        total: response.total,
        skip: response.products.length,
        hasMore: response.products.length < response.total,
        isRefreshing: false,
      });
    } catch (error: any) {
      set({
        isRefreshing: false,
        error: error.message || "Failed to refresh products",
      });
    }
  },

  fetchProductById: async (id: number) => {
    set({ isLoadingProduct: true, error: null, selectedProduct: null });

    try {
      const product = await getProductById(id);
      set({ selectedProduct: product, isLoadingProduct: false });
    } catch (error: any) {
      set({
        isLoadingProduct: false,
        error: error.message || "Failed to fetch product details",
      });
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await getCategories();
      set({ categories });
    } catch (error: any) {
      console.error("Failed to fetch categories:", error);
    }
  },

  setSelectedCategory: async (category: string | null) => {
    set({ selectedCategory: category, searchQuery: "" });
    await get().fetchProducts();
  },

  setSearchQuery: async (query: string) => {
    set({ searchQuery: query, selectedCategory: null });
    await get().fetchProducts();
  },

  clearError: () => set({ error: null }),

  clearSelectedProduct: () => set({ selectedProduct: null }),
}));
