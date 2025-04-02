import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateHabitScreen({ route, navigation }) {
    const { id } = route.params;
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchTokenAndHabit = async () => {
      const storedToken = await AsyncStorage.getItem('access_token');
      if (!storedToken) {
        Alert.alert('Sessão Expirada', 'Faça login novamente.');
        navigation.navigate('Login');
        return;
      }
      setToken(storedToken);
      fetchHabit(storedToken);
    };

    fetchTokenAndHabit();
  }, []);

  const fetchHabit = async (authToken) => {
    try {
      const response = await axios.get(`http://10.19.14.105:8000/api/items/${id}/`,
        {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setName(response.data.name);
    } catch (error) {
      console.error('Erro ao carregar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar o hábito.');
    } finally {
      setLoading(false);
    }
  };

  const updateHabit = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'O nome do hábito não pode estar vazio.');
      return;
    }

    try {
      await axios.put(
        `http://10.19.14.105:8000/api/items/${id}/`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Sucesso', 'Hábito atualizado com sucesso.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao atualizar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o hábito.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualizar Hábito</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do hábito"
        value={name || ''}
        onChangeText={setName}
      />
      <TouchableOpacity style={styles.button} onPress={updateHabit(id)}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
