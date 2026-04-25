export interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
  glowColor: string;
  description: string;
}

export const MOODS: Mood[] = [
  {
    id: 'happy',
    emoji: '😊',
    label: 'Happy',
    color: '#facc15',
    glowColor: 'rgba(250,204,21,0.3)',
    description: 'Feeling great and joyful',
  },
  {
    id: 'sad',
    emoji: '😢',
    label: 'Sad',
    color: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.3)',
    description: 'Feeling down and blue',
  },
  {
    id: 'angry',
    emoji: '😡',
    label: 'Angry',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.3)',
    description: 'Frustrated and upset',
  },
  {
    id: 'anxious',
    emoji: '😰',
    label: 'Anxious',
    color: '#f97316',
    glowColor: 'rgba(249,115,22,0.3)',
    description: 'Worried and tense',
  },
  {
    id: 'tired',
    emoji: '🥱',
    label: 'Tired',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.3)',
    description: 'Low energy, need rest',
  },
  {
    id: 'excited',
    emoji: '🎉',
    label: 'Excited',
    color: '#ec4899',
    glowColor: 'rgba(236,72,153,0.3)',
    description: 'Pumped up and thrilled',
  },
  {
    id: 'calm',
    emoji: '😌',
    label: 'Calm',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.3)',
    description: 'Peaceful and relaxed',
  },
  {
    id: 'sick',
    emoji: '🤒',
    label: 'Sick',
    color: '#6b7280',
    glowColor: 'rgba(107,114,128,0.3)',
    description: 'Under the weather',
  },
  {
    id: 'energetic',
    emoji: '💪',
    label: 'Energetic',
    color: '#00f5ff',
    glowColor: 'rgba(0,245,255,0.3)',
    description: 'Full of energy',
  },
  {
    id: 'romantic',
    emoji: '🥰',
    label: 'Romantic',
    color: '#f472b6',
    glowColor: 'rgba(244,114,182,0.3)',
    description: 'Feeling love in the air',
  },
  {
    id: 'thoughtful',
    emoji: '🤔',
    label: 'Thoughtful',
    color: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.3)',
    description: 'Deep in thought',
  },
  {
    id: 'stressed',
    emoji: '😤',
    label: 'Stressed',
    color: '#fb923c',
    glowColor: 'rgba(251,146,60,0.3)',
    description: 'Overwhelmed and pressured',
  },
];
