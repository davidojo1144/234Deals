import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/lib/types";
import { RatingStars } from "@/components/ui/RatingStars";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="flex-1 m-1.5 bg-white rounded-2xl overflow-hidden"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
    >
      {/* Image Container */}
      <View className="relative bg-dark-50 h-40 items-center justify-center p-3">
        <Image
          source={{ uri: product.thumbnail }}
          className="w-full h-full"
          resizeMode="contain"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <View className="absolute top-2 left-2 bg-red-500 rounded-lg px-2 py-0.5">
            <Text className="text-white text-[10px] font-bold">
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View className="p-3">
        {/* Category */}
        <Text className="text-primary-600 text-[10px] font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </Text>

        {/* Title */}
        <Text className="text-dark-800 text-sm font-semibold mb-1.5" numberOfLines={2}>
          {product.title}
        </Text>

        {/* Rating */}
        <View className="mb-2">
          <RatingStars rating={product.rating} size="sm" />
        </View>

        {/* Price */}
        <View className="flex-row items-center gap-2">
          <Text className="text-primary-600 text-base font-bold">
            ${discountedPrice}
          </Text>
          {product.discountPercentage > 0 && (
            <Text className="text-dark-400 text-xs line-through">
              ${product.price.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};
