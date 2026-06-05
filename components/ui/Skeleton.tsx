import React, { useEffect } from "react";
import { View, ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";

interface SkeletonProps extends ViewProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width,
  height,
  borderRadius = 8,
  style,
  ...rest
}) => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.5, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className={`bg-dark-100 ${className}`}
      style={[
        {
          width: width as any,
          height: height as any,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
      {...rest}
    />
  );
};
