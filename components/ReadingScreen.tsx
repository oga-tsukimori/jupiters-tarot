
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, buttonStyles, commonStyles, glassStyles } from '../styles/commonStyles';
import { spreads } from '../data/spreads';
import { SpreadType, TarotCard as TarotCardType, DrawnCard } from '../types/tarot';
import { Ionicons } from '@expo/vector-icons';
import TarotCard from './TarotCard';
import { getRandomCards } from '../data/tarotCards';
import CardDetailModal from './CardDetailModal';
import Button from './Button';

interface ReadingScreenProps {
  spreadType: SpreadType;
  onBack: () => void;
  onReadingComplete?: (reading: { spread: SpreadType; cards: DrawnCard[] }) => void;
}

export default function ReadingScreen({ spreadType, onBack, onReadingComplete }: ReadingScreenProps) {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const spread = spreads[spreadType];

  useEffect(() => {
    console.log('ReadingScreen mounted with spread:', spreadType);
    drawCards();
  }, [spreadType]);

  const drawCards = () => {
    console.log('Drawing cards for spread:', spreadType);
    const cards = getRandomCards(spread.positions.length);
    const newDrawnCards: DrawnCard[] = cards.map((card, index) => ({
      card,
      position: spread.positions[index],
      isReversed: Math.random() < 0.3, // 30% chance of reversed
    }));
    
    setDrawnCards(newDrawnCards);
    setRevealedCards(new Array(spread.positions.length).fill(false));
    
    // Notify parent when reading is complete
    if (onReadingComplete) {
      onReadingComplete({
        spread: spreadType,
        cards: newDrawnCards,
      });
    }
  };

  const revealCard = (index: number) => {
    console.log('Revealing card at index:', index);
    const newRevealed = [...revealedCards];
    newRevealed[index] = true;
    setRevealedCards(newRevealed);
  };

  const showCardDetail = (drawnCard: DrawnCard) => {
    console.log('Showing card detail for:', drawnCard.card.name);
    setSelectedCard(drawnCard);
    setIsModalVisible(true);
  };

  const renderCards = () => {
    if (drawnCards.length === 0) return null;

    return (
      <View style={styles.cardsContainer}>
        {drawnCards.map((drawnCard, index) => (
          <View key={index} style={styles.cardWrapper}>
            <View style={[glassStyles.card, styles.cardContainer]}>
              <Text style={styles.positionLabel}>{drawnCard.position}</Text>
              <TarotCard
                card={drawnCard.card}
                isReversed={drawnCard.isReversed}
                isRevealed={revealedCards[index]}
                onPress={() => {
                  if (!revealedCards[index]) {
                    revealCard(index);
                  } else {
                    showCardDetail(drawnCard);
                  }
                }}
                size="medium"
                position={drawnCard.position}
              />
              {revealedCards[index] && (
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => showCardDetail(drawnCard)}
                >
                  <Ionicons name="information-circle" size={20} color={colors.accent} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[glassStyles.overlay, styles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.accent} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{spread.name}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={drawCards}>
          <Ionicons name="refresh" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spread Description */}
        <View style={[glassStyles.container, styles.descriptionCard]}>
          <Text style={styles.spreadDescription}>{spread.description}</Text>
        </View>

        {/* Cards */}
        {renderCards()}

        {/* Instructions */}
        <View style={[glassStyles.container, styles.instructionsCard]}>
          <Text style={styles.instructionsTitle}>How to Read</Text>
          <Text style={styles.instructionsText}>
            Tap each card to reveal it, then tap again to see detailed interpretations. 
            Trust your intuition as you explore the meanings.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            text="New Reading"
            onPress={drawCards}
            variant="secondary"
            size="medium"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      <CardDetailModal
        drawnCard={selectedCard}
        isVisible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedCard(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  refreshButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  descriptionCard: {
    marginBottom: 24,
  },
  spreadDescription: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  cardWrapper: {
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    padding: 16,
    minWidth: 140,
    position: 'relative',
  },
  positionLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    fontWeight: '500',
  },
  detailButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.glass,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  instructionsCard: {
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  instructionsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  actionButtons: {
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    minWidth: 160,
  },
});
