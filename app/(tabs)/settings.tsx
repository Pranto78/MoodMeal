import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import GlassCard from '../../components/GlassCard';
import SettingsToggle from '../../components/SettingsToggle';
import { useMoodHistory } from '../../hooks/useMoodHistory';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const { clearHistory, getTotalLogs } = useMoodHistory();

  const handleClearHistory = () => {
    Alert.alert(
      '🗑️ Clear All Data',
      'This will permanently delete all your mood logs. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearHistory();
            Alert.alert('✅ Done', 'All mood data has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={['#0a0a1a', '#0d0d28', '#0a0a1a']}
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
            <Text style={styles.greeting}>SETTINGS</Text>
            <Text style={styles.headerTitle}>Preferences</Text>
          </View>

          {/* Profile Card */}
          <GlassCard glowColor="#00f5ff" style={styles.profileCard}>
            <View style={styles.profileContent}>
              <View style={styles.avatar}>
                <LinearGradient
                  colors={['#00f5ff', '#a855f7']}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>M</Text>
                </LinearGradient>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>MOODmeal User</Text>
                <Text style={styles.profileEmail}>mood@meal.app</Text>
              </View>
              <View style={styles.profileBadge}>
                <Text style={styles.profileBadgeText}>
                  {getTotalLogs()} logs
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Appearance */}
          <Text style={styles.sectionTitle}>Appearance</Text>
          <GlassCard style={styles.section}>
            <View style={styles.sectionContent}>
              <SettingsToggle
                label="Dark Mode"
                description="Futuristic dark theme (recommended)"
                value={darkMode}
                onToggle={setDarkMode}
                accentColor="#00f5ff"
              />
              <SettingsToggle
                label="Neon Accents"
                description="Enable glowing neon UI elements"
                value={true}
                onToggle={() => {}}
                accentColor="#a855f7"
              />
            </View>
          </GlassCard>

          {/* Notifications */}
          <Text style={styles.sectionTitle}>Notifications</Text>
          <GlassCard style={styles.section}>
            <View style={styles.sectionContent}>
              <SettingsToggle
                label="Push Notifications"
                description="Get mood check-in reminders"
                value={notifications}
                onToggle={setNotifications}
                accentColor="#ec4899"
              />
              <SettingsToggle
                label="Daily Reminder"
                description="Remind me to log my mood at 8 PM"
                value={dailyReminder}
                onToggle={setDailyReminder}
                accentColor="#f97316"
              />
            </View>
          </GlassCard>

          {/* Privacy */}
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          <GlassCard style={styles.section}>
            <View style={styles.sectionContent}>
              <SettingsToggle
                label="Analytics"
                description="Help improve the app with usage data"
                value={analytics}
                onToggle={setAnalytics}
                accentColor="#10b981"
              />
              <TouchableOpacity
                style={styles.dangerButton}
                onPress={handleClearHistory}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={18} color="#ef4444" />
                <Text style={styles.dangerText}>Clear All Mood Data</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <GlassCard style={styles.section}>
            <View style={styles.sectionContent}>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Version</Text>
                <Text style={styles.aboutValue}>1.0.0</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Build</Text>
                <Text style={styles.aboutValue}>Expo SDK 54</Text>
              </View>
              <View style={[styles.aboutRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.aboutLabel}>Made with</Text>
                <Text style={styles.aboutValue}>❤️ & 🍕</Text>
              </View>
            </View>
          </GlassCard>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerLogo}>MOODmeal</Text>
            <Text style={styles.footerText}>
              Track your moods. Discover your cravings.
            </Text>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '800',
    color: '#10b981',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  profileCard: {
    marginBottom: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0a0a1a',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileEmail: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  profileBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,245,255,0.12)',
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00f5ff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionContent: {
    padding: 20,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  dangerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  aboutLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerLogo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00f5ff',
    letterSpacing: 2,
    marginBottom: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#475569',
  },
  bottomPadding: {
    height: 20,
  },
});
