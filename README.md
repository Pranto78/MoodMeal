<div align="center">

# 🍽️ MOODmeal

### *Eat what you feel. Feel what you eat.*

[![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **MOODmeal** is an intelligent mood-to-food recommendation app that tracks your emotional state and suggests the perfect meal to match — or improve — how you're feeling.

<br/>



</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [📱 Screenshots](#-screenshots)
- [🧠 How It Works](#-how-it-works)
- [🍱 Mood → Food Mapping](#-mood--food-mapping)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🧩 Components](#-components)
- [🔧 Configuration](#-configuration)
- [📊 Mood History & Insights](#-mood-history--insights)
- [🛣️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎭 **12 Mood Types** | From Happy & Energetic to Anxious & Stressed — cover every emotional state |
| 🍜 **Smart Food Suggestions** | AI-mapped food recommendations tailored to each mood |
| 📈 **Mood Tracking** | Log every mood check-in with timestamp and history |
| 📊 **Insights Dashboard** | Visualize your mood patterns over time with beautiful charts |
| 🌙 **Dark UI** | Sleek deep-navy glassmorphism design — easy on the eyes |
| ✨ **Smooth Animations** | Spring and fade animations using React Native Animated API |
| 🔔 **Craving Alerts** | Add food to your cravings list with one tap |
| 📱 **Cross Platform** | Works on both iOS and Android with platform-specific optimizations |

---


---

## 🧠 How It Works

MOODmeal follows a simple but powerful 3-step flow:

```
  You feel something
        │
        ▼
  🎭 Select Your Mood
  ┌─────────────────────────────────────┐
  │  Happy · Sad · Angry · Anxious      │
  │  Tired · Excited · Calm · Sick      │
  │  Energetic · Romantic · Thoughtful  │
  │  Stressed                           │
  └─────────────────────────────────────┘
        │
        ▼
  📦 Mood is Logged to History
  (timestamp + mood ID saved locally)
        │
        ▼
  🍱 Food Suggestions Appear
  (curated list mapped to your mood)
        │
        ▼
  😋 Order / Save Your Craving
```

### Mood Detection Logic

Each mood is defined in `constants/moods.ts` with:

```typescript
export interface Mood {
  id: string;        // unique identifier e.g. "happy"
  label: string;     // display name e.g. "Happy"
  emoji: string;     // visual emoji e.g. "😊"
  color: string;     // accent hex color e.g. "#FFD700"
  description: string; // short emotional context
}
```

The `MOOD_FOOD_MAP` links each mood ID to an array of food IDs:

```typescript
export const MOOD_FOOD_MAP: Record<string, string[]> = {
  happy:      ['pizza', 'ice-cream', 'burger', 'sushi'],
  sad:        ['chocolate', 'mac-cheese', 'soup', 'brownie'],
  angry:      ['spicy-ramen', 'hot-wings', 'tacos', 'curry'],
  anxious:    ['chamomile-tea', 'oatmeal', 'banana', 'yogurt'],
  tired:      ['coffee', 'energy-bowl', 'smoothie', 'avocado-toast'],
  excited:    ['sushi', 'tacos', 'bubble-tea', 'crepes'],
  calm:       ['salad', 'green-tea', 'fruit-bowl', 'hummus'],
  sick:       ['chicken-soup', 'ginger-tea', 'porridge', 'toast'],
  energetic:  ['protein-bowl', 'granola', 'steak', 'eggs'],
  romantic:   ['pasta', 'wine', 'chocolate-cake', 'oysters'],
  thoughtful: ['coffee', 'croissant', 'cheese', 'dark-chocolate'],
  stressed:   ['dark-chocolate', 'nuts', 'tea', 'banana'],
};
```

---

## 🍱 Mood → Food Mapping

Here's a full breakdown of every mood and its recommended foods, along with the *why* behind each suggestion:

### 😊 Happy
> Celebrate and share the joy!

- 🍕 Pizza — social, fun, crowd-pleasing
- 🍦 Ice Cream — sweet reward for good vibes
- 🍔 Burger — indulgent comfort food
- 🍣 Sushi — fresh, exciting, adventurous

---

### 😢 Sad
> Comfort food that wraps you in a hug.

- 🍫 Chocolate — triggers dopamine and serotonin
- 🧀 Mac & Cheese — warm, creamy, nostalgic
- 🍲 Soup — soothing, warming, gentle
- 🍫 Brownie — sweet emotional comfort

---

### 😠 Angry
> Channel that heat into bold, spicy flavors.

- 🍜 Spicy Ramen — satisfies aggressive energy
- 🍗 Hot Wings — bold and satisfying
- 🌮 Tacos — fun and distracting
- 🍛 Curry — rich, complex, immersive

---

### 😰 Anxious
> Calming foods that stabilize blood sugar and nerves.

- 🍵 Chamomile Tea — natural anxiety reducer
- 🥣 Oatmeal — slow-release energy, calming carbs
- 🍌 Banana — magnesium to relax muscles
- 🥛 Yogurt — gut-brain axis support

---

### 😴 Tired
> Fuel up and get your energy back.

- ☕ Coffee — caffeine boost
- 🥗 Energy Bowl — nutrient-dense, sustained energy
- 🥤 Smoothie — quick vitamins and minerals
- 🥑 Avocado Toast — healthy fats for brain energy

---

### 🎉 Excited
> Fun, vibrant foods to match your energy.

- 🍣 Sushi — adventurous and fresh
- 🌮 Tacos — fiesta vibes
- 🧋 Bubble Tea — fun and playful
- 🥞 Crepes — festive and delightful

---

### 😌 Calm
> Light, clean foods to maintain your zen.

- 🥗 Salad — light and refreshing
- 🍵 Green Tea — peaceful antioxidants
- 🍓 Fruit Bowl — natural sugars, no crash
- 🫓 Hummus & Pita — satisfying and grounding

---

### 🤒 Sick
> Gentle, healing foods your body needs.

- 🍲 Chicken Soup — anti-inflammatory, hydrating
- 🫚 Ginger Tea — nausea relief
- 🥣 Porridge — easy to digest
- 🍞 Toast — bland comfort for upset stomachs

---

### 💪 Energetic
> Power foods for your active self.

- 🥙 Protein Bowl — lean protein and complex carbs
- 🥜 Granola — energy-dense and nutritious
- 🥩 Steak — iron and high protein
- 🍳 Eggs — complete amino acid profile

---

### 🥰 Romantic
> Rich, indulgent foods to set the mood.

- 🍝 Pasta — classic, cozy, shareable
- 🍷 Wine — relaxing and sophisticated
- 🎂 Chocolate Cake — sweet and decadent
- 🦪 Oysters — legendary aphrodisiac

---

### 🤔 Thoughtful
> Foods for deep thinking and creativity.

- ☕ Coffee — sharpens focus
- 🥐 Croissant — relaxed intellectual fuel
- 🧀 Cheese — satisfying, encourages slow eating
- 🍫 Dark Chocolate — boosts brain blood flow

---

### 😤 Stressed
> Foods that lower cortisol and calm the body.

- 🍫 Dark Chocolate — reduces stress hormones
- 🥜 Mixed Nuts — magnesium + healthy fats
- 🍵 Herbal Tea — nervous system calmer
- 🍌 Banana — natural mood stabilizer

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) `npm install -g expo-cli`
- [Expo Go](https://expo.dev/go) app on your phone (for quick testing)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Pranto78/MoodMeal.git
cd MoodMeal

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

# 4. Scan QR code with Expo Go (Android) or Camera app (iOS)
```

### Running on Emulator

```bash
# Android Emulator
npx expo start --android

# iOS Simulator (macOS only)
npx expo start --ios

# Web browser
npx expo start --web
```

---

## 📁 Project Structure

```
MOODmeal/
│
├── .expo/                             # Expo internal config (auto-generated)
├── .vscode/                           # VS Code workspace settings
│
├── app/                               # Expo Router — all screens live here
│   ├── (tabs)/                        # Bottom tab navigator group
│   │   ├── _layout.tsx                # Tab bar layout & icons
│   │   ├── index.tsx                  # 🏠 Home Screen (mood selector + food suggestions)
│   │   ├── insights.tsx               # 📊 Insights Screen (mood history charts)
│   │   ├── foods.tsx                  # 🍱 Foods Browser
│   │   └── settings.tsx               # ⚙️ Settings Screen
│   └── _layout.tsx                    # Root app layout (fonts, theme, navigation)
│
├── assets/                            # Static assets (images, fonts, icons)
│
├── components/                        # Reusable UI components
│   ├── ui/                            # Low-level UI primitives
│   │   └── external-link.tsx          # Tappable external hyperlink
│   │
│   ├── FoodCard.tsx                   # 🍜 Food suggestion card with order button
│   ├── GlassCard.tsx                  # 🪟 Glassmorphism container card
│   ├── haptic-tab.tsx                 # Tab bar button with haptic feedback
│   ├── hello-wave.tsx                 # Animated waving hand component
│   ├── MoodChart.tsx                  # 📈 Bar + Pie chart for mood analytics
│   ├── MoodSelector.tsx               # 🎭 Mood grid with animated selection
│   ├── parallax-scroll-view.tsx       # Parallax hero scroll container
│   ├── SettingsToggle.tsx             # Toggle switch for settings options
│   ├── themed-text.tsx                # Theme-aware Text component
│   └── themed-view.tsx                # Theme-aware View component
│
├── constants/                         # App-wide static data & TypeScript types
│   ├── moods.ts                       # Mood definitions + Mood interface
│   ├── foods.ts                       # Food item data
│   └── moodFoodMap.ts                 # Mood ID → Food ID[] mapping
│
├── hooks/                             # Custom React hooks
│   └── useMoodHistory.ts              # Mood logging, retrieval & weekly stats
│
├── scripts/                           # Utility/build scripts
│
├── node_modules/                      # Dependencies (not committed)
├── .gitignore
├── app.json                           # Expo project configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project metadata & dependencies
```

---

## 🧩 Components

### `<MoodSelector />`

Displays a 4-column grid of mood buttons with animated selection states.

```tsx
<MoodSelector
  selectedMood={selectedMood}   // Currently selected Mood object or null
  onSelect={(mood) => {}}       // Callback when a mood is tapped
/>
```

**Features:**
- Pulse glow animation on selected mood using `Animated.loop`
- Press-in spring scale effect
- Dynamic border color and background tint per mood color

---

### `<FoodCard />`

Renders a single food suggestion with image, name, description and an order button.

```tsx
<FoodCard
  food={foodObject}             // Food item from FOODS constant
  accentColor="#FFD700"         // Color inherited from selected mood
  onOrder={() => {}}            // Callback for order/craving button
/>
```

---

### `<GlassCard />`

A reusable container with glassmorphism styling and optional glow border.

```tsx
<GlassCard
  glowColor="#00f5ff"           // Optional glow border color
  style={customStyle}           // Additional StyleSheet styles
>
  {children}
</GlassCard>
```

---

## 🔧 Configuration

### Adding a New Mood

1. Add the mood to `constants/moods.ts`:

```typescript
{
  id: 'nostalgic',
  label: 'Nostalgic',
  emoji: '🥹',
  color: '#C084FC',
  description: 'Feeling sentimental and reflective'
}
```

2. Add food suggestions to `constants/moodFoodMap.ts`:

```typescript
nostalgic: ['mac-cheese', 'grilled-cheese', 'childhood-cereal', 'home-fries']
```

---

### Adding a New Food

Add to `constants/foods.ts`:

```typescript
{
  id: 'grilled-cheese',
  name: 'Grilled Cheese',
  emoji: '🧀',
  description: 'Crispy, melty, nostalgic perfection',
  calories: 380,
  prepTime: '10 min',
  tags: ['comfort', 'quick', 'vegetarian']
}
```

---

## 📊 Mood History & Insights

MOODmeal uses `AsyncStorage` to persist mood logs locally on the device.

### Data Structure

Each mood log entry:

```typescript
interface MoodLog {
  id: string;         // UUID
  moodId: string;     // References Mood.id
  timestamp: number;  // Unix timestamp in ms
  date: string;       // ISO date string "YYYY-MM-DD"
}
```

### `useMoodHistory` Hook

```typescript
const { logMood, getMoodHistory, getWeeklyStats, clearHistory } = useMoodHistory();

// Log current mood
logMood('happy');

// Get all logs (sorted newest first)
const history = await getMoodHistory();

// Get aggregated stats for the last 7 days
const stats = await getWeeklyStats();
// Returns: { happy: 3, sad: 1, calm: 2, ... }
```

### Insights Screen

The Insights tab shows:

- 📅 **7-day mood frequency** bar chart
- 🏆 **Most frequent mood** this week
- 📆 **Mood log history** — scrollable timeline
- 🗑️ Option to clear history

---

## 🛣️ Roadmap

- [x] Core mood selection UI
- [x] Food suggestion engine
- [x] Mood history logging
- [x] Insights dashboard
- [ ] 🔔 Daily mood check-in push notifications
- [ ] 🤖 AI-powered personalized food descriptions
- [ ] 🌐 Online food ordering integration (Uber Eats / Foodpanda)
- [ ] 👤 User profiles with long-term mood analytics
- [ ] 🌍 Multi-language support
- [ ] 🍎 Apple Health / Google Fit integration
- [ ] 🌓 Light mode theme

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

Please follow the existing code style and make sure all TypeScript types are correct before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ and 🍕

*Because every meal should match your mood.*

</div>
