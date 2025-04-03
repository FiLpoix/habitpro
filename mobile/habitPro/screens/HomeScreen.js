import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
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
      const response = await axios.get('http://10.19.14.105:8000/api/items/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Dados recebidos:', response.data);
      setHabits(response.data);
    } catch (error) {
      console.error('Erro ao buscar hábitos:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os hábitos.');
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    try {
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      const response = await axios.delete(`http://10.19.14.105:8000/api/items/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Hábito deletado:', response.data);
      Alert.alert('Sucesso', 'Hábito deletado com sucesso.');

      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error('Erro ao deletar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível deletar o hábito.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Achievements')} style={styles.badgeIcon}>
          <MaterialIcons name="emoji-events" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bem-vindo!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconContainer}>
          <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meu Plano{`\n`}Para Hoje</Text>
        <Text style={styles.progressText}>
          {habits.length} Habits
        </Text>
      </View>
      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>Today Activity</Text>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.activityItem}>
                  • {item.name}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('HabitDetail', {habitId: item.id})}>
                  <FontAwesome name="edit" size={20} color="blue" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
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
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badgeIcon: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#333',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#333',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: 'white',
    fontSize: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  activityItem: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
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
