
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#4a148c',      // Deep magical purple
  secondary: '#7b1fa2',    // Vibrant purple
  accent: '#ff6ec7',       // Magical pink
  background: '#1a0033',   // Very dark purple background
  backgroundAlt: '#2d1b69', // Slightly lighter magical purple
  text: '#ffffff',         // Pure white text
  textSecondary: '#e1bee7', // Light purple text
  grey: '#6a4c93',         // Muted purple-grey
  card: '#2d1b69',         // Card background
  cardBorder: '#4a148c',   // Card border
  gold: '#ffd700',         // Pure gold
  silver: '#c0c0c0',       // Silver
  gradient1: '#1a0033',    // Gradient start - deep purple
  gradient2: '#4a148c',    // Gradient middle - magical purple
  gradient3: '#7b1fa2',    // Gradient end - bright purple
  glass: 'rgba(45, 27, 105, 0.85)', // Enhanced glass effect background
  glassBorder: 'rgba(255, 110, 199, 0.4)', // Enhanced glass border with magical pink
  glassOverlay: 'rgba(26, 0, 51, 0.8)', // Glass overlay for iOS-like effect
  chatBubbleUser: '#ff6ec7', // User chat bubble - magical pink
  chatBubbleBot: 'rgba(45, 27, 105, 0.9)', // Bot chat bubble
  chatInputText: '#ffffff', // White text for chat input
  cardFlip: '#9c27b0',     // Card flip animation color
  shimmer: '#e1bee7',      // Shimmer effect color
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 12px 32px rgba(255, 110, 199, 0.5)',
    elevation: 12,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 36,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(255, 110, 199, 0.3)',
    elevation: 8,
  },
  glass: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.4)',
    elevation: 10,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.6)',
    elevation: 12,
  },
  rounded: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
    boxShadow: '0px 12px 32px rgba(255, 110, 199, 0.5)',
    elevation: 12,
  },
});

export const glassStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 24,
    padding: 24,
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.4)',
    elevation: 10,
  },
  overlay: {
    backgroundColor: colors.glassOverlay,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },
  card: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },
  iosBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'CormorantGaramond_400Regular',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 36,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
    marginVertical: 12,
    width: '100%',
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.6)',
    elevation: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  cardText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.accent,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 28,
  },
});
