
import { TarotCard } from '../types/tarot';

export const tarotCards: TarotCard[] = [
  {
    id: 1,
    name: 'The Fool',
    arcana: 'major',
    number: 0,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'New beginnings, innocence, spontaneity',
      keywords: ['adventure', 'freedom', 'new journey', 'optimism'],
      description: 'The Fool represents new beginnings and having faith in the future. It suggests being open to new experiences and trusting in the journey ahead.'
    },
    reversed: {
      meaning: 'Recklessness, taken advantage of, inconsideration',
      keywords: ['foolishness', 'recklessness', 'risk-taking', 'carelessness'],
      description: 'Reversed, The Fool warns against reckless behavior and suggests the need for more careful planning before taking action.'
    }
  },
  {
    id: 2,
    name: 'The Magician',
    arcana: 'major',
    number: 1,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Manifestation, resourcefulness, power',
      keywords: ['willpower', 'desire', 'creation', 'manifestation'],
      description: 'The Magician represents the power to manifest your desires through focused will and action. You have all the tools you need to succeed.'
    },
    reversed: {
      meaning: 'Manipulation, poor planning, untapped talents',
      keywords: ['manipulation', 'cunning', 'trickery', 'illusion'],
      description: 'Reversed, The Magician suggests manipulation or misuse of power. It may indicate that you need to reconnect with your inner power.'
    }
  },
  {
    id: 3,
    name: 'The High Priestess',
    arcana: 'major',
    number: 2,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Intuition, sacred knowledge, divine feminine',
      keywords: ['intuition', 'mystery', 'subconscious', 'inner wisdom'],
      description: 'The High Priestess represents intuition, sacred knowledge, and the divine feminine. Trust your inner voice and pay attention to your dreams.'
    },
    reversed: {
      meaning: 'Secrets, disconnected from intuition, withdrawal',
      keywords: ['hidden agendas', 'lack of center', 'lost inner voice'],
      description: 'Reversed, The High Priestess suggests you may be disconnected from your intuition or that secrets are being kept from you.'
    }
  },
  {
    id: 4,
    name: 'The Empress',
    arcana: 'major',
    number: 3,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Femininity, beauty, nature, abundance',
      keywords: ['motherhood', 'fertility', 'sensuality', 'creativity'],
      description: 'The Empress represents femininity, beauty, nature, and abundance. She encourages you to connect with your feminine side and embrace creativity.'
    },
    reversed: {
      meaning: 'Creative block, dependence on others',
      keywords: ['insecurity', 'overbearing', 'lack of growth'],
      description: 'Reversed, The Empress may indicate creative blocks, dependence on others, or neglecting self-care and personal growth.'
    }
  },
  {
    id: 5,
    name: 'The Emperor',
    arcana: 'major',
    number: 4,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Authority, establishment, structure, father figure',
      keywords: ['leadership', 'authority', 'structure', 'control'],
      description: 'The Emperor represents authority, structure, and control. He suggests the need for discipline and organization to achieve your goals.'
    },
    reversed: {
      meaning: 'Tyranny, rigidity, coldness',
      keywords: ['domination', 'excessive control', 'rigidity', 'coldness'],
      description: 'Reversed, The Emperor warns against being too controlling or rigid. It may suggest abuse of power or lack of discipline.'
    }
  },
  {
    id: 6,
    name: 'The Hierophant',
    arcana: 'major',
    number: 5,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Spiritual wisdom, religious beliefs, conformity',
      keywords: ['tradition', 'conformity', 'morality', 'ethics'],
      description: 'The Hierophant represents spiritual wisdom, religious beliefs, and conformity to social structures and traditions.'
    },
    reversed: {
      meaning: 'Personal beliefs, freedom, challenging the status quo',
      keywords: ['rebellion', 'subversiveness', 'new approaches'],
      description: 'Reversed, The Hierophant suggests challenging traditional beliefs and finding your own spiritual path outside conventional structures.'
    }
  },
  {
    id: 7,
    name: 'The Lovers',
    arcana: 'major',
    number: 6,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Love, harmony, relationships, values alignment',
      keywords: ['love', 'union', 'relationships', 'choices'],
      description: 'The Lovers represents love, harmony, and relationships. It suggests important choices about relationships and values alignment.'
    },
    reversed: {
      meaning: 'Disharmony, imbalance, misalignment of values',
      keywords: ['disharmony', 'imbalance', 'misalignment', 'conflict'],
      description: 'Reversed, The Lovers indicates relationship problems, disharmony, or misalignment of values and goals.'
    }
  },
  {
    id: 8,
    name: 'The Chariot',
    arcana: 'major',
    number: 7,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Control, willpower, success, determination',
      keywords: ['control', 'willpower', 'success', 'determination'],
      description: 'The Chariot represents control, willpower, and success through determination. You have the strength to overcome obstacles.'
    },
    reversed: {
      meaning: 'Lack of control, lack of direction, aggression',
      keywords: ['lack of control', 'lack of direction', 'aggression'],
      description: 'Reversed, The Chariot suggests lack of control or direction. You may need to reassess your goals and methods.'
    }
  },
  {
    id: 9,
    name: 'Strength',
    arcana: 'major',
    number: 8,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Strength, courage, persuasion, influence',
      keywords: ['inner strength', 'bravery', 'compassion', 'focus'],
      description: 'Strength represents inner strength, courage, and the power of compassion over force. True strength comes from within.'
    },
    reversed: {
      meaning: 'Self doubt, lack of confidence, lack of self-discipline',
      keywords: ['self-doubt', 'lack of confidence', 'weakness'],
      description: 'Reversed, Strength suggests self-doubt, lack of confidence, or the need to develop inner strength and self-discipline.'
    }
  },
  {
    id: 10,
    name: 'The Hermit',
    arcana: 'major',
    number: 9,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Soul searching, introspection, inner guidance',
      keywords: ['introspection', 'searching', 'guidance', 'solitude'],
      description: 'The Hermit represents soul searching, introspection, and seeking inner guidance. Sometimes you need to withdraw to find answers.'
    },
    reversed: {
      meaning: 'Isolation, loneliness, withdrawal',
      keywords: ['isolation', 'loneliness', 'lost your way'],
      description: 'Reversed, The Hermit suggests excessive isolation or loneliness. You may need to reconnect with others or seek external guidance.'
    }
  },
  {
    id: 11,
    name: 'Wheel of Fortune',
    arcana: 'major',
    number: 10,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Good luck, karma, life cycles, destiny',
      keywords: ['fate', 'destiny', 'change', 'cycles'],
      description: 'The Wheel of Fortune represents good luck, karma, and life cycles. What goes around comes around, and change is inevitable.'
    },
    reversed: {
      meaning: 'Bad luck, lack of control, clinging to control',
      keywords: ['bad luck', 'lack of control', 'broken cycles'],
      description: 'Reversed, the Wheel of Fortune suggests bad luck or feeling out of control. You may be resisting necessary changes.'
    }
  },
  {
    id: 12,
    name: 'Justice',
    arcana: 'major',
    number: 11,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Justice, fairness, truth, cause and effect',
      keywords: ['justice', 'fairness', 'truth', 'law'],
      description: 'Justice represents fairness, truth, and cause and effect. Decisions should be made with careful consideration of all factors.'
    },
    reversed: {
      meaning: 'Unfairness, lack of accountability, dishonesty',
      keywords: ['unfairness', 'lack of accountability', 'bias'],
      description: 'Reversed, Justice suggests unfairness, lack of accountability, or dishonesty. Truth may be obscured or ignored.'
    }
  },
  {
    id: 13,
    name: 'The Hanged Man',
    arcana: 'major',
    number: 12,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Suspension, restriction, letting go',
      keywords: ['waiting', 'suspension', 'restriction', 'sacrifice'],
      description: 'The Hanged Man represents suspension, restriction, and letting go. Sometimes you need to surrender and see things from a new perspective.'
    },
    reversed: {
      meaning: 'Delays, resistance, stalling',
      keywords: ['delays', 'resistance', 'stalling', 'indecision'],
      description: 'Reversed, The Hanged Man suggests unnecessary delays, resistance to change, or stalling when action is needed.'
    }
  },
  {
    id: 14,
    name: 'Death',
    arcana: 'major',
    number: 13,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Endings, beginnings, change, transformation',
      keywords: ['transformation', 'transition', 'change', 'rebirth'],
      description: 'Death represents endings, beginnings, and transformation. It rarely means literal death, but rather the end of one phase and beginning of another.'
    },
    reversed: {
      meaning: 'Resistance to change, personal transformation',
      keywords: ['resistance to change', 'stagnation', 'decay'],
      description: 'Reversed, Death suggests resistance to necessary change or transformation. You may be clinging to what no longer serves you.'
    }
  },
  {
    id: 15,
    name: 'Temperance',
    arcana: 'major',
    number: 14,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Balance, moderation, patience, purpose',
      keywords: ['balance', 'moderation', 'patience', 'harmony'],
      description: 'Temperance represents balance, moderation, and patience. It suggests finding the middle path and maintaining harmony in all aspects of life.'
    },
    reversed: {
      meaning: 'Imbalance, excess, self-healing, re-alignment',
      keywords: ['imbalance', 'excess', 'extremes', 'lack of harmony'],
      description: 'Reversed, Temperance suggests imbalance, excess, or extremes. You may need to reassess your approach and find better balance.'
    }
  },
  {
    id: 16,
    name: 'The Devil',
    arcana: 'major',
    number: 15,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Bondage, addiction, sexuality, materialism',
      keywords: ['bondage', 'addiction', 'restriction', 'materialism'],
      description: 'The Devil represents bondage, addiction, and materialism. It suggests being trapped by your own limiting beliefs or unhealthy patterns.'
    },
    reversed: {
      meaning: 'Releasing limiting beliefs, exploring dark thoughts',
      keywords: ['freedom', 'release', 'restoring control', 'independence'],
      description: 'Reversed, The Devil suggests breaking free from limiting beliefs, addictions, or unhealthy patterns. Liberation is possible.'
    }
  },
  {
    id: 17,
    name: 'The Tower',
    arcana: 'major',
    number: 16,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Sudden change, upheaval, chaos, revelation',
      keywords: ['upheaval', 'chaos', 'sudden change', 'revelation'],
      description: 'The Tower represents sudden change, upheaval, and revelation. Sometimes destruction is necessary to make way for something better.'
    },
    reversed: {
      meaning: 'Personal transformation, fear of change, averting disaster',
      keywords: ['personal transformation', 'fear of change', 'avoiding disaster'],
      description: 'Reversed, The Tower suggests personal transformation, fear of change, or successfully averting disaster through preparation.'
    }
  },
  {
    id: 18,
    name: 'The Star',
    arcana: 'major',
    number: 17,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Hope, faith, purpose, renewal, spirituality',
      keywords: ['hope', 'faith', 'purpose', 'renewal'],
      description: 'The Star represents hope, faith, and spiritual guidance. After the storm comes calm, and you can see the light at the end of the tunnel.'
    },
    reversed: {
      meaning: 'Lack of faith, despair, self-trust, disconnection',
      keywords: ['lack of faith', 'despair', 'disconnection', 'insecurity'],
      description: 'Reversed, The Star suggests lack of faith, despair, or disconnection from your spiritual self. You may need to reconnect with your inner light.'
    }
  },
  {
    id: 19,
    name: 'The Moon',
    arcana: 'major',
    number: 18,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Illusion, fear, anxiety, subconscious, intuition',
      keywords: ['illusion', 'fear', 'anxiety', 'intuition'],
      description: 'The Moon represents illusion, fear, and the subconscious. Things may not be as they seem, and you need to trust your intuition.'
    },
    reversed: {
      meaning: 'Release of fear, repressed emotion, inner confusion',
      keywords: ['release of fear', 'clarity', 'understanding', 'truth'],
      description: 'Reversed, The Moon suggests release of fear, gaining clarity, or overcoming confusion. The truth is beginning to emerge.'
    }
  },
  {
    id: 20,
    name: 'The Sun',
    arcana: 'major',
    number: 19,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Positivity, fun, warmth, success, vitality',
      keywords: ['positivity', 'fun', 'warmth', 'success'],
      description: 'The Sun represents positivity, fun, warmth, and success. It\'s one of the most positive cards in the deck, indicating joy and vitality.'
    },
    reversed: {
      meaning: 'Inner child, feeling down, overly optimistic',
      keywords: ['inner child', 'feeling down', 'lack of enthusiasm'],
      description: 'Reversed, The Sun suggests reconnecting with your inner child, overcoming sadness, or tempering excessive optimism with realism.'
    }
  },
  {
    id: 21,
    name: 'Judgement',
    arcana: 'major',
    number: 20,
    imageUrl: require('../assets/images/c6893db9-fdd8-4c6d-818c-737415a6d312.png'),
    upright: {
      meaning: 'Judgement, rebirth, inner calling, absolution',
      keywords: ['judgement', 'rebirth', 'inner calling', 'forgiveness'],
      description: 'Judgement represents rebirth, inner calling, and absolution. You\'re being called to a higher purpose and can leave the past behind.'
    },
    reversed: {
      meaning: 'Self-doubt, inner critic, ignoring the call',
      keywords: ['self-doubt', 'inner critic', 'ignoring the call'],
      description: 'Reversed, Judgement suggests self-doubt, harsh self-criticism, or ignoring your inner calling. You may need to be more forgiving of yourself.'
    }
  },
  {
    id: 22,
    name: 'The World',
    arcana: 'major',
    number: 21,
    imageUrl: require('../assets/images/c12851d6-cf50-4c31-b596-a6f329451423.png'),
    upright: {
      meaning: 'Completion, accomplishment, travel, fulfillment',
      keywords: ['completion', 'accomplishment', 'fulfillment', 'success'],
      description: 'The World represents completion, accomplishment, and fulfillment. You have achieved your goals and reached a state of wholeness.'
    },
    reversed: {
      meaning: 'Incomplete goals, lack of closure, stagnation',
      keywords: ['incomplete goals', 'lack of closure', 'stagnation'],
      description: 'Reversed, The World suggests incomplete goals, lack of closure, or stagnation. You may need to reassess what completion means to you.'
    }
  }
];

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCardById = (id: number): TarotCard | undefined => {
  return tarotCards.find(card => card.id === id);
};
