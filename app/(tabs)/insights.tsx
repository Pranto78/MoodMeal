import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import MoodChart from '../../components/MoodChart';
import GlassCard from '../../components/GlassCard';
import { useMoodHistory } from '../../hooks/useMoodHistory';
import { MOODS } from '../../constants/moods';

export default function InsightsScreen() {
  const {
    getWeeklyStats,
    getDailyMoods,
    getTotalLogs,
    getMostCommonMood,
  } = useMoodHistory();

  const weeklyStats = getWeeklyStats();
  const dailyMoods = getDailyMoods();
  const totalLogs = getTotalLogs();
  const mostCommonId = getMostCommonMood();
  const mostCommonMood = mostCommonId
    ? MOODS.find((m) => m.id === mostCommonId)
    : null;

  const weeklyTotal = Object.values(weeklyStats).reduce((a, b) => a + b, 0);

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#0a0a1a', '#100d2b', '#0a0a1a']}
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
            <Text style={styles.greeting}>INSIGHTS</Text>
            <Text style={styles.headerTitle}>Your Mood Journey</Text>
            <Text style={styles.headerSubtitle}>
              Discover patterns in how you feel and what you eat
            </Text>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <GlassCard glowColor="#00f5ff" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={styles.statIconWrap}>
                  <Ionicons name="pulse" size={20} color="#00f5ff" />
                </View>
                <Text style={styles.statValue}>{totalLogs}</Text>
                <Text style={styles.statLabel}>Total Logs</Text>
              </View>
            </GlassCard>

            <GlassCard glowColor="#a855f7" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(168,85,247,0.15)' }]}>
                  <Ionicons name="calendar" size={20} color="#a855f7" />
                </View>
                <Text style={styles.statValue}>{weeklyTotal}</Text>
                <Text style={styles.statLabel}>This Week</Text>
              </View>
            </GlassCard>

            <GlassCard glowColor="#ec4899" style={styles.statCard}>
              <View style={styles.statContent}>
                <View style={[styles.statIconWrap, { backgroundColor: 'rgba(236,72,153,0.15)' }]}>
                  <Text style={styles.statIcon}>
                    {mostCommonMood?.emoji || '—'}
                  </Text>
                </View>
                <Text style={styles.statValue}>
                  {mostCommonMood?.label || 'N/A'}
                </Text>
                <Text style={styles.statLabel}>Top Mood</Text>
              </View>
            </GlassCard>
          </View>

          {/* Charts */}
          <MoodChart weeklyStats={weeklyStats} dailyMoods={dailyMoods} />

          {/* Mood Streak */}
          <GlassCard glowColor="#10b981" style={styles.streakCard}>
            <View style={styles.streakContent}>
              <View style={styles.streakHeader}>
                <Ionicons name="trophy" size={24} color="#facc15" />
                <Text style={styles.streakTitle}>Mood Awareness</Text>
              </View>
              <Text style={styles.streakDesc}>
                {totalLogs === 0
                  ? 'Start logging your moods to see your streak!'
                  : totalLogs < 5
                  ? 'Great start! Keep logging to build your streak.'
                  : totalLogs < 15
                  ? 'You\'re building a great habit! Keep it up!'
                  : 'Amazing dedication to self-awareness! 🌟'}
              </Text>
              <View style={styles.streakProgress}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.streakDot,
                      {
                        backgroundColor:
                          totalLogs >= level * 3
                            ? '#10b981'
                            : 'rgba(255,255,255,0.08)',
                        shadowColor: totalLogs >= level * 3 ? '#10b981' : 'transparent',
                        shadowOpacity: totalLogs >= level * 3 ? 0.5 : 0,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </GlassCard>

          {/* Recent Activity */}
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Weekly Overview</Text>
          </View>

          <GlassCard style={styles.recentCard}>
            <View style={styles.recentContent}>
              {dailyMoods.map((day, idx) => (
                <View key={idx} style={styles.dayRow}>
                  <Text style={styles.dayName}>{day.day}</Text>
                  <View style={styles.dayBarTrack}>
                    <View
                      style={[
                        styles.dayBarFill,
                        {
                          width: `${Math.min((day.count / Math.max(...dailyMoods.map(d => d.count), 1)) * 100, 100)}%`,
                          backgroundColor:
                            day.count > 3
                              ? '#ec4899'
                              : day.count > 2
                              ? '#a855f7'
                              : day.count > 0
                              ? '#00f5ff'
                              : 'rgba(255,255,255,0.05)',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.dayCount}>{day.count}</Text>
                </View>
              ))}
            </View>
          </GlassCard>

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
    color: '#a855f7',
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0,245,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  streakCard: {
    marginTop: 16,
  },
  streakContent: {
    padding: 20,
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  streakTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  streakDesc: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
    marginBottom: 16,
  },
  streakProgress: {
    flexDirection: 'row',
    gap: 8,
  },
  streakDot: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  recentHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  recentCard: {},
  recentContent: {
    padding: 16,
    gap: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    width: 32,
  },
  dayBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  dayBarFill: {
    height: '100%',
    borderRadius: 4,
    minWidth: 2,
  },
  dayCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    width: 20,
    textAlign: 'right',
  },
  bottomPadding: {
    height: 20,
  },
});
