
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
          <Text style={commonStyles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartReading = () => {
    console.log('Starting tarot reading');
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
    console.log('Opening chat');
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
    if (appState === 'chat') return null;
    
    return (
      <TouchableOpacity
        style={buttonStyles.fab}
        onPress={handleOpenChat}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color={colors.primary} />
      </TouchableOpacity>
    );
  };

  const renderWelcomeScreen = () => (
    <LinearGradient
      colors={[colors.background, colors.primary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <View style={styles.welcomeContent}>
            <Text style={styles.appTitle}>Mystic Tarot</Text>
            <Text style={styles.appSubtitle}>
              Discover the wisdom of the cards
            </Text>
            
            <View style={styles.mysticalSymbols}>
              <Text style={styles.symbol}>✦</Text>
              <Text style={styles.symbol}>✧</Text>
              <Text style={styles.symbol}>✦</Text>
            </View>

            <View style={[glassStyles.container, styles.welcomeCard]}>
              <Text style={styles.welcomeText}>
                Welcome to your personal tarot reading experience. 
                Let the ancient wisdom guide your path forward.
              </Text>
            </View>

            <Button
              text="Begin Reading"
              onPress={handleStartReading}
              variant="primary"
              size="large"
              style={styles.startButton}
            />

            <Button
              text="Chat with Mystic Guide"
              onPress={handleOpenChat}
              variant="glass"
              size="medium"
              style={styles.chatButton}
            />
          </View>
        </View>
        {renderFloatingChatButton()}
      </SafeAreaView>
    </LinearGradient>
  );

  const renderSpreadsScreen = () => (
    <LinearGradient
      colors={[colors.background, colors.primary]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={commonStyles.container}>
        <View style={[glassStyles.overlay, styles.spreadsHeader]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToWelcome}
          >
            <Ionicons name="arrow-back" size={24} color={colors.accent} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Your Spread</Text>
          <View style={styles.placeholder} />
        </View>
        <SpreadSelector onSelectSpread={handleSelectSpread} />
        {renderFloatingChatButton()}
      </SafeAreaView>
    </LinearGradient>
  );

  const renderReadingScreen = () => (
    <LinearGradient
      colors={[colors.background, colors.primary]}
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
    paddingHorizontal: 32,
    maxWidth: 400,
  },
  appTitle: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'CormorantGaramond_400Regular',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  mysticalSymbols: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    gap: 24,
  },
  symbol: {
    fontSize: 32,
    color: colors.accent,
    opacity: 0.8,
  },
  welcomeCard: {
    marginBottom: 32,
    width: '100%',
  },
  welcomeText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  startButton: {
    marginBottom: 16,
    minWidth: 200,
  },
  chatButton: {
    minWidth: 200,
  },
  spreadsHeader: {
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
  placeholder: {
    width: 40,
  },
});
