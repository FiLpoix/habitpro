import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('http://10.19.14.105:8000/api/habits/');
      setHabits(response.data);
    } catch (error) {
      console.error('Erro ao buscar hábitos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user" size={24} color="white" style={styles.icon} />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Plan{`\n`}For Today</Text>
          <Text style={styles.progressText}>
            {habits.length} Habits
          </Text>
        </View>
      </View>
      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>Today Activity</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.activityItem}>
                • {item.title}
              </Text>
            )} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header: {
    padding: 20,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'flex-end',
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: 'white',
    marginTop: 10,
  },
  activitySection: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityList: {
    marginTop: 10,
  },
  activityItem: {
    fontSize: 20,
    marginVertical: 5,
  },
});