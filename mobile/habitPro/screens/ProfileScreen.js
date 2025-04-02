import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://10.19.14.113:8000/api/user');
                const { name, email } = response.data;
                setName(name);
                setEmail(email);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleUpdate = async () => {
        if (!name || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put('http://10.19.14.113:8000/api/user', {
                name,
                email,
                password,
            });
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            } else {
                Alert.alert('Erro', 'Não foi possível atualizar os dados.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar os dados.');
            console.error('Error updating user data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Perfil</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu nome"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua nova senha"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Atualizando...' : 'Salvar Alterações'}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 90,
        paddingHorizontal: 20, 
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32, 
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 30, 
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 25, 
    },
    label: {
        marginBottom: 10, 
        fontSize: 18, 
        color: '#555',
        fontWeight: '500',
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12, 
        paddingHorizontal: 20, 
        backgroundColor: '#f9f9f9',

    },
    button: {
        backgroundColor: '#555',
        height: 60, 
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, 
        borderWidth: 1,
        borderColor: '#777',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20, 
        fontWeight: 'bold',
    },
});