import React from "react";
import { View, Text } from "react-native";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeMap: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const valueSizeMap: Record<string, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = "md",
  showValue = true,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View className="flex-row items-center gap-0.5">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Text key={`full-${index}`} className={`${sizeMap[size]} text-amber-400`}>
          ★
        </Text>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <Text className={`${sizeMap[size]} text-amber-400`}>★</Text>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Text key={`empty-${index}`} className={`${sizeMap[size]} text-dark-300`}>
          ★
        </Text>
      ))}

      {/* Numeric value */}
      {showValue && (
        <Text className={`${valueSizeMap[size]} text-dark-500 ml-1 font-medium`}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};
