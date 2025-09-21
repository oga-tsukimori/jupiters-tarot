
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
          ? `I can see you've drawn cards for a ${currentReading.spread} reading. What would you like to know about your cards?`
          : 'Welcome to your mystical chat! Ask me anything about tarot, your readings, or seek guidance from the cards.',
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
    
    // Generate AI response
    setTimeout(() => {
      const userMessage = newMessages[0].text.toLowerCase();
      const response = generateTarotResponse(userMessage, currentReading);
      
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

  const generateTarotResponse = (userMessage: string, reading?: { spread: SpreadType; cards: DrawnCard[] }): string => {
    console.log('Generating response for:', userMessage);
    
    // Keywords for different types of questions
    const loveKeywords = ['love', 'relationship', 'romance', 'partner', 'heart', 'dating'];
    const careerKeywords = ['career', 'job', 'work', 'money', 'finance', 'business', 'success'];
    const spiritualKeywords = ['spiritual', 'growth', 'meditation', 'chakra', 'energy', 'soul'];
    const futureKeywords = ['future', 'tomorrow', 'next', 'will', 'going to', 'predict'];
    
    const isLoveQuestion = loveKeywords.some(keyword => userMessage.includes(keyword));
    const isCareerQuestion = careerKeywords.some(keyword => userMessage.includes(keyword));
    const isSpiritualQuestion = spiritualKeywords.some(keyword => userMessage.includes(keyword));
    const isFutureQuestion = futureKeywords.some(keyword => userMessage.includes(keyword));
    
    if (reading && reading.cards.length > 0) {
      const firstCard = reading.cards[0];
      const cardName = firstCard.card.name;
      const isReversed = firstCard.isReversed;
      const meaning = isReversed ? firstCard.card.reversed.meaning : firstCard.card.upright.meaning;
      
      if (isLoveQuestion) {
        return `Looking at your ${cardName}${isReversed ? ' (reversed)' : ''}, I see ${meaning.toLowerCase()}. In matters of the heart, this suggests ${generateLoveAdvice(cardName, isReversed)}. The cards whisper of emotional currents that flow through your romantic sphere. ✨💕`;
      }
      
      if (isCareerQuestion) {
        return `Your ${cardName}${isReversed ? ' (reversed)' : ''} reveals ${meaning.toLowerCase()}. For your career path, this indicates ${generateCareerAdvice(cardName, isReversed)}. The universe aligns opportunities with your professional journey. 🌟💼`;
      }
      
      if (isSpiritualQuestion) {
        return `The ${cardName}${isReversed ? ' (reversed)' : ''} speaks of ${meaning.toLowerCase()}. On your spiritual journey, this card illuminates ${generateSpiritualAdvice(cardName, isReversed)}. Your soul seeks deeper understanding through this cosmic message. 🔮✨`;
      }
      
      return `Your ${cardName}${isReversed ? ' (reversed)' : ''} carries the energy of ${meaning.toLowerCase()}. This card suggests ${generateGeneralAdvice(cardName, isReversed)}. Trust in the wisdom the cards have revealed to you. 🌙✨`;
    }
    
    // General responses without specific reading
    if (isFutureQuestion) {
      return "The future is a tapestry woven by your choices and the cosmic forces around you. While I cannot predict exact events, I can help you understand the energies at play. Would you like me to draw some cards to illuminate your path forward? 🔮✨";
    }
    
    if (isLoveQuestion) {
      return "Matters of the heart are complex and beautiful. Love flows like a river, sometimes calm, sometimes turbulent. The cards can offer insight into your romantic energies. Shall we explore what the universe has to say about your love life? 💕🌹";
    }
    
    if (isCareerQuestion) {
      return "Your professional path is guided by both ambition and cosmic timing. Success comes to those who align their actions with universal flow. The cards can reveal hidden opportunities and challenges in your career. Would you like guidance on your professional journey? 💼⭐";
    }
    
    // Default mystical responses
    const defaultResponses = [
      "The cosmic energies swirl around your question. Each soul's journey is unique, and the cards speak differently to each seeker. What specific aspect of your life would you like the cards to illuminate? 🌟",
      "I sense deep wisdom in your inquiry. The universe communicates through symbols and synchronicities. The tarot cards are one such language of the divine. How may I help you decode the messages meant for you? ✨",
      "Your question resonates with ancient wisdom. The cards have guided seekers for centuries, offering glimpses into the hidden currents of fate and free will. What guidance do you seek from the mystical realm? 🔮",
      "The veil between worlds grows thin when we seek truth. Your question carries the weight of genuine seeking. The cards respond to sincere hearts. What area of your life calls for illumination? 🌙",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const generateLoveAdvice = (cardName: string, isReversed: boolean): string => {
    const loveAdvice = [
      "a time of emotional growth and deeper connection awaits",
      "patience in love will be rewarded with genuine affection",
      "your heart is opening to new possibilities in romance",
      "trust your intuition when it comes to matters of love",
      "communication is key to resolving relationship challenges"
    ];
    
    if (isReversed) {
      return "some emotional healing may be needed before love can fully bloom";
    }
    
    return loveAdvice[Math.floor(Math.random() * loveAdvice.length)];
  };

  const generateCareerAdvice = (cardName: string, isReversed: boolean): string => {
    const careerAdvice = [
      "new opportunities are on the horizon for professional growth",
      "your hard work and dedication will soon bear fruit",
      "collaboration with others will lead to success",
      "trust your skills and take calculated risks",
      "a period of learning and skill development approaches"
    ];
    
    if (isReversed) {
      return "some obstacles in your career path require patience and strategic thinking";
    }
    
    return careerAdvice[Math.floor(Math.random() * careerAdvice.length)];
  };

  const generateSpiritualAdvice = (cardName: string, isReversed: boolean): string => {
    const spiritualAdvice = [
      "a deeper connection to your inner wisdom is emerging",
      "meditation and reflection will bring clarity to your path",
      "your spiritual gifts are awakening and need nurturing",
      "the universe is guiding you toward your higher purpose",
      "balance between material and spiritual worlds is needed"
    ];
    
    if (isReversed) {
      return "some spiritual blockages need clearing before progress can be made";
    }
    
    return spiritualAdvice[Math.floor(Math.random() * spiritualAdvice.length)];
  };

  const generateGeneralAdvice = (cardName: string, isReversed: boolean): string => {
    const generalAdvice = [
      "a time of transformation and positive change is approaching",
      "trust in your inner strength to overcome current challenges",
      "new perspectives will illuminate your path forward",
      "balance and harmony are needed in your current situation",
      "the universe is aligning circumstances in your favor"
    ];
    
    if (isReversed) {
      return "some inner work and reflection will help you move forward";
    }
    
    return generalAdvice[Math.floor(Math.random() * generalAdvice.length)];
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
            color: colors.primary,
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
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={20} color={colors.primary} />
        </View>
      </Send>
    );
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.primary]}
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
