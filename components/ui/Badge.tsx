import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "accent" | "success" | "danger" | "neutral";
  size?: "sm" | "md";
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary-100 border-primary-200",
  accent: "bg-accent-100 border-accent-200",
  success: "bg-emerald-100 border-emerald-200",
  danger: "bg-red-100 border-red-200",
  neutral: "bg-dark-100 border-dark-200",
};

const variantTextStyles: Record<string, string> = {
  primary: "text-primary-700",
  accent: "text-accent-600",
  success: "text-emerald-700",
  danger: "text-red-700",
  neutral: "text-dark-600",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5",
  md: "px-3 py-1",
};

const sizeTextStyles: Record<string, string> = {
  sm: "text-[10px]",
  md: "text-xs",
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  size = "md",
}) => {
  return (
    <View
      className={`rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      <Text
        className={`font-semibold ${variantTextStyles[variant]} ${sizeTextStyles[size]}`}
      >
        {label}
      </Text>
    </View>
  );
};
