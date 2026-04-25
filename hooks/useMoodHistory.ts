import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'moodmeal_mood_history';

export interface MoodEntry {
  moodId: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
}

export interface WeeklyStats {
  [moodId: string]: number;
}

export function useMoodHistory() {
  const [history, setHistory] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load mood history:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const logMood = useCallback(async (moodId: string) => {
    try {
      const now = new Date();
      const entry: MoodEntry = {
        moodId,
        timestamp: now.getTime(),
        date: now.toISOString().split('T')[0],
      };
      const newHistory = [...history, entry];
      setHistory(newHistory);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return true;
    } catch (e) {
      console.error('Failed to log mood:', e);
      return false;
    }
  }, [history]);

  const getWeeklyStats = useCallback((): WeeklyStats => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekEntries = history.filter((e) => e.timestamp >= weekAgo.getTime());

    const stats: WeeklyStats = {};
    weekEntries.forEach((entry) => {
      stats[entry.moodId] = (stats[entry.moodId] || 0) + 1;
    });
    return stats;
  }, [history]);

  const getDailyMoods = useCallback(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const result: { day: string; count: number; date: string }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = d.toISOString().split('T')[0];
      const count = history.filter((e) => e.date === dateStr).length;
      result.push({
        day: days[d.getDay()],
        count,
        date: dateStr,
      });
    }
    return result;
  }, [history]);

  const getTotalLogs = useCallback(() => {
    return history.length;
  }, [history]);

  const getMostCommonMood = useCallback(() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    history.forEach((e) => {
      counts[e.moodId] = (counts[e.moodId] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }, [history]);

  const clearHistory = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    } catch (e) {
      console.error('Failed to clear history:', e);
    }
  }, []);

  return {
    history,
    loading,
    logMood,
    getWeeklyStats,
    getDailyMoods,
    getTotalLogs,
    getMostCommonMood,
    clearHistory,
  };
}
