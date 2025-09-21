
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, glassStyles, buttonStyles } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';
import { TarotCard, DrawnCard, SpreadType } from '../types/tarot';
import { getRandomCards } from '../data/tarotCards';

interface ChatScreenProps {
  onBack: () => void;
  currentReading?: {
    spread: SpreadType;
    cards: DrawnCard[];
  };
}

export default function ChatScreen({ onBack, currentReading }: ChatScreenProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    console.log('ChatScreen mounted with reading:', currentReading);
    setMessages([
      {
        _id: 1,
        text: currentReading 
          ? `I can see you've drawn cards for a ${currentReading.spread} reading. What would you like to know about your cards? ✨`
          : 'Welcome to your mystical chat! Ask me anything about tarot, your readings, or seek guidance from the cards. 🔮✨',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Mystic Guide',
          avatar: '🔮',
        },
      },
    ]);
  }, [currentReading]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    console.log('Sending message:', newMessages[0].text);
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
    // Generate AI response with card shuffling
    setTimeout(() => {
      const userMessage = newMessages[0].text.toLowerCase();
      const response = generateTarotResponseWithShuffle(userMessage, currentReading);
      
      const botMessage: IMessage = {
        _id: Math.round(Math.random() * 1000000),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Mystic Guide',
          avatar: '🔮',
        },
      };
      
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }, 1000 + Math.random() * 2000); // Random delay for more natural feel
  }, [currentReading]);

  const generateTarotResponseWithShuffle = (userMessage: string, reading?: { spread: SpreadType; cards: DrawnCard[] }): string => {
    console.log('Generating response with card shuffle for:', userMessage);
    
    // Shuffle cards and draw new ones for the answer
    const shuffledCards = getRandomCards(3); // Draw 3 cards for the answer
    const drawnCards: DrawnCard[] = shuffledCards.map((card, index) => ({
      card,
      position: ['Past/Situation', 'Present/Action', 'Future/Outcome'][index],
      isReversed: Math.random() < 0.3, // 30% chance of reversed
    }));

    // Keywords for different types of questions
    const loveKeywords = ['love', 'relationship', 'romance', 'partner', 'heart', 'dating', 'crush', 'marriage'];
    const careerKeywords = ['career', 'job', 'work', 'money', 'finance', 'business', 'success', 'promotion'];
    const spiritualKeywords = ['spiritual', 'growth', 'meditation', 'chakra', 'energy', 'soul', 'purpose', 'enlightenment'];
    const futureKeywords = ['future', 'tomorrow', 'next', 'will', 'going to', 'predict', 'what happens'];
    const generalKeywords = ['help', 'advice', 'guidance', 'what should', 'how can', 'tell me'];
    
    const isLoveQuestion = loveKeywords.some(keyword => userMessage.includes(keyword));
    const isCareerQuestion = careerKeywords.some(keyword => userMessage.includes(keyword));
    const isSpiritualQuestion = spiritualKeywords.some(keyword => userMessage.includes(keyword));
    const isFutureQuestion = futureKeywords.some(keyword => userMessage.includes(keyword));
    const isGeneralQuestion = generalKeywords.some(keyword => userMessage.includes(keyword));

    // Create the card spread description
    const cardSpreadText = `\n\n🃏 The cards have been shuffled and speak:\n\n` +
      `🌙 ${drawnCards[0].position}: ${drawnCards[0].card.name}${drawnCards[0].isReversed ? ' (Reversed)' : ''}\n` +
      `✨ ${drawnCards[1].position}: ${drawnCards[1].card.name}${drawnCards[1].isReversed ? ' (Reversed)' : ''}\n` +
      `⭐ ${drawnCards[2].position}: ${drawnCards[2].card.name}${drawnCards[2].isReversed ? ' (Reversed)' : ''}`;

    if (isLoveQuestion) {
      const loveInterpretation = generateLoveInterpretation(drawnCards);
      return `💕 The cards reveal insights about your heart's journey...\n\n${loveInterpretation}${cardSpreadText}\n\nLove flows like a river - sometimes gentle, sometimes turbulent, but always moving toward its destined course. Trust in the timing of your heart. 💖✨`;
    }
    
    if (isCareerQuestion) {
      const careerInterpretation = generateCareerInterpretation(drawnCards);
      return `💼 The universe speaks of your professional path...\n\n${careerInterpretation}${cardSpreadText}\n\nSuccess is not just about reaching the destination, but about who you become on the journey. The cards guide you toward your highest potential. 🌟💫`;
    }
    
    if (isSpiritualQuestion) {
      const spiritualInterpretation = generateSpiritualInterpretation(drawnCards);
      return `🔮 Your soul seeks deeper understanding...\n\n${spiritualInterpretation}${cardSpreadText}\n\nThe spiritual path is not about perfection, but about awakening to your true nature. Each step brings you closer to enlightenment. 🙏✨`;
    }
    
    if (isFutureQuestion) {
      const futureInterpretation = generateFutureInterpretation(drawnCards);
      return `🌟 The threads of time weave your destiny...\n\n${futureInterpretation}${cardSpreadText}\n\nRemember, the future is not set in stone but shaped by your choices and intentions. Use this guidance to create the path you desire. 🌙🔮`;
    }

    if (isGeneralQuestion || reading) {
      const generalInterpretation = generateGeneralInterpretation(drawnCards);
      return `✨ The cosmic forces align to bring you guidance...\n\n${generalInterpretation}${cardSpreadText}\n\nThe universe speaks in symbols and synchronicities. Trust your intuition as you interpret these messages. 🌟🔮`;
    }
    
    // Default mystical responses with card shuffle
    const defaultInterpretation = generateGeneralInterpretation(drawnCards);
    const defaultResponses = [
      `🌙 The mystical energies swirl around your question...\n\n${defaultInterpretation}${cardSpreadText}\n\nEvery question carries the seed of its own answer. The cards merely illuminate what your soul already knows. ✨`,
      `🔮 The ancient wisdom flows through these sacred cards...\n\n${defaultInterpretation}${cardSpreadText}\n\nTrust in the divine timing of your journey. The universe conspires to guide you toward your highest good. 🌟`,
      `✨ The veil between worlds grows thin as the cards speak...\n\n${defaultInterpretation}${cardSpreadText}\n\nYour question resonates with cosmic truth. Let these insights illuminate your path forward. 🌙💫`,
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const generateLoveInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your romantic journey shows ${pastMeaning.toLowerCase()} in your past experiences, which has shaped your current emotional state. Presently, ${presentMeaning.toLowerCase()} influences your heart's desires and actions. Looking ahead, ${futureMeaning.toLowerCase()} suggests the direction your love life is heading.`;
  };

  const generateCareerInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your professional path reveals ${pastMeaning.toLowerCase()} as the foundation of your career journey. Currently, ${presentMeaning.toLowerCase()} guides your work-related decisions and opportunities. The future holds ${futureMeaning.toLowerCase()}, indicating the trajectory of your professional growth.`;
  };

  const generateSpiritualInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your spiritual evolution shows ${pastMeaning.toLowerCase()} as the catalyst for your awakening. In this moment, ${presentMeaning.toLowerCase()} illuminates your current spiritual practice and growth. Your soul's future path reveals ${futureMeaning.toLowerCase()}, guiding you toward deeper enlightenment.`;
  };

  const generateFutureInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `The tapestry of time shows ${pastMeaning.toLowerCase()} as the foundation influencing your future. Your present actions, guided by ${presentMeaning.toLowerCase()}, are weaving the threads of tomorrow. The future unfolds with ${futureMeaning.toLowerCase()}, revealing the potential outcomes of your current path.`;
  };

  const generateGeneralInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `The cosmic energies reveal ${pastMeaning.toLowerCase()} as the influence from your past that shapes your current situation. Presently, ${presentMeaning.toLowerCase()} guides your path and decisions. Moving forward, ${futureMeaning.toLowerCase()} illuminates the potential that awaits you.`;
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.chatBubbleUser,
            borderRadius: 20,
            marginVertical: 4,
          },
          left: {
            backgroundColor: colors.chatBubbleBot,
            borderRadius: 20,
            marginVertical: 4,
            borderWidth: 1,
            borderColor: colors.glassBorder,
          },
        }}
        textStyle={{
          right: {
            color: colors.text,
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
          },
          left: {
            color: colors.text,
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
        textInputStyle={styles.textInput}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={20} color={colors.text} />
        </View>
      </Send>
    );
  };

  return (
    <LinearGradient
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={[glassStyles.overlay, styles.header]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={colors.accent} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mystic Chat</Text>
          <View style={styles.headerIcon}>
            <Text style={styles.crystalBall}>🔮</Text>
          </View>
        </View>

        {/* Chat */}
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: 1,
            }}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            placeholder="Ask the cards anything..."
            alwaysShowSend
            scrollToBottom
            infiniteScroll
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
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
  headerIcon: {
    padding: 8,
  },
  crystalBall: {
    fontSize: 24,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputToolbar: {
    backgroundColor: colors.glass,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    borderRadius: 25,
    marginHorizontal: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  textInput: {
    color: colors.chatInputText,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
});
