import React, { useState, useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

interface ImageCarouselProps {
  images: string[];
}

const { width: screenWidth } = Dimensions.get("window");

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setActiveIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <View className="h-72 bg-dark-100 items-center justify-center">
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View>
      {/* Image Scroll */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-dark-50"
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{ width: screenWidth }}
            className="h-72 items-center justify-center p-6"
          >
            <Image
              source={{ uri: image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        ))}
      </ScrollView>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <View className="flex-row justify-center items-center py-3 gap-2">
          {images.map((_, index) => (
            <View
              key={index}
              className={`rounded-full ${
                index === activeIndex
                  ? "w-6 h-2 bg-primary-600"
                  : "w-2 h-2 bg-dark-300"
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
};
