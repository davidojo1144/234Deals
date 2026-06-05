import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "./Skeleton";

export const ProductDetailsSkeleton = () => {
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel Image Skeleton */}
        <Skeleton className="w-full h-72 rounded-none mb-4" />

        <View className="px-4">
          {/* Badges Skeleton */}
          <View className="flex-row gap-2 mb-3">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </View>

          {/* Title Skeleton */}
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-3/4 h-8 mb-4" />

          {/* Rating Skeleton */}
          <View className="flex-row items-center gap-2 mb-4">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-3" />
          </View>

          {/* Price Box Skeleton */}
          <View className="bg-dark-50 rounded-2xl p-4 mb-5">
            <Skeleton className="w-32 h-8 mb-2" />
            <Skeleton className="w-24 h-4" />
          </View>

          {/* Description Skeleton */}
          <View className="mb-5">
            <Skeleton className="w-24 h-5 mb-3" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-5/6 h-4 mb-2" />
            <Skeleton className="w-full h-4 mb-2" />
            <Skeleton className="w-3/4 h-4" />
          </View>

          {/* Details Grid Skeleton */}
          <View className="mb-5">
            <Skeleton className="w-32 h-5 mb-3" />
            <View className="bg-dark-50 rounded-2xl border border-dark-100 p-4 gap-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar Skeleton */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-dark-100 px-4 py-3 pb-8 flex-row items-center gap-3">
        <View className="flex-1">
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-24 h-6" />
        </View>
        <Skeleton className="flex-1 h-12 rounded-2xl" />
      </View>
    </View>
  );
};
