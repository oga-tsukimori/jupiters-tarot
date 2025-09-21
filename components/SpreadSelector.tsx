
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SpreadType } from '../types/tarot';
import { spreads } from '../data/spreads';
import { colors, buttonStyles, glassStyles } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';

interface SpreadSelectorProps {
  onSelectSpread: (spreadType: SpreadType) => void;
}

export default function SpreadSelector({ onSelectSpread }: SpreadSelectorProps) {
  
  const handleSpreadSelect = (spreadType: SpreadType) => {
    console.log('Spread selected:', spreadType);
    onSelectSpread(spreadType);
  };

  const getSpreadIcon = (spreadType: SpreadType) => {
    switch (spreadType) {
      case 'single':
        return 'card';
      case 'three-card':
        return 'albums';
      case 'celtic-cross':
        return 'grid';
      default:
        return 'card';
    }
  };

  const getSpreadDifficulty = (spreadType: SpreadType) => {
    switch (spreadType) {
      case 'single':
        return 'Beginner';
      case 'three-card':
        return 'Intermediate';
      case 'celtic-cross':
        return 'Advanced';
      default:
        return 'Beginner';
    }
  };

  const getDifficultyColor = (spreadType: SpreadType) => {
    switch (spreadType) {
      case 'single':
        return colors.accent;
      case 'three-card':
        return colors.gold;
      case 'celtic-cross':
        return colors.silver;
      default:
        return colors.accent;
    }
  };

  const getDifficultyStyle = (spreadType: SpreadType) => {
    const color = getDifficultyColor(spreadType);
    return {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: color,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    };
  };

  const getDifficultyTextStyle = (spreadType: SpreadType) => {
    const color = getDifficultyColor(spreadType);
    return {
      fontSize: 12,
      fontWeight: '600' as const,
      color: color,
      fontFamily: 'Inter_600SemiBold',
    };
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.spreadsGrid}>
        {Object.entries(spreads).map(([key, spread]) => (
          <TouchableOpacity
            key={key}
            style={[glassStyles.container, styles.spreadCard]}
            onPress={() => handleSpreadSelect(key as SpreadType)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={getSpreadIcon(key as SpreadType)} 
                  size={32} 
                  color={colors.accent} 
                />
              </View>
              <View style={getDifficultyStyle(key as SpreadType)}>
                <Text style={getDifficultyTextStyle(key as SpreadType)}>
                  {getSpreadDifficulty(key as SpreadType)}
                </Text>
              </View>
            </View>
            
            <Text style={styles.spreadName}>{spread.name}</Text>
            <Text style={styles.spreadDescription}>{spread.description}</Text>
            
            <View style={styles.cardFooter}>
              <View style={styles.cardCount}>
                <Ionicons name="layers" size={16} color={colors.textSecondary} />
                <Text style={styles.cardCountText}>
                  {spread.positions.length} card{spread.positions.length > 1 ? 's' : ''}
                </Text>
              </View>
              
              <View style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.primary} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mystical Quote */}
      <View style={[glassStyles.container, styles.quoteCard]}>
        <Text style={styles.quote}>
          "The cards do not predict the future, they illuminate the present moment and the energies surrounding it."
        </Text>
        <Text style={styles.quoteAuthor}>— Ancient Wisdom</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  spreadsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  spreadCard: {
    padding: 20,
    alignItems: 'stretch',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spreadName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  spreadDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardCountText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  selectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  quoteCard: {
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_400Regular',
  },
  quoteAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
});
