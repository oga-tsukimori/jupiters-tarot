
import { SpreadConfig } from '../types/tarot';

export const spreads: Record<string, SpreadConfig> = {
  single: {
    name: 'Single Card',
    description: 'Draw one card for quick insight or daily guidance',
    positions: ['Your guidance'],
    layout: 'single'
  },
  'three-card': {
    name: 'Three Card Spread',
    description: 'Past, Present, and Future insights',
    positions: ['Past', 'Present', 'Future'],
    layout: 'row'
  },
  'celtic-cross': {
    name: 'Celtic Cross',
    description: 'A comprehensive 10-card spread for deep insight',
    positions: [
      'Present Situation',
      'Challenge',
      'Distant Past',
      'Recent Past',
      'Possible Outcome',
      'Near Future',
      'Your Approach',
      'External Influences',
      'Hopes and Fears',
      'Final Outcome'
    ],
    layout: 'cross'
  }
};
