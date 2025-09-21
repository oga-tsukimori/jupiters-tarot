
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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

interface ChatHistory {
  messages: IMessage[];
  timestamp: string;
}

export default function ChatScreen({ onBack, currentReading }: ChatScreenProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    console.log('ChatScreen mounted with reading:', currentReading);
    
    // Load chat history from storage (simulated)
    loadChatHistory();
    
    setMessages([
      {
        _id: 1,
        text: currentReading 
          ? `Welcome back to Jupiter's mystical realm! ✨ I can see you've drawn cards for a ${currentReading.spread} reading. What cosmic wisdom do you seek about your cards? 🔮`
          : 'Welcome to Jupiter\'s Tarot sanctuary! 🌟 I am your mystical guide through the cosmic energies. Ask me anything about tarot, seek guidance from the stars, or let me shuffle the cards to reveal your destiny. ✨🔮',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Jupiter\'s Oracle',
          avatar: '🔮',
        },
      },
    ]);
  }, [currentReading]);

  const loadChatHistory = () => {
    // Simulated chat history loading
    console.log('Loading chat history...');
    // In a real app, you would load from AsyncStorage or a database
  };

  const saveChatHistory = (newMessages: IMessage[]) => {
    const historyEntry: ChatHistory = {
      messages: newMessages,
      timestamp: new Date().toISOString(),
    };
    setChatHistory(prev => [...prev, historyEntry]);
    console.log('Chat history saved:', historyEntry);
    // In a real app, you would save to AsyncStorage or a database
  };

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    console.log('Sending message:', newMessages[0].text);
    const updatedMessages = GiftedChat.append(messages, newMessages);
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);
    
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
          name: 'Jupiter\'s Oracle',
          avatar: '🔮',
        },
      };
      
      const finalMessages = GiftedChat.append(updatedMessages, [botMessage]);
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
    }, 1200 + Math.random() * 2000); // Random delay for more natural feel
  }, [messages, currentReading]);

  const generateTarotResponseWithShuffle = (userMessage: string, reading?: { spread: SpreadType; cards: DrawnCard[] }): string => {
    console.log('Generating response with card shuffle for:', userMessage);
    
    // Check for time-specific questions
    const timeKeywords = {
      months: ['month', 'months'],
      days: ['day', 'days'],
      hours: ['hour', 'hours'],
      minutes: ['minute', 'minutes'],
      weeks: ['week', 'weeks'],
      years: ['year', 'years']
    };

    const hasTimeQuestion = Object.entries(timeKeywords).some(([unit, keywords]) => 
      keywords.some(keyword => userMessage.includes(keyword))
    );

    if (hasTimeQuestion) {
      return generateTimeSpecificResponse(userMessage);
    }
    
    // Shuffle cards and draw new ones for the answer
    const shuffledCards = getRandomCards(3); // Draw 3 cards for the answer
    const drawnCards: DrawnCard[] = shuffledCards.map((card, index) => ({
      card,
      position: ['Past/Foundation', 'Present/Energy', 'Future/Outcome'][index],
      isRevealed: true,
      isReversed: Math.random() < 0.3, // 30% chance of reversed
    }));

    // Keywords for different types of questions
    const loveKeywords = ['love', 'relationship', 'romance', 'partner', 'heart', 'dating', 'crush', 'marriage', 'soulmate'];
    const careerKeywords = ['career', 'job', 'work', 'money', 'finance', 'business', 'success', 'promotion', 'wealth'];
    const spiritualKeywords = ['spiritual', 'growth', 'meditation', 'chakra', 'energy', 'soul', 'purpose', 'enlightenment', 'awakening'];
    const futureKeywords = ['future', 'tomorrow', 'next', 'will', 'going to', 'predict', 'what happens', 'destiny'];
    const generalKeywords = ['help', 'advice', 'guidance', 'what should', 'how can', 'tell me', 'show me'];
    
    const isLoveQuestion = loveKeywords.some(keyword => userMessage.includes(keyword));
    const isCareerQuestion = careerKeywords.some(keyword => userMessage.includes(keyword));
    const isSpiritualQuestion = spiritualKeywords.some(keyword => userMessage.includes(keyword));
    const isFutureQuestion = futureKeywords.some(keyword => userMessage.includes(keyword));
    const isGeneralQuestion = generalKeywords.some(keyword => userMessage.includes(keyword));

    // Create the card spread description with enhanced formatting
    const cardSpreadText = `\n\n🃏 ✨ The cosmic cards have been shuffled by Jupiter's divine energy ✨\n\n` +
      `🌙 ${drawnCards[0].position}: **${drawnCards[0].card.name}**${drawnCards[0].isReversed ? ' (Reversed)' : ''}\n` +
      `   _${drawnCards[0].isReversed ? drawnCards[0].card.reversed.meaning : drawnCards[0].card.upright.meaning}_\n\n` +
      `⚡ ${drawnCards[1].position}: **${drawnCards[1].card.name}**${drawnCards[1].isReversed ? ' (Reversed)' : ''}\n` +
      `   _${drawnCards[1].isReversed ? drawnCards[1].card.reversed.meaning : drawnCards[1].card.upright.meaning}_\n\n` +
      `⭐ ${drawnCards[2].position}: **${drawnCards[2].card.name}**${drawnCards[2].isReversed ? ' (Reversed)' : ''}\n` +
      `   _${drawnCards[2].isReversed ? drawnCards[2].card.reversed.meaning : drawnCards[2].card.upright.meaning}_`;

    if (isLoveQuestion) {
      const loveInterpretation = generateLoveInterpretation(drawnCards);
      return `💕 Jupiter's cosmic love energies swirl around your heart's desire...\n\n${loveInterpretation}${cardSpreadText}\n\n✨ Remember, dear soul, love flows like the celestial rivers - sometimes gentle, sometimes turbulent, but always guided by Jupiter's benevolent wisdom. Trust in divine timing and let your heart be your compass. 💖🌟`;
    }
    
    if (isCareerQuestion) {
      const careerInterpretation = generateCareerInterpretation(drawnCards);
      return `💼 The planetary alignments speak of your professional destiny...\n\n${careerInterpretation}${cardSpreadText}\n\n🌟 Jupiter, the planet of expansion and abundance, reminds you that true success comes not just from reaching your destination, but from the wisdom gained on your journey. The universe conspires to elevate your highest potential. ✨💫`;
    }
    
    if (isSpiritualQuestion) {
      const spiritualInterpretation = generateSpiritualInterpretation(drawnCards);
      return `🔮 Your soul's light calls out to the cosmic consciousness...\n\n${spiritualInterpretation}${cardSpreadText}\n\n🙏 The spiritual path illuminated by Jupiter's wisdom shows that enlightenment is not a destination but a continuous awakening. Each breath, each moment, brings you closer to your divine essence. Trust the journey, beautiful soul. ✨🌙`;
    }
    
    if (isFutureQuestion) {
      const futureInterpretation = generateFutureInterpretation(drawnCards);
      return `🌟 The threads of destiny weave through Jupiter's cosmic tapestry...\n\n${futureInterpretation}${cardSpreadText}\n\n🔮 Remember, precious seeker, the future is not carved in stone but painted with the brushstrokes of your choices and intentions. Jupiter's guidance shows you the path, but you hold the power to walk it. Create your destiny with conscious intention. 🌙✨`;
    }

    if (isGeneralQuestion || reading) {
      const generalInterpretation = generateGeneralInterpretation(drawnCards);
      return `✨ Jupiter's infinite wisdom flows through the cosmic channels...\n\n${generalInterpretation}${cardSpreadText}\n\n🌟 The universe speaks in sacred symbols and divine synchronicities. Trust your intuition as Jupiter's energy guides you to interpret these celestial messages. You are more powerful and wise than you know. 🔮💫`;
    }
    
    // Default mystical responses with card shuffle
    const generalInterpretation = generateGeneralInterpretation(drawnCards);
    const defaultResponses = [
      `🌙 Jupiter's mystical energies dance around your sacred question...\n\n${generalInterpretation}${cardSpreadText}\n\n✨ Every question you ask carries the seed of divine wisdom within it. The cards merely illuminate what your soul already knows. Trust in Jupiter's guidance and your own inner knowing. 🌟`,
      `🔮 The ancient wisdom of Jupiter flows through these sacred cards...\n\n${generalInterpretation}${cardSpreadText}\n\n🌟 Jupiter's benevolent energy reminds you to trust in the divine timing of your journey. The universe conspires to guide you toward your highest good and greatest joy. 💫`,
      `✨ The veil between worlds grows thin as Jupiter's cards speak...\n\n${generalInterpretation}${cardSpreadText}\n\n🌙 Your question resonates with cosmic truth and divine purpose. Let these insights from Jupiter's realm illuminate your path forward with love, wisdom, and infinite possibility. 🔮💖`,
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const generateTimeSpecificResponse = (userMessage: string): string => {
    // Generate random but consistent time predictions
    const months = Math.floor(Math.random() * 12) + 1;
    const days = Math.floor(Math.random() * 30) + 1;
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60) + 1;
    const weeks = Math.floor(Math.random() * 52) + 1;

    const timeResponses = [
      `🕰️ Jupiter's cosmic clock reveals divine timing for your question...\n\n⏰ **Months**: ${months} months of transformation await you\n📅 **Days**: Within ${days} days, significant shifts will occur\n🌅 **Hours**: The next ${hours} hours hold special energy\n⚡ **Minutes**: Pay attention to the next ${minutes} minutes - synchronicities are coming\n\n🌟 Time flows differently in the spiritual realm, dear seeker. These numbers carry vibrational significance that will resonate when the moment is right. Trust in Jupiter's perfect timing. ✨`,
      
      `⏳ The sands of time whisper Jupiter's sacred measurements...\n\n🌙 **${months} Months**: A complete cycle of growth and renewal\n☀️ **${days} Days**: The sun will rise and set ${days} times before clarity emerges\n⭐ **${hours} Hours**: Within ${hours} hours, the universe will send you a sign\n💫 **${minutes} Minutes**: In exactly ${minutes} minutes, take a deep breath and set your intention\n\n🔮 Remember, beautiful soul, divine timing is not about rushing but about alignment. Each moment unfolds perfectly in Jupiter's grand design. 🌟`,
      
      `🌌 Jupiter's temporal wisdom flows through the cosmic currents...\n\n📆 **Months**: ${months} lunar cycles will guide your journey\n🌅 **Days**: ${days} sunrises will illuminate your path\n🕐 **Hours**: ${hours} hours of focused intention will manifest miracles\n⚡ **Minutes**: ${minutes} minutes of meditation will bring clarity\n\n✨ Time is but an illusion, precious seeker. What matters is not when, but how ready your soul is to receive Jupiter's blessings. Trust the process and embrace each moment. 🙏💖`
    ];

    return timeResponses[Math.floor(Math.random() * timeResponses.length)];
  };

  const generateLoveInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your heart's journey reveals that ${pastMeaning.toLowerCase()} has shaped your romantic foundation, creating the emotional landscape you navigate today. In this present moment, ${presentMeaning.toLowerCase()} influences your heart's desires and the love energy you're radiating into the universe. Jupiter's cosmic love forecast shows ${futureMeaning.toLowerCase()} guiding your romantic destiny, promising beautiful transformations in your love life.`;
  };

  const generateCareerInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your professional journey shows that ${pastMeaning.toLowerCase()} has been the cornerstone of your career development, building the foundation for your current success. Presently, ${presentMeaning.toLowerCase()} guides your work-related decisions and opens doors to new opportunities. Jupiter's abundance energy reveals ${futureMeaning.toLowerCase()} as the trajectory of your professional expansion and material prosperity.`;
  };

  const generateSpiritualInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Your soul's evolution reveals that ${pastMeaning.toLowerCase()} has been the catalyst for your spiritual awakening, igniting the divine spark within you. In this sacred moment, ${presentMeaning.toLowerCase()} illuminates your current spiritual practice and guides your connection to the divine. Jupiter's spiritual wisdom shows ${futureMeaning.toLowerCase()} as your path toward deeper enlightenment and cosmic consciousness.`;
  };

  const generateFutureInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `The cosmic tapestry of time reveals that ${pastMeaning.toLowerCase()} has been weaving the threads of your destiny, creating the foundation for what's to come. Your present actions, guided by ${presentMeaning.toLowerCase()}, are actively shaping tomorrow's reality. Jupiter's prophetic vision shows ${futureMeaning.toLowerCase()} as the beautiful manifestation of your current path and intentions.`;
  };

  const generateGeneralInterpretation = (cards: DrawnCard[]): string => {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    
    const pastMeaning = pastCard.isReversed ? pastCard.card.reversed.meaning : pastCard.card.upright.meaning;
    const presentMeaning = presentCard.isReversed ? presentCard.card.reversed.meaning : presentCard.card.upright.meaning;
    const futureMeaning = futureCard.isReversed ? futureCard.card.reversed.meaning : futureCard.card.upright.meaning;
    
    return `Jupiter's cosmic wisdom reveals that ${pastMeaning.toLowerCase()} has been the guiding influence from your past, shaping your current reality and perspective. In this present moment, ${presentMeaning.toLowerCase()} flows through your life, directing your path and illuminating your choices. Moving forward with Jupiter's blessing, ${futureMeaning.toLowerCase()} awaits you as the beautiful potential that your soul is ready to embrace.`;
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.chatBubbleUser,
            borderRadius: 24,
            marginVertical: 6,
            paddingHorizontal: 4,
            paddingVertical: 2,
            boxShadow: '0px 4px 12px rgba(255, 110, 199, 0.3)',
            elevation: 4,
          },
          left: {
            backgroundColor: colors.chatBubbleBot,
            borderRadius: 24,
            marginVertical: 6,
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: colors.glassBorder,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            elevation: 4,
          },
        }}
        textStyle={{
          right: {
            color: colors.text,
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            lineHeight: 22,
            paddingHorizontal: 8,
            paddingVertical: 4,
          },
          left: {
            color: colors.text,
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            lineHeight: 22,
            paddingHorizontal: 8,
            paddingVertical: 4,
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
        placeholder="Ask Jupiter's Oracle anything..."
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={22} color={colors.text} />
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
        <View style={[glassStyles.iosBlur, styles.header]}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={26} color={colors.accent} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Jupiter's Oracle</Text>
            <Text style={styles.headerSubtitle}>Cosmic Guidance</Text>
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="eye" size={26} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {/* Chat History Button */}
        <TouchableOpacity style={[glassStyles.card, styles.historyButton]}>
          <Ionicons name="time-outline" size={20} color={colors.accent} />
          <Text style={styles.historyText}>Chat History ({chatHistory.length})</Text>
        </TouchableOpacity>

        {/* Chat */}
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
            placeholder="Ask Jupiter's Oracle anything..."
            alwaysShowSend
            scrollToBottom
            infiniteScroll
            showUserAvatar={false}
            showAvatarForEveryMessage={true}
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
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginTop: 12,
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
  headerIcon: {
    padding: 10,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  historyText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputToolbar: {
    backgroundColor: colors.glass,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    borderRadius: 28,
    marginHorizontal: 12,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    elevation: 6,
  },
  inputPrimary: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    color: colors.chatInputText,
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 16,
    paddingVertical: 12,
    lineHeight: 24,
    flex: 1,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  sendButton: {
    backgroundColor: colors.accent,
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 4px 12px rgba(255, 110, 199, 0.4)',
    elevation: 6,
  },
});
