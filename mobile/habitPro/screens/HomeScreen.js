import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);
  const [checkin, setCheckin] = useState()
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

      const response = await axios.delete(`http://192.168.0.167:8000/api/items/${id}/`, {
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

  const checkInHabit = async (habitId) => {
    try {
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      const response = await axios.post(
        'http://192.168.0.167:8000/api/checkins/',
        {
          habit: habitId,
          status: true, // ou false, dependendo do que você quiser registrar
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Check-in realizado:', response.data);
      Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer check-in:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível realizar o check-in.');
    }
  };

  const checkedTodayCount = habits.filter(habit => habit.is_checked_today).length;

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
          {habits.length} hábitos • {checkedTodayCount} completados hoje
        </Text>
      </View>
      <View style={styles.activitySection}>
        <Text style={styles.activityTitle}>Atividades de hoje</Text>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>
                  • {item.name}
                </Text>
                <View style={styles.iconGroup}>
                  <TouchableOpacity onPress={() => checkInHabit(item.id)}>
                    <MaterialIcons
                      name={item.is_checked_today ? 'check-circle' : 'radio-button-unchecked'}
                      size={28}
                      color={item.is_checked_today ? '#4CAF50' : '#aaa'}
                      style={styles.editIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('HabitDetail', { habitId: item.id })}>
                    <FontAwesome name="edit" size={30} color="green" style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteHabit(item.id)}>
                    <FontAwesome name="trash" size={32} color="#FF4500" style={styles.deleteIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
    backgroundColor: '#f5f5f5',
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    fontSize: 15,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginHorizontal: 10,
    paddingTop: 5
  },
  deleteIcon: {
    marginHorizontal: 10,

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