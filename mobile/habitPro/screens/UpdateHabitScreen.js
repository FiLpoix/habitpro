import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Editar Hábito</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Hábito:</Text>
          <TextInput
            style={styles.input}
            value={habit.name}
            onChangeText={(text) => {
              if (text.length <= 200) setHabit({ ...habit, name: text });
            }}
            multiline
            onContentSizeChange={(e) => {
              const height = e.nativeEvent.contentSize.height;
              setHabit((prev) => ({ ...prev, nameHeight: height }));
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            value={habit.description}
            onChangeText={(text) => {
              if (text.length <= 200) setHabit({ ...habit, description: text });
            }}
            multiline
            onContentSizeChange={(e) => {
              const height = e.nativeEvent.contentSize.height;
              setHabit((prev) => ({ ...prev, descriptionHeight: height }));
            }}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Voltar Para Tela Principal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#333',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
  },
  secondaryButton: {
    backgroundColor: '#333',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
});