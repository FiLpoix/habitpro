import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (!storedToken) {
        Alert.alert('Sessão Expirada', 'Faça login novamente.');
        navigation.navigate('Login');
        return;
      }
      setToken(storedToken);
      fetchHabits(storedToken);
    };

    fetchToken();
  }, []);

  const fetchHabits = async (authToken) => {
    try {
      const response = await axios.get('http://192.168.0.167:8000/api/items/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setHabits(response.data);
    } catch (error) {
      console.error('Erro ao buscar hábitos:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os hábitos.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="white" />
        </TouchableOpacity>
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
          <Text>Carregando...</Text>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text style={styles.activityItem}>
                • {item.name}
              </Text>
            )} />
        )}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
          <Text style={styles.addButtonText}>Adicionar Hábito</Text>
        </TouchableOpacity>
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
  activityItem: {
    fontSize: 20,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
