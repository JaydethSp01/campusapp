import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = '#8B5CF6',
  message = 'Cargando...',
  fullScreen = false,
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de rotación
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    );

    // Animación de fade in
    const fadeAnimation = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    });

    fadeAnimation.start();
    spinAnimation.start();

    return () => {
      spinAnimation.stop();
      fadeAnimation.stop();
    };
  }, [spinValue, fadeValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

  return (
    <Animated.View style={[containerStyle, { opacity: fadeValue }]}>
      <Animated.View style={[styles.spinnerContainer, { transform: [{ rotate: spin }] }]}>
        <ActivityIndicator size="large" color={color} />
      </Animated.View>
      {message && <Text style={styles.message}>{message}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  spinnerContainer: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});