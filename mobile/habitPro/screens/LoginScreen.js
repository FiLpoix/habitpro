import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`http://10.19.14.105:8000/auth/login/`, {
                username,
                password,
            });
            if (response.status === 200) {
                // Salvar o token no AsyncStorage
                const { token } = response.data;

                await AsyncStorage.setItem('auth_token', token);
                console.log('Token salvo:', token);

                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', 'Login falhou. Verifique suas credenciais.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
            console.error('Error during login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={[styles.button, loading && { backgroundColor: '#aaa' }]}
                onPress={handleLogin}
                disabled={loading} >
                <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});