import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: "light" | "medium" | "strong";
}

export default function GlassCard({
  children,
  glowColor,
  intensity = "medium",
  style,
  ...props
}: GlassCardProps) {
  const bgOpacity =
    intensity === "light" ? 0.04 : intensity === "medium" ? 0.07 : 0.12;

return (
  <View
    style={[
      styles.container,
      {
        shadowColor: glowColor || "#00f5ff",
        shadowOpacity: glowColor ? 0.15 : 0.08,
      },
      style,
    ]}
    {...props}
  >
    <View style={styles.inner}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: `rgba(255,255,255,${bgOpacity})`,
            borderRadius: 20,
          },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    // overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    elevation: 8,
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  inner: {
  borderRadius: 20,
  overflow: "hidden",
},
});
