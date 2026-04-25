import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import MoodSelector from '../../components/MoodSelector';
import FoodCard from '../../components/FoodCard';
import GlassCard from '../../components/GlassCard';
import { Mood } from '../../constants/moods';
import { FOODS } from '../../constants/foods';
import { MOOD_FOOD_MAP } from '../../constants/moodFoodMap';
import { useMoodHistory } from '../../hooks/useMoodHistory';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showFoods, setShowFoods] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(40)).current;
  const { logMood } = useMoodHistory();

  const handleMoodSelect = useCallback(
    (mood: Mood) => {
      setSelectedMood(mood);
      setShowFoods(true);

      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(40);

      // Log the mood
      logMood(mood.id);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          speed: 14,
          bounciness: 4,
          useNativeDriver: true,
        }),
      ]).start();
    },
    [fadeAnim, slideAnim, logMood]
  );

  const getSuggestedFoods = () => {
    if (!selectedMood) return [];
    const foodIds = MOOD_FOOD_MAP[selectedMood.id] || [];
    return foodIds
      .map((id) => FOODS.find((f) => f.id === id))
      .filter(Boolean) as typeof FOODS;
  };

  const handleOrder = (foodName: string) => {
    Alert.alert(
      '🍽️ Great Choice!',
      `${foodName} has been added to your cravings! Time to treat yourself.`,
      [{ text: 'Yummy! 😋', style: 'default' }]
    );
  };

  const suggestedFoods = getSuggestedFoods();

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#0a0a1a', '#0d0d2b', '#0a0a1a']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>MOODmeal</Text>
            <Text style={styles.headerTitle}>How are you feeling?</Text>
            <Text style={styles.headerSubtitle}>
              Pick your mood and we'll suggest the perfect food for you
            </Text>
          </View>

          {/* Mood Selector */}
          <MoodSelector
            selectedMood={selectedMood}
            onSelect={handleMoodSelect}
          />

          {/* Selected Mood Feedback */}
          {selectedMood && showFoods && (
            <Animated.View
              style={[
                styles.feedbackSection,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <GlassCard
                glowColor={selectedMood.color}
                style={styles.feedbackCard}
              >
                <View style={styles.feedbackContent}>
                  <Text style={styles.feedbackEmoji}>{selectedMood.emoji}</Text>
                  <View style={styles.feedbackText}>
                    <Text style={styles.feedbackTitle}>
                      Feeling {selectedMood.label}
                    </Text>
                    <Text style={styles.feedbackDesc}>
                      {selectedMood.description}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.moodLogged,
                      { backgroundColor: `${selectedMood.color}20` },
                    ]}
                  >
                    <Text
                      style={[styles.moodLoggedText, { color: selectedMood.color }]}
                    >
                      ✓ Logged
                    </Text>
                  </View>
                </View>
              </GlassCard>

              {/* Food Suggestions */}
              <View style={styles.suggestionsHeader}>
                <Text style={styles.suggestionsTitle}>
                  Perfect foods for you
                </Text>
                <Text style={styles.suggestionsCount}>
                  {suggestedFoods.length} suggestions
                </Text>
              </View>

              {suggestedFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  accentColor={selectedMood.color}
                  onOrder={() => handleOrder(food.name)}
                />
              ))}
            </Animated.View>
          )}

          {/* Empty State */}
          {!selectedMood && (
            <GlassCard style={styles.emptyCard}>
              <View style={styles.emptyContent}>
                <Text style={styles.emptyEmoji}>🍽️</Text>
                <Text style={styles.emptyTitle}>Your meal awaits</Text>
                <Text style={styles.emptyDesc}>
                  Select a mood above to discover your perfect food match
                </Text>
              </View>
            </GlassCard>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00f5ff',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  feedbackSection: {
    marginTop: 24,
  },
  feedbackCard: {
    marginBottom: 20,
  },
  feedbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  feedbackEmoji: {
    fontSize: 40,
  },
  feedbackText: {
    flex: 1,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  feedbackDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 3,
  },
  moodLogged: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  moodLoggedText: {
    fontSize: 11,
    fontWeight: '700',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  suggestionsCount: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  emptyCard: {
    marginTop: 30,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
});
