import React from "react";
import { View, ScrollView } from "react-native";
import { Skeleton } from "./Skeleton";

export const ProductListSkeleton = () => {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="px-4 mb-4">
        {/* Search Bar Skeleton */}
        <Skeleton className="w-full h-12 rounded-2xl mb-4" />

        {/* Category Chips Skeleton */}
        <View className="flex-row gap-2 mb-4">
          <Skeleton className="w-16 h-8 rounded-full" />
          <Skeleton className="w-20 h-8 rounded-full" />
          <Skeleton className="w-24 h-8 rounded-full" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </View>

        {/* Results Count Skeleton */}
        <Skeleton className="w-24 h-4 mb-3" />
      </View>

      {/* Grid Skeleton */}
      <View className="flex-row flex-wrap px-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} className="w-1/2 p-1.5">
            <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Image */}
              <Skeleton className="w-full h-40 rounded-none" />
              {/* Info */}
              <View className="p-3">
                <Skeleton className="w-16 h-3 mb-2" />
                <Skeleton className="w-full h-4 mb-1" />
                <Skeleton className="w-3/4 h-4 mb-3" />
                <Skeleton className="w-20 h-3 mb-2" />
                <Skeleton className="w-16 h-5" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
