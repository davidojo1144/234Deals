import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProductDetails } from "@/hooks/useProducts";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ReviewCard } from "@/components/ReviewCard";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { ProductDetailsSkeleton } from "@/components/ui/ProductDetailsSkeleton";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { product, isLoading, error, retry } = useProductDetails(Number(id));

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <ProductDetailsSkeleton />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl mb-4">⚠️</Text>
          <Text className="text-dark-700 text-lg font-semibold mb-2">
            Failed to load product
          </Text>
          <Text className="text-dark-400 text-sm text-center mb-6">
            {error || "Product not found"}
          </Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => router.back()}
              className="bg-dark-100 px-6 py-3 rounded-xl"
            >
              <Text className="text-dark-700 font-semibold text-sm">
                Go Back
              </Text>
            </Pressable>
            <Pressable
              onPress={retry}
              className="bg-primary-600 px-6 py-3 rounded-xl"
            >
              <Text className="text-white font-semibold text-sm">Retry</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const stockVariant =
    product.availabilityStatus === "In Stock"
      ? "success"
      : product.availabilityStatus === "Low Stock"
        ? "accent"
        : "danger";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-dark-50 items-center justify-center border border-dark-100"
        >
          <Text className="text-dark-700 text-lg">←</Text>
        </Pressable>
        <Text className="text-dark-800 text-sm font-semibold">
          Product Details
        </Text>
        <View className="w-10 h-10 rounded-full bg-dark-50 items-center justify-center border border-dark-100">
          <Text className="text-lg">♡</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Image Carousel */}
        <ImageCarousel images={product.images} />

        {/* Product Info */}
        <View className="px-4 pt-4">
          {/* Category & Stock Badges */}
          <View className="flex-row items-center gap-2 mb-3">
            <Badge label={product.category} variant="primary" size="sm" />
            <Badge
              label={product.availabilityStatus}
              variant={stockVariant as any}
              size="sm"
            />
            {product.brand && (
              <Badge label={product.brand} variant="neutral" size="sm" />
            )}
          </View>

          {/* Title */}
          <Text className="text-dark-900 text-xl font-bold leading-7 mb-2">
            {product.title}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mb-4">
            <RatingStars rating={product.rating} size="md" />
            <Text className="text-dark-400 text-xs ml-2">
              ({product.reviews?.length || 0} reviews)
            </Text>
          </View>

          {/* Price Section */}
          <View className="bg-primary-50 rounded-2xl p-4 mb-5 border border-primary-100">
            <View className="flex-row items-baseline gap-3">
              <Text className="text-primary-700 text-3xl font-extrabold">
                ${discountedPrice}
              </Text>
              {product.discountPercentage > 0 && (
                <Text className="text-dark-400 text-base line-through">
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </View>
            {product.discountPercentage > 0 && (
              <View className="flex-row items-center mt-2">
                <View className="bg-red-500 rounded-md px-2 py-0.5 mr-2">
                  <Text className="text-white text-xs font-bold">
                    SAVE {Math.round(product.discountPercentage)}%
                  </Text>
                </View>
                <Text className="text-primary-600 text-xs font-medium">
                  You save $
                  {(product.price - parseFloat(discountedPrice)).toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View className="mb-5">
            <Text className="text-dark-800 text-base font-semibold mb-2">
              Description
            </Text>
            <Text className="text-dark-500 text-sm leading-6">
              {product.description}
            </Text>
          </View>

          {/* Product Details Grid */}
          <View className="mb-5">
            <Text className="text-dark-800 text-base font-semibold mb-3">
              Product Information
            </Text>

            <View className="bg-dark-50 rounded-2xl overflow-hidden border border-dark-100">
              <DetailRow label="Brand" value={product.brand || "N/A"} />
              <DetailRow label="SKU" value={product.sku} />
              <DetailRow label="Stock" value={`${product.stock} units`} />
              <DetailRow
                label="Min. Order"
                value={`${product.minimumOrderQuantity} units`}
              />
              <DetailRow
                label="Weight"
                value={`${product.weight}g`}
              />
              <DetailRow
                label="Dimensions"
                value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
              />
              <DetailRow
                label="Warranty"
                value={product.warrantyInformation}
              />
              <DetailRow
                label="Shipping"
                value={product.shippingInformation}
              />
              <DetailRow
                label="Return Policy"
                value={product.returnPolicy}
                isLast
              />
            </View>
          </View>

          {/* Vendor / Seller Information */}
          <View className="mb-5">
            <Text className="text-dark-800 text-base font-semibold mb-3">
              Seller Information
            </Text>
            <View className="bg-dark-50 rounded-2xl p-4 border border-dark-100">
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-3">
                  <Text className="text-primary-700 text-base font-bold">
                    {product.brand ? product.brand[0].toUpperCase() : "S"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-dark-800 text-sm font-semibold">
                    {product.brand || "234Deals Seller"}
                  </Text>
                  <Text className="text-dark-400 text-xs mt-0.5">
                    Verified Seller • {product.category}
                  </Text>
                </View>
                <Pressable className="bg-primary-600 px-4 py-2 rounded-xl">
                  <Text className="text-white text-xs font-semibold">
                    Contact
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <View className="mb-5">
              <Text className="text-dark-800 text-base font-semibold mb-3">
                Tags
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <View
                    key={index}
                    className="bg-dark-100 rounded-full px-3 py-1.5"
                  >
                    <Text className="text-dark-600 text-xs font-medium capitalize">
                      #{tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <View className="mb-5">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-dark-800 text-base font-semibold">
                  Customer Reviews
                </Text>
                <Text className="text-dark-400 text-xs">
                  {product.reviews.length} reviews
                </Text>
              </View>

              {/* Average Rating Summary */}
              <View className="bg-primary-50 rounded-2xl p-4 mb-4 items-center border border-primary-100">
                <Text className="text-primary-700 text-4xl font-extrabold">
                  {product.rating.toFixed(1)}
                </Text>
                <RatingStars rating={product.rating} size="lg" showValue={false} />
                <Text className="text-dark-400 text-xs mt-1">
                  Based on {product.reviews.length} reviews
                </Text>
              </View>

              {/* Review Cards */}
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-dark-100 px-4 py-3 pb-8">
        <View className="flex-row items-center gap-3">
          <View className="flex-1">
            <Text className="text-dark-400 text-xs">Total Price</Text>
            <Text className="text-dark-900 text-xl font-extrabold">
              ${discountedPrice}
            </Text>
          </View>
          <Pressable className="bg-primary-600 flex-1 py-4 rounded-2xl items-center">
            <Text className="text-white text-sm font-bold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Helper component for detail rows
function DetailRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <View
      className={`flex-row justify-between items-center px-4 py-3 ${
        !isLast ? "border-b border-dark-100" : ""
      }`}
    >
      <Text className="text-dark-400 text-sm">{label}</Text>
      <Text className="text-dark-700 text-sm font-medium flex-1 text-right ml-4">
        {value}
      </Text>
    </View>
  );
}
