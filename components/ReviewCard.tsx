import React from "react";
import { View, Text } from "react-native";
import { ProductReview } from "@/lib/types";
import { RatingStars } from "@/components/ui/RatingStars";

interface ReviewCardProps {
  review: ProductReview;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Generate initials from reviewer name
  const initials = review.reviewerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View className="bg-dark-50 rounded-xl p-4 mb-3">
      {/* Header */}
      <View className="flex-row items-center mb-2.5">
        {/* Avatar */}
        <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center mr-3">
          <Text className="text-primary-700 text-sm font-bold">{initials}</Text>
        </View>

        {/* Name and Date */}
        <View className="flex-1">
          <Text className="text-dark-800 text-sm font-semibold">
            {review.reviewerName}
          </Text>
          <Text className="text-dark-400 text-xs mt-0.5">{formattedDate}</Text>
        </View>
      </View>

      {/* Rating */}
      <View className="mb-2">
        <RatingStars rating={review.rating} size="sm" showValue={false} />
      </View>

      {/* Comment */}
      <Text className="text-dark-600 text-sm leading-5">{review.comment}</Text>
    </View>
  );
};
