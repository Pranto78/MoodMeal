import React from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { MOODS, Mood } from "../constants/moods";

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

function MoodButton({
  mood,
  isSelected,
  onPress,
}: {
  mood: Mood;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isSelected) {
      // Pulse animation for glow
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.4,
            duration: 1200,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    } else {
      glowAnim.stopAnimation();
      glowAnim.setValue(0);
    }
  }, [isSelected, glowAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  };

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255,255,255,0.08)", mood.color],
  });

  const shadowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.moodButtonWrapper,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.moodButton,
            {
              borderColor: isSelected ? mood.color : "rgba(255,255,255,0.08)",
              backgroundColor: isSelected
                ? `${mood.color}18`
                : "rgba(255,255,255,0.05)",
              shadowColor: mood.color,
              shadowOpacity: isSelected ? 0.4 : 0,
            },
          ]}
        >
          <View style={styles.emojiWrapper}>
  <Text style={styles.emoji}>{mood.emoji}</Text>
</View>
          <Text
            style={[
              styles.label,
              { color: isSelected ? mood.color : "#94a3b8" },
            ]}
          >
            {mood.label}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function MoodSelector({
  selectedMood,
  onSelect,
}: MoodSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {MOODS.map((mood) => (
          <MoodButton
            key={mood.id}
            mood={mood}
            isSelected={selectedMood?.id === mood.id}
            onPress={() => onSelect(mood)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  moodButtonWrapper: {
    width: "22%",
    minWidth: 72,
  },
  moodButton: {
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 12,
    elevation: 4,
  },
 emojiWrapper: {
  backgroundColor: 'transparent',
  marginBottom: 8,
  alignItems: 'center',
},
emoji: {
  fontSize: 32,
  backgroundColor: 'transparent',
},
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
