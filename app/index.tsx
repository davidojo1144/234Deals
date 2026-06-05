import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { ProductListSkeleton } from "@/components/ui/ProductListSkeleton";
import { Product } from "@/lib/types";

export default function ProductListingScreen() {
  const {
    products,
    total,
    categories,
    selectedCategory,
    isLoading,
    isLoadingMore,
    isRefreshing,
    error,
    handleSearch,
    handleCategorySelect,
    handleLoadMore,
    handleRefresh,
    clearError,
  } = useProducts();

  const [searchText, setSearchText] = useState("");

  const onSearchChange = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  const clearSearch = () => {
    setSearchText("");
    handleSearch("");
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const renderHeader = () => (
    <View>
      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-dark-50 rounded-2xl px-4 py-3 border border-dark-100">
          <Text className="text-dark-400 mr-2 text-base">🔍</Text>
          <TextInput
            className="flex-1 text-dark-800 text-sm"
            placeholder="Search products..."
            placeholderTextColor="#94a3b8"
            value={searchText}
            onChangeText={onSearchChange}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <Pressable onPress={clearSearch}>
              <Text className="text-dark-400 text-lg">✕</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 pl-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {/* All Category */}
        <Pressable
          onPress={() => handleCategorySelect(null)}
          className={`mr-2 px-4 py-2 rounded-full border ${
            !selectedCategory
              ? "bg-primary-600 border-primary-600"
              : "bg-white border-dark-200"
          }`}
        >
          <Text
            className={`text-xs font-semibold capitalize ${
              !selectedCategory ? "text-white" : "text-dark-600"
            }`}
          >
            All
          </Text>
        </Pressable>

        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => handleCategorySelect(category)}
            className={`mr-2 px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "bg-primary-600 border-primary-600"
                : "bg-white border-dark-200"
            }`}
          >
            <Text
              className={`text-xs font-semibold capitalize ${
                selectedCategory === category ? "text-white" : "text-dark-600"
              }`}
            >
              {category.replace(/-/g, " ")}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View className="px-4 mb-3">
        <Text className="text-dark-400 text-xs font-medium">
          {total} products found
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="small" color="#047857" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-5xl mb-4">📦</Text>
        <Text className="text-dark-700 text-lg font-semibold mb-2">
          No products found
        </Text>
        <Text className="text-dark-400 text-sm text-center px-8">
          Try adjusting your search or browse a different category.
        </Text>
      </View>
    );
  };

  // Error state
  if (error && products.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl mb-4">⚠️</Text>
          <Text className="text-dark-700 text-lg font-semibold mb-2">
            Something went wrong
          </Text>
          <Text className="text-dark-400 text-sm text-center mb-6">
            {error}
          </Text>
          <Pressable
            onPress={() => {
              clearError();
              handleRefresh();
            }}
            className="bg-primary-600 px-8 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold text-sm">Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-primary-600 text-2xl font-extrabold tracking-tight">
              234Deals
            </Text>
            <Text className="text-dark-400 text-xs mt-0.5">
              Discover amazing deals
            </Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center border border-primary-100">
            <Text className="text-lg">🛒</Text>
          </View>
        </View>
      </View>

      {/* Product List */}
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ paddingHorizontal: 8 }}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#047857"
              colors={["#047857"]}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}
