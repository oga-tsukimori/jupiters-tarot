
import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { TarotCard as TarotCardType } from '../types/tarot';

interface TarotCardProps {
  card: TarotCardType;
  isReversed?: boolean;
  isRevealed?: boolean;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  position?: string;
}

export default function TarotCard({ 
  card, 
  isReversed = false, 
  isRevealed = false, 
  onPress, 
  size = 'medium',
  position 
}: TarotCardProps) {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  const cardSizes = {
    small: { width: 90, height: 135 },
    medium: { width: 130, height: 195 },
    large: { width: 170, height: 255 }
  };

  const cardSize = cardSizes[size];

  useEffect(() => {
    if (isRevealed) {
      // Magical flip animation
      Animated.sequence([
        Animated.timing(flipAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRevealed]);

  useEffect(() => {
    // Continuous shimmer effect for revealed cards
    if (isRevealed) {
      const shimmerLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      shimmerLoop.start();
      return () => shimmerLoop.stop();
    }
  }, [isRevealed]);

  const handlePress = () => {
    console.log('Tarot card pressed:', card.name);
    
    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.();
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <TouchableOpacity 
      style={[styles.container, cardSize]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Animated.View 
        style={[
          styles.cardContainer, 
          cardSize,
          { transform: [{ scale: scaleAnimation }] }
        ]}
      >
        {!isRevealed ? (
          <Animated.View 
            style={[
              styles.cardBack, 
              cardSize,
              { transform: [{ rotateY: backInterpolate }] }
            ]}
          >
            <View style={styles.cardBackPattern}>
              <Text style={styles.cardBackSymbol}>✦</Text>
              <Text style={styles.cardBackText}>Jupiter's</Text>
              <Text style={styles.cardBackText}>Tarot</Text>
              <View style={styles.mysticalPattern}>
                <Text style={styles.cardBackSymbol}>🌙</Text>
                <Text style={styles.cardBackSymbol}>⭐</Text>
                <Text style={styles.cardBackSymbol}>🔮</Text>
              </View>
              <Text style={styles.cardBackSymbol}>✧</Text>
            </View>
          </Animated.View>
        ) : (
          <Animated.View 
            style={[
              styles.cardFront, 
              cardSize,
              { transform: [{ rotateY: frontInterpolate }] }
            ]}
          >
            {/* Shimmer overlay */}
            <Animated.View 
              style={[
                styles.shimmerOverlay,
                { opacity: shimmerOpacity }
              ]}
            />
            
            <View style={[styles.imageContainer, isReversed && styles.imageReversed]}>
              <Image 
                source={{ uri: card.imageUrl }} 
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
            
            {/* Text container - always upright */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardName} numberOfLines={2}>
                {card.name}
              </Text>
              {position && (
                <Text style={styles.position} numberOfLines={1}>
                  {position}
                </Text>
              )}
            </View>
            
            {isReversed && (
              <View style={styles.reversedIndicator}>
                <Text style={styles.reversedText}>↻</Text>
              </View>
            )}
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  cardContainer: {
    borderRadius: 16,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.4)',
    elevation: 8,
  },
  cardBack: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardBackPattern: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardBackSymbol: {
    color: colors.accent,
    fontSize: 20,
    marginVertical: 2,
    opacity: 0.9,
    textShadowColor: colors.gold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  cardBackText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginVertical: 1,
    fontFamily: 'CormorantGaramond_600SemiBold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  mysticalPattern: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  cardFront: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.shimmer,
    zIndex: 1,
    borderRadius: 16,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    position: 'relative',
    zIndex: 2,
  },
  imageReversed: {
    transform: [{ rotate: '180deg' }],
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    padding: 12,
    backgroundColor: colors.card,
    zIndex: 2,
    // Text container is always upright - no transform applied
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_600SemiBold',
    letterSpacing: 0.5,
  },
  position: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  reversedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.accent,
    borderRadius: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
    elevation: 4,
  },
  reversedText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
