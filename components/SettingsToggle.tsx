import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface SettingsToggleProps {
  label: string;
  description?: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  accentColor?: string;
}

export default function SettingsToggle({
  label,
  description,
  value,
  onToggle,
  accentColor = '#00f5ff',
}: SettingsToggleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: 'rgba(255,255,255,0.1)',
          true: `${accentColor}60`,
        }}
        thumbColor={value ? accentColor : '#64748b'}
        ios_backgroundColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  description: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 3,
  },
});
