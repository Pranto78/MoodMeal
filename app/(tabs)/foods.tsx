import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import FoodCard from '../../components/FoodCard';
import { FOODS } from '../../constants/foods';
import { MOOD_FOOD_MAP, FOOD_MOOD_MAP } from '../../constants/moodFoodMap';
import { MOODS } from '../../constants/moods';

export default function FoodsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredFoods = useMemo(() => {
    if (!selectedFilter) return FOODS;
    const foodIds = MOOD_FOOD_MAP[selectedFilter] || [];
    return FOODS.filter((f) => foodIds.includes(f.id));
  }, [selectedFilter]);

  const getMoodTagsForFood = (foodId: string) => {
    const moodIds = FOOD_MOOD_MAP[foodId] || [];
    return moodIds
      .map((id) => MOODS.find((m) => m.id === id))
      .filter(Boolean);
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#0a0a1a', '#0d1025', '#0a0a1a']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>GALLERY</Text>
          <Text style={styles.headerTitle}>Food Collection</Text>
          <Text style={styles.headerSubtitle}>
            {filteredFoods.length} delicious options{' '}
            {selectedFilter ? `for ${MOODS.find(m => m.id === selectedFilter)?.label} mood` : 'across all moods'}
          </Text>
        </View>

        {/* Mood Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
          style={styles.chipsScroll}
        >
          <TouchableOpacity
            style={[
              styles.chip,
              !selectedFilter && styles.chipActive,
            ]}
            onPress={() => setSelectedFilter(null)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.chipText,
                !selectedFilter && styles.chipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.chip,
                selectedFilter === mood.id && {
                  ...styles.chipActive,
                  borderColor: mood.color,
                  backgroundColor: `${mood.color}18`,
                },
              ]}
              onPress={() =>
                setSelectedFilter(
                  selectedFilter === mood.id ? null : mood.id
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.chipEmoji}>{mood.emoji}</Text>
              <Text
                style={[
                  styles.chipText,
                  selectedFilter === mood.id && { color: mood.color },
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Food Grid */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {filteredFoods.map((food, index) => (
              <View key={food.id} style={styles.gridItem}>
                <FoodCard food={food} compact />
                <View style={styles.foodTags}>
                  {getMoodTagsForFood(food.id)
                    .slice(0, 2)
                    .map((mood) =>
                      mood ? (
                        <View
                          key={mood.id}
                          style={[
                            styles.tag,
                            { backgroundColor: `${mood.color}20` },
                          ]}
                        >
                          <Text style={styles.tagEmoji}>{mood.emoji}</Text>
                          <Text style={[styles.tagText, { color: mood.color }]}>
                            {mood.label}
                          </Text>
                        </View>
                      ) : null
                    )}
                </View>
              </View>
            ))}
          </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ec4899',
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
  chipsScroll: {
    maxHeight: 48,
    marginBottom: 4,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipActive: {
    borderColor: '#00f5ff',
    backgroundColor: 'rgba(0,245,255,0.12)',
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  chipTextActive: {
    color: '#00f5ff',
  },
  scroll: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
    flexGrow: 1,
    marginBottom: 4,
  },
  foodTags: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagEmoji: {
    fontSize: 10,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  bottomPadding: {
    height: 20,
  },
});
