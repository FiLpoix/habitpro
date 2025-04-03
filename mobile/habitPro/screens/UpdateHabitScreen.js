import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateHabitScreen({ route, navigation }) {
  const { id } = route.params;
  const [habit, setHabit] = useState({ name: '', description: '' });
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
      const response = await axios.get(`http://192.168.0.167:8000/api/items/${id}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setHabit(response.data);
    } catch (error) {
      console.error('Erro ao buscar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do hábito.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.0.167:8000/api/items/${id}/`, habit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Sucesso', 'Hábito atualizado com sucesso.');
      navigation.navigate('HabitDetail', { habitId: id });
    } catch (error) {
      console.error('Erro ao atualizar hábito:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar o hábito.');
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
    <Text style={styles.headerTitle}>Editar Hábito</Text>
    <View style={styles.card}>
      <Text style={styles.label}>Nome do Hábito:</Text>
      <TextInput
        style={styles.input}
        value={habit.name}
        onChangeText={(text) => setHabit({ ...habit, name: text })}
      />
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={habit.description}
        onChangeText={(text) => setHabit({ ...habit, description: text })}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  paddingTop: 50,
  backgroundColor: '#111',
  alignItems: 'center',
},
headerTitle: {
  color: 'white',
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 20,
},
card: {
  backgroundColor: '#333',
  padding: 20,
  borderRadius: 10,
  width: '90%',
  alignItems: 'center',
},
label: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 5,
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 15,
  fontSize: 16,
  backgroundColor: 'white',
  width: '100%',
},
saveButton: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  width: '100%',
},
buttonText: {
  color: 'black',
  fontSize: 16,
  fontWeight: 'bold',
},
loadingText: {
  fontSize: 16,
  textAlign: 'center',
  marginTop: 20,
  color: 'white',
},
});
