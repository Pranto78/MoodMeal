// Maps mood IDs to arrays of food IDs
export const MOOD_FOOD_MAP: Record<string, string[]> = {
  happy: ['ice-cream', 'pizza', 'smoothie-bowl'],
  sad: ['chocolate-cake', 'mac-cheese', 'ramen'],
  angry: ['hot-wings', 'tacos', 'pad-thai'],
  anxious: ['green-tea', 'soup', 'oatmeal'],
  tired: ['coffee', 'avocado-toast', 'energy-bowl'],
  excited: ['sushi', 'steak', 'champagne-cake'],
  calm: ['salad', 'herbal-tea', 'poke-bowl'],
  sick: ['chicken-soup', 'ginger-tea', 'congee'],
  energetic: ['smoothie', 'peanut-butter-toast', 'acai-bowl'],
  romantic: ['chocolate-fondue', 'pasta', 'wine-cheese'],
  thoughtful: ['dark-chocolate', 'grain-bowl', 'latte'],
  stressed: ['nachos', 'burger', 'fries'],
};

// Reverse map: food ID → mood IDs (for the Foods gallery)
export const FOOD_MOOD_MAP: Record<string, string[]> = {};
for (const [moodId, foodIds] of Object.entries(MOOD_FOOD_MAP)) {
  for (const foodId of foodIds) {
    if (!FOOD_MOOD_MAP[foodId]) {
      FOOD_MOOD_MAP[foodId] = [];
    }
    FOOD_MOOD_MAP[foodId].push(moodId);
  }
}
