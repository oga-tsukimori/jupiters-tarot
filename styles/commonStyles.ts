
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#1a0d2e',      // Deep mystical purple
  secondary: '#16213e',    // Dark blue-purple
  accent: '#e8b86d',       // Golden accent
  background: '#0f0a1a',   // Very dark purple background
  backgroundAlt: '#1a0d2e', // Slightly lighter dark purple
  text: '#f5f1eb',         // Warm off-white
  textSecondary: '#c9b99b', // Muted gold
  grey: '#4a3c5c',         // Muted purple-grey
  card: '#1e1535',         // Card background
  cardBorder: '#2d1b4e',   // Card border
  gold: '#d4af37',         // Pure gold
  silver: '#c0c0c0',       // Silver
  gradient1: '#1a0d2e',    // Gradient start
  gradient2: '#2d1b4e',    // Gradient end
  glass: 'rgba(30, 21, 53, 0.8)', // Glass effect background
  glassBorder: 'rgba(232, 184, 109, 0.2)', // Glass border
  chatBubbleUser: '#e8b86d', // User chat bubble
  chatBubbleBot: 'rgba(30, 21, 53, 0.9)', // Bot chat bubble
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(232, 184, 109, 0.4)',
    elevation: 8,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(232, 184, 109, 0.2)',
    elevation: 4,
  },
  glass: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.5)',
    elevation: 8,
  },
  rounded: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    boxShadow: '0px 8px 24px rgba(232, 184, 109, 0.4)',
    elevation: 8,
  },
});

export const glassStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 20,
    padding: 20,
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },
  overlay: {
    backgroundColor: 'rgba(15, 10, 26, 0.7)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  card: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
    elevation: 4,
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_400Regular',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.5)',
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
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
    height: 24,
  },
});
