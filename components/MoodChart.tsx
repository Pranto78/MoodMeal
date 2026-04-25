import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { MOODS } from "../constants/moods";
import GlassCard from "./GlassCard";

interface MoodChartProps {
  weeklyStats: Record<string, number>;
  dailyMoods: { day: string; count: number; date: string }[];
}

export default function MoodChart({ weeklyStats, dailyMoods }: MoodChartProps) {
  const barData = useMemo(() => {
    return dailyMoods.map((d) => ({
      value: d.count,
      label: d.day,
      frontColor:
        d.count > 3
          ? "#ec4899"
          : d.count > 2
            ? "#a855f7"
            : d.count > 1
              ? "#3b82f6"
              : "#00f5ff",
      gradientColor:
        d.count > 3
          ? "#ec489966"
          : d.count > 2
            ? "#a855f766"
            : d.count > 1
              ? "#3b82f666"
              : "#00f5ff66",
      topLabelComponent: () =>
        d.count > 0 ? <Text style={styles.barLabel}>{d.count}</Text> : null,
    }));
  }, [dailyMoods]);

  const pieData = useMemo(() => {
    const entries = Object.entries(weeklyStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    if (entries.length === 0) {
      return [{ value: 1, color: "#1a1a3e", text: "-" }];
    }

    return entries.map(([moodId, count]) => {
      const mood = MOODS.find((m) => m.id === moodId);
      return {
        value: count,
        color: mood?.color || "#3b82f6",
        text: mood?.emoji || "❓",
        focused: count === Math.max(...entries.map((e) => e[1])),
      };
    });
  }, [weeklyStats]);

  const totalEntries = Object.values(weeklyStats).reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>
      {/* Bar Chart */}
      <GlassCard glowColor="#3b82f6" style={styles.chartCard}>
        <View style={styles.cardContent}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Daily Activity</Text>
            <Text style={styles.chartSubtitle}>Last 7 days</Text>
          </View>
          <View style={styles.barChartContainer}>
            <BarChart
              data={barData}
              barWidth={28}
              noOfSections={4}
              barBorderRadius={8}
              frontColor="#00f5ff"
              yAxisThickness={0}
              xAxisThickness={1}
              xAxisColor="rgba(255,255,255,0.1)"
              yAxisTextStyle={styles.axisText}
              xAxisLabelTextStyle={styles.axisText}
              hideRules
              spacing={18}
              isAnimated
              animationDuration={800}
              maxValue={Math.max(...dailyMoods.map((d) => d.count), 4)}
              height={140}
              width={260}
            />
          </View>
        </View>
      </GlassCard>

      {/* Pie Chart */}
      <GlassCard glowColor="#a855f7" style={styles.chartCard}>
        <View style={styles.cardContent}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Mood Distribution</Text>
            <Text style={styles.chartSubtitle}>
              {totalEntries} total entries
            </Text>
          </View>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={pieData}
              donut
              radius={75}
              innerRadius={45}
              innerCircleColor="transparent"
              centerLabelComponent={() => (
                <View style={styles.pieCenter}>
                  <Text style={styles.pieCenterValue}>{totalEntries}</Text>
                  <Text style={styles.pieCenterLabel}>logs</Text>
                </View>
              )}
              isAnimated
              animationDuration={1000}
              showText
              textColor="#fff"
              textSize={16}
            />
            <View style={styles.pieLegend}>
              {Object.entries(weeklyStats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 4)
                .map(([moodId, count]) => {
                  const mood = MOODS.find((m) => m.id === moodId);
                  if (!mood) return null;
                  return (
                    <View key={moodId} style={styles.legendItem}>
                      <View
                        style={[
                          styles.legendDot,
                          { backgroundColor: mood.color },
                        ]}
                      />
                      <Text style={styles.legendEmoji}>{mood.emoji}</Text>
                      <Text style={styles.legendText}>{mood.label}</Text>
                      <Text style={styles.legendCount}>{count}</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  chartCard: {
    marginHorizontal: 0,
  },
  cardContent: {
    padding: 20,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  barChartContainer: {
    alignItems: "center",
    overflow: "hidden",
  },
  pieChartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  pieCenter: {
    alignItems: "center",
  },
  pieCenterValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },
  pieCenterLabel: {
    fontSize: 10,
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  pieLegend: {
    flex: 1,
    gap: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendEmoji: {
    fontSize: 16,
  },
  legendText: {
    fontSize: 12,
    color: "#94a3b8",
    flex: 1,
  },
  legendCount: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  axisText: {
    color: "#64748b",
    fontSize: 10,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
});
