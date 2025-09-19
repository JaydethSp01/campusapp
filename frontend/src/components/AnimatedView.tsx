import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, View } from 'react-native';

interface AnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  duration?: number;
  animationType?: 'fadeIn' | 'slideUp' | 'scale' | 'slideInRight';
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  delay = 0,
  duration = 300,
  animationType = 'fadeIn',
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      const animation = Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        useNativeDriver: false, // Changed to false to avoid issues
      });

      animation.start();
    }, delay);

    return () => {
      clearTimeout(timer);
      animatedValue.stopAnimation();
    };
  }, [animatedValue, duration, delay]);

  const getAnimatedStyle = () => {
    switch (animationType) {
      case 'fadeIn':
        return {
          opacity: animatedValue,
        };
      case 'slideUp':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        };
      case 'scale':
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.95, 1],
              }),
            },
          ],
        };
      case 'slideInRight':
        return {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        };
      default:
        return {
          opacity: animatedValue,
        };
    }
  };

  return (
    <Animated.View style={[getAnimatedStyle(), style]}>
      {children}
    </Animated.View>
  );
};
