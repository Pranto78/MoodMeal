import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Food } from '../constants/foods';

const { width } = Dimensions.get('window');

interface FoodCardProps {
  food: Food;
  accentColor?: string;
  onOrder?: () => void;
  compact?: boolean;
}

export default function FoodCard({
  food,
  accentColor = '#00f5ff',
  onOrder,
  compact = false,
}: FoodCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(0.92)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 6,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [food.id]);

  if (compact) {
    return (
      <Animated.View
        style={[
          styles.compactCard,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={{ uri: food.imageUrl }} style={styles.compactImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.compactGradient}
        />
        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>
            {food.name}
          </Text>
          <Text style={styles.compactCategory}>{food.category}</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
          shadowColor: accentColor,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: food.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(10,10,26,0.95)']}
          style={styles.imageGradient}
        />
        <View style={styles.categoryBadge}>
          <Text style={[styles.categoryText, { color: accentColor }]}>
            {food.category}
          </Text>
        </View>
        <View style={styles.caloriesBadge}>
          <Ionicons name="flame" size={12} color="#f97316" />
          <Text style={styles.caloriesText}>{food.calories}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.description}>{food.description}</Text>

        {onOrder && (
          <TouchableOpacity
            style={[styles.orderButton, { shadowColor: accentColor }]}
            onPress={onOrder}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[accentColor, `${accentColor}99`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.orderGradient}
            >
              <Ionicons name="restaurant" size={18} color="#0a0a1a" />
              <Text style={styles.orderText}>Eat This</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginBottom: 16,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '40%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  caloriesBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  caloriesText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#f97316',
  },
  info: {
    padding: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
    marginBottom: 16,
  },
  orderButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  orderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  orderText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0a0a1a',
    letterSpacing: 0.5,
  },
  // Compact styles for grid view
  compactCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    height: 180,
    flex: 1,
  },
  compactImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  compactGradient: {
    ...StyleSheet.absoluteFillObject,
    top: '35%',
  },
  compactInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  compactName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  compactCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
