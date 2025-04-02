import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AddHabitScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const addHabit = async () => {
        if (!title || !description) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('access_token');

            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado');
                console.log('Erro', 'Usuário não autenticado');
                // navigation.replace('Login');
                return;
            }

            const response = await axios.post(
                'http://192.168.0.167:8000/api/items/',
                {
                    name: title,
                    description
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 201) {
                Alert.alert('Sucesso', 'Hábito adicionado com sucesso!');
                setTitle('');
                setDescription('');
                navigation.goBack();
            } else {
                Alert.alert('Erro', 'Não foi possível adicionar o hábito');
            }
        } catch (error) {
            console.error('Erro ao adicionar hábito:', error.response?.data || error.message);
            Alert.alert('Erro', 'Ocorreu um erro ao adicionar o hábito.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Novo Hábito</Text>

            <TextInput
                style={styles.input}
                placeholder="Título do Hábito"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Descrição"
                multiline
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                style={[styles.button, loading && { backgroundColor: '#888' }]}
                onPress={addHabit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Adicionando..." : "Adicionar Hábito"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});
