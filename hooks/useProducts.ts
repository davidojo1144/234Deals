import { useEffect, useCallback, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";

/**
 * Custom hook for managing products data fetching and state.
 * Wraps the Zustand store for clean component usage.
 */
export const useProducts = () => {
  const {
    products,
    total,
    hasMore,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    fetchProducts,
    fetchMoreProducts,
    refreshProducts,
    fetchCategories,
    setSelectedCategory,
    setSearchQuery,
    clearError,
  } = useProductStore();

  const isInitialized = useRef(false);

  // Fetch products and categories on mount
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      fetchProducts();
      fetchCategories();
    }
  }, []);

  // Debounced search handler
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback(
    (query: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      if (query.trim() === "") {
        // Immediately clear search and fetch all products
        setSearchQuery("");
        return;
      }

      searchTimeoutRef.current = setTimeout(() => {
        setSearchQuery(query);
      }, 500);
    },
    [setSearchQuery]
  );

  const handleCategorySelect = useCallback(
    (category: string | null) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      fetchMoreProducts();
    }
  }, [hasMore, isLoadingMore, fetchMoreProducts]);

  const handleRefresh = useCallback(() => {
    refreshProducts();
  }, [refreshProducts]);

  return {
    products,
    total,
    hasMore,
    categories,
    selectedCategory,
    searchQuery,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    handleSearch,
    handleCategorySelect,
    handleLoadMore,
    handleRefresh,
    clearError,
  };
};

/**
 * Custom hook for fetching a single product by ID.
 */
export const useProductDetails = (id: number) => {
  const {
    selectedProduct,
    isLoadingProduct,
    error,
    fetchProductById,
    clearSelectedProduct,
    clearError,
  } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }

    return () => {
      clearSelectedProduct();
    };
  }, [id]);

  return {
    product: selectedProduct,
    isLoading: isLoadingProduct,
    error,
    retry: () => fetchProductById(id),
    clearError,
  };
};
