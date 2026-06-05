import React from "react";
import { View } from "react-native";
import { Skeleton } from "./ui/Skeleton";

export const ProductCardSkeleton = () => {
  return (
    <View className="flex-1 max-w-[50%] p-1.5">
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
  );
};
