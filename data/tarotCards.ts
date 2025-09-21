
import { TarotCard } from '../types/tarot';

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    arcana: 'major',
    upright: {
      meaning: 'New beginnings, innocence, spontaneity',
      description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
      keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit']
    },
    reversed: {
      meaning: 'Recklessness, taken advantage of, inconsideration',
      description: 'When reversed, The Fool can represent recklessness, carelessness, and acting without thinking of the consequences.',
      keywords: ['recklessness', 'carelessness', 'negligence', 'stupidity']
    },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'
  },
  {
    id: 1,
    name: 'The Magician',
    arcana: 'major',
    upright: {
      meaning: 'Manifestation, resourcefulness, power',
      description: 'The Magician represents manifestation, resourcefulness, power, inspired action, desire, creation, and manifestation.',
      keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action']
    },
    reversed: {
      meaning: 'Manipulation, poor planning, untapped talents',
      description: 'Reversed, The Magician can indicate manipulation, poor planning, or untapped potential.',
      keywords: ['manipulation', 'poor planning', 'untapped talents', 'trickery']
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop'
  },
  {
    id: 2,
    name: 'The High Priestess',
    arcana: 'major',
    upright: {
      meaning: 'Intuition, sacred knowledge, divine feminine',
      description: 'The High Priestess represents intuition, sacred knowledge, divine feminine, the subconscious mind.',
      keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'subconscious']
    },
    reversed: {
      meaning: 'Secrets, disconnected from intuition, withdrawal',
      description: 'Reversed, she can indicate secrets, being disconnected from your intuition, or withdrawal.',
      keywords: ['secrets', 'disconnected', 'withdrawal', 'repressed feelings']
    },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'
  },
  {
    id: 3,
    name: 'The Empress',
    arcana: 'major',
    upright: {
      meaning: 'Femininity, beauty, nature, nurturing',
      description: 'The Empress represents femininity, beauty, nature, nurturing, and abundance.',
      keywords: ['femininity', 'beauty', 'nature', 'nurturing', 'abundance']
    },
    reversed: {
      meaning: 'Creative block, dependence on others',
      description: 'Reversed, The Empress can indicate creative blocks or dependence on others.',
      keywords: ['creative block', 'dependence', 'smothering', 'lack of growth']
    },
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop'
  },
  {
    id: 4,
    name: 'The Emperor',
    arcana: 'major',
    upright: {
      meaning: 'Authority, establishment, structure',
      description: 'The Emperor represents authority, establishment, structure, a father figure.',
      keywords: ['authority', 'establishment', 'structure', 'father figure']
    },
    reversed: {
      meaning: 'Tyranny, rigidity, coldness',
      description: 'Reversed, The Emperor can indicate tyranny, rigidity, or coldness.',
      keywords: ['tyranny', 'rigidity', 'coldness', 'domination']
    },
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'
  }
];

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...majorArcana].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCardById = (id: number): TarotCard | undefined => {
  return majorArcana.find(card => card.id === id);
};
