import { View, Text, Button, Image, TouchableOpacity, FlatList, ImageBackground, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { FontAwesome } from '@expo/vector-icons';
import { useHabit } from '../context/ContextApi';
import api from '../services/api';

export default function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
        <View style={styles.header}>
        <FontAwesome name="user" size={24} color="white" style={styles.icon} />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Plan{`\n`}For Today</Text>
          <ProgressCircle
            style={{ height: 50, width: 50 }}
            progress={0.75}
            progressColor={'#f39c12'}
          />
          <Text style={styles.progressText}>4 of 5 Completed</Text>
        </View>
      </View>
      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>Today Activity</Text>
        <View style={styles.activityList}>
          <Text style={styles.activityItem}>• Task 1</Text>
          <Text style={styles.activityItem}>• Task 2</Text>
          <Text style={styles.activityItem}>• Task 3</Text>
        </View>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222' },
    header: { padding: 20, backgroundColor: '#111', alignItems: 'center' },
    icon: { alignSelf: 'flex-end' },
    card: { backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center' },
    cardTitle: { color: 'white', textAlign: 'center', marginBottom: 10 },
    progressText: { color: 'white', marginTop: 10 },
    activitySection: { backgroundColor: 'white', flex: 1, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    activityTitle: { fontSize: 16, fontWeight: 'bold' },
    activityList: { marginTop: 10 },
    activityItem: { fontSize: 14, marginVertical: 5 }
});