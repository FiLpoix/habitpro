import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HabitDetailScreen({ route, navigation }) {
  const { habitId } = route.params;
  const [habit, setHabit] = useState(null);
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
      fetchHabitDetails(storedToken);
    };
    fetchToken();
  }, []);

  const fetchHabitDetails = async (authToken) => {
    try {
      const response = await axios.get(`http://192.168.0.167:8000/api/items/${habitId}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setHabit(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do hábito.');
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async () => {
    try {
      await axios.delete(`http://192.168.0.167:8000/api/items/${habitId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Sucesso', 'Hábito deletado com sucesso.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao deletar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível deletar o hábito.');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      {habit ? (
        <View style={styles.card}>
          <Text style={styles.title}>{habit.name}</Text>
          <Text style={styles.description}>{habit.description}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => navigation.navigate('Update', { id: habit.id })} style={styles.editButton}>
              <FontAwesome name="edit" size={20} color="green" />
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteHabit} style={styles.deleteButton}>
              <FontAwesome name="trash" size={20} color="red" />
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>Hábito não encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    backgroundColor: '#111',
  },
  card:{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#333',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#fff',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
