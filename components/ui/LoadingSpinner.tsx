import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "large",
  fullScreen = false,
}) => {
  const containerClass = fullScreen
    ? "flex-1 justify-center items-center bg-white"
    : "py-8 justify-center items-center";

  return (
    <View className={containerClass}>
      <ActivityIndicator size={size} color="#047857" />
      {message && (
        <Text className="text-dark-400 text-sm mt-3 font-medium">
          {message}
        </Text>
      )}
    </View>
  );
};
