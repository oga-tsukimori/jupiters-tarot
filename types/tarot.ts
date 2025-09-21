
export interface TarotCard {
  id: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'wands' | 'swords' | 'pentacles';
  number?: number;
  upright: {
    meaning: string;
    description: string;
    keywords: string[];
  };
  reversed: {
    meaning: string;
    description: string;
    keywords: string[];
  };
  imageUrl: string;
}

export interface TarotReading {
  id: string;
  date: Date;
  spread: SpreadType;
  cards: DrawnCard[];
  question?: string;
  notes?: string;
}

export interface DrawnCard {
  card: TarotCard;
  position: string;
  isReversed: boolean;
}

export type SpreadType = 'single' | 'three-card' | 'celtic-cross';

export interface SpreadConfig {
  name: string;
  description: string;
  positions: string[];
  layout: 'single' | 'row' | 'cross';
}
