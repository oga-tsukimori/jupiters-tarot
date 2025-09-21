
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { DrawnCard } from '../types/tarot';
import { colors, buttonStyles, glassStyles } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';

interface CardDetailModalProps {
  drawnCard: DrawnCard | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function CardDetailModal({ drawnCard, isVisible, onClose }: CardDetailModalProps) {
  
  const handleClose = () => {
    console.log('Closing card detail modal');
    onClose();
  };

  if (!drawnCard) return null;

  const { card, position, isReversed } = drawnCard;
  const interpretation = isReversed ? card.reversed : card.upright;

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <LinearGradient
        colors={[colors.background, colors.primary]}
        style={styles.container}
      >
        {/* Header */}
        <View style={[glassStyles.overlay, styles.header]}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.accent} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Card Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Card Info */}
          <View style={[glassStyles.container, styles.cardInfoSection]}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardPosition}>Position: {position}</Text>
            {isReversed && (
              <View style={styles.reversedBadge}>
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.reversedText}>Reversed</Text>
              </View>
            )}
          </View>

          {/* Meaning */}
          <View style={[glassStyles.container, styles.meaningSection]}>
            <Text style={styles.sectionTitle}>
              {isReversed ? 'Reversed Meaning' : 'Upright Meaning'}
            </Text>
            <Text style={styles.meaningText}>{interpretation.meaning}</Text>
          </View>

          {/* Description */}
          <View style={[glassStyles.container, styles.descriptionSection]}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{interpretation.description}</Text>
          </View>

          {/* Keywords */}
          <View style={[glassStyles.container, styles.keywordsSection]}>
            <Text style={styles.sectionTitle}>Key Themes</Text>
            <View style={styles.keywordsContainer}>
              {interpretation.keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Card Properties */}
          <View style={[glassStyles.container, styles.propertiesSection]}>
            <Text style={styles.sectionTitle}>Card Properties</Text>
            <View style={styles.propertyRow}>
              <Text style={styles.propertyLabel}>Arcana:</Text>
              <Text style={styles.propertyValue}>
                {card.arcana === 'major' ? 'Major Arcana' : 'Minor Arcana'}
              </Text>
            </View>
            {card.suit && (
              <View style={styles.propertyRow}>
                <Text style={styles.propertyLabel}>Suit:</Text>
                <Text style={styles.propertyValue}>
                  {card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}
                </Text>
              </View>
            )}
            {card.number && (
              <View style={styles.propertyRow}>
                <Text style={styles.propertyLabel}>Number:</Text>
                <Text style={styles.propertyValue}>{card.number}</Text>
              </View>
            )}
          </View>

          {/* Action Button */}
          <View style={styles.actionSection}>
            <Button
              text="Close"
              onPress={handleClose}
              variant="primary"
              size="large"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </Modal>
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
    marginTop: 16,
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  cardInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardName: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  cardPosition: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
  },
  reversedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  reversedText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  meaningSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  meaningText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
  },
  keywordsSection: {
    marginBottom: 20,
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordTag: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  keywordText: {
    fontSize: 14,
    color: colors.accent,
    fontFamily: 'Inter_500Medium',
  },
  propertiesSection: {
    marginBottom: 32,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  propertyLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_500Medium',
  },
  propertyValue: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
  },
  actionSection: {
    alignItems: 'center',
  },
});
