
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
  glass: 'rgba(45, 27, 105, 0.8)', // Glass effect background
  glassBorder: 'rgba(255, 110, 199, 0.3)', // Glass border with magical pink
  chatBubbleUser: '#ff6ec7', // User chat bubble - magical pink
  chatBubbleBot: 'rgba(45, 27, 105, 0.9)', // Bot chat bubble
  chatInputText: '#ffffff', // White text for chat input
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 8px 24px rgba(255, 110, 199, 0.4)',
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
    boxShadow: '0px 4px 12px rgba(255, 110, 199, 0.2)',
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
    boxShadow: '0px 8px 24px rgba(255, 110, 199, 0.4)',
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
    backgroundColor: 'rgba(26, 0, 51, 0.7)',
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
