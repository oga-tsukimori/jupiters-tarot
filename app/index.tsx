
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, CormorantGaramond_400Regular, CormorantGaramond_600SemiBold } from '@expo-google-fonts/cormorant-garamond';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { colors, commonStyles, buttonStyles, glassStyles } from '../styles/commonStyles';
import { SpreadType, DrawnCard } from '../types/tarot';
import { Ionicons } from '@expo/vector-icons';
import SpreadSelector from '../components/SpreadSelector';
import ReadingScreen from '../components/ReadingScreen';
import ChatScreen from '../components/ChatScreen';
import Button from '../components/Button';

type AppState = 'welcome' | 'spreads' | 'reading' | 'chat';

export default function TarotApp() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('single');
  const [currentReading, setCurrentReading] = useState<{
    spread: SpreadType;
    cards: DrawnCard[];
  } | null>(null);

  const [fontsLoaded] = useFonts({
    CormorantGaramond_400Regular,
    CormorantGaramond_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.text}>Loading Jupiter's wisdom...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartReading = () => {
    console.log('Starting Jupiter\'s tarot reading');
    setAppState('spreads');
  };

  const handleSelectSpread = (spreadType: SpreadType) => {
    console.log('Selected spread:', spreadType);
    setSelectedSpread(spreadType);
    setAppState('reading');
  };

  const handleBackToSpreads = () => {
    console.log('Back to spreads');
    setAppState('spreads');
  };

  const handleBackToWelcome = () => {
    console.log('Back to welcome');
    setAppState('welcome');
    setCurrentReading(null);
  };

  const handleOpenChat = () => {
    console.log('Opening Jupiter\'s Oracle chat');
    setAppState('chat');
  };

  const handleBackFromChat = () => {
    console.log('Back from chat');
    if (currentReading) {
      setAppState('reading');
    } else {
      setAppState('welcome');
    }
  };

  const handleReadingComplete = (reading: { spread: SpreadType; cards: DrawnCard[] }) => {
    console.log('Reading completed:', reading);
    setCurrentReading(reading);
  };

  const renderFloatingChatButton = () => {
    if (appState === 'chat' || appState === 'welcome') return null;
    
    return (
      <TouchableOpacity
        style={buttonStyles.fab}
        onPress={handleOpenChat}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses" size={28} color={colors.text} />
      </TouchableOpacity>
    );
  };

  const renderWelcomeScreen = () => (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <View style={styles.welcomeContent}>
            <Text style={styles.appTitle}>✨ Jupiter's Tarot ✨</Text>
            <Text style={styles.appSubtitle}>
              Discover cosmic wisdom through the ancient cards
            </Text>
            
            <View style={styles.mysticalSymbols}>
              <Text style={styles.symbol}>🌙</Text>
              <Text style={styles.symbol}>🔮</Text>
              <Text style={styles.symbol}>⭐</Text>
              <Text style={styles.symbol}>🪐</Text>
            </View>

            <View style={[glassStyles.iosBlur, styles.welcomeCard]}>
              <Text style={styles.welcomeText}>
                Welcome to Jupiter's mystical realm, where ancient wisdom meets cosmic guidance. 
                Let the planetary energies and sacred cards illuminate your path through the universe's infinite mysteries.
              </Text>
            </View>

            <Button
              text="Begin Your Cosmic Journey"
              onPress={handleStartReading}
              variant="primary"
              size="large"
              style={styles.startButton}
            />
            
            <View style={styles.jupiterInfo}>
              <Text style={styles.jupiterText}>🪐 Guided by Jupiter's Wisdom 🪐</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderSpreadsScreen = () => (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={commonStyles.container}>
        <View style={[glassStyles.iosBlur, styles.spreadsHeader]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToWelcome}
          >
            <Ionicons name="arrow-back" size={26} color={colors.accent} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Choose Your Cosmic Spread</Text>
            <Text style={styles.headerSubtitle}>Select your path to wisdom</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        <SpreadSelector onSelectSpread={handleSelectSpread} />
        {renderFloatingChatButton()}
      </SafeAreaView>
    </LinearGradient>
  );

  const renderReadingScreen = () => (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={commonStyles.container}>
        <ReadingScreen 
          spreadType={selectedSpread} 
          onBack={handleBackToSpreads}
          onReadingComplete={handleReadingComplete}
        />
        {renderFloatingChatButton()}
      </SafeAreaView>
    </LinearGradient>
  );

  const renderChatScreen = () => (
    <ChatScreen 
      onBack={handleBackFromChat}
      currentReading={currentReading}
    />
  );

  switch (appState) {
    case 'welcome':
      return renderWelcomeScreen();
    case 'spreads':
      return renderSpreadsScreen();
    case 'reading':
      return renderReadingScreen();
    case 'chat':
      return renderChatScreen();
    default:
      return renderWelcomeScreen();
  }
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingHorizontal: 36,
    maxWidth: 420,
  },
  appTitle: {
    fontSize: 52,
    fontWeight: '300',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'CormorantGaramond_400Regular',
    letterSpacing: 3,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  appSubtitle: {
    fontSize: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 36,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.8,
  },
  mysticalSymbols: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
    gap: 28,
  },
  symbol: {
    fontSize: 36,
    opacity: 0.9,
    textShadowColor: colors.gold,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  welcomeCard: {
    marginBottom: 36,
    width: '100%',
    padding: 28,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 28,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  startButton: {
    marginBottom: 24,
    minWidth: 240,
  },
  jupiterInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  jupiterText: {
    fontSize: 16,
    color: colors.accent,
    fontFamily: 'CormorantGaramond_600SemiBold',
    letterSpacing: 1,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  spreadsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'CormorantGaramond_600SemiBold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  placeholder: {
    width: 46,
  },
});
