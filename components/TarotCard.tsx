
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
  const cardSizes = {
    small: { width: 80, height: 120 },
    medium: { width: 120, height: 180 },
    large: { width: 160, height: 240 }
  };

  const cardSize = cardSizes[size];

  const handlePress = () => {
    console.log('Tarot card pressed:', card.name);
    onPress?.();
  };

  return (
    <TouchableOpacity 
      style={[styles.container, cardSize]} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {!isRevealed ? (
        <View style={[styles.cardBack, cardSize]}>
          <View style={styles.cardBackPattern}>
            <Text style={styles.cardBackText}>✦</Text>
            <Text style={styles.cardBackText}>✧</Text>
            <Text style={styles.cardBackText}>✦</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.cardFront, cardSize]}>
          <View style={[styles.imageContainer, isReversed && styles.reversed]}>
            <Image 
              source={{ uri: card.imageUrl }} 
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>
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
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    margin: 8,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
    elevation: 5,
  },
  cardBack: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackPattern: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBackText: {
    color: colors.accent,
    fontSize: 24,
    marginVertical: 4,
    opacity: 0.7,
  },
  cardFront: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },
  reversed: {
    transform: [{ rotate: '180deg' }],
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    padding: 8,
    backgroundColor: colors.card,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  position: {
    fontSize: 10,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
  },
  reversedIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.accent,
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reversedText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
