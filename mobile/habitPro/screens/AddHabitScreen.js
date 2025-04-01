import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AddHabitScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const addHabit = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('auth_token');
            if (!token) {
                Alert.alert('Error', 'User not authenticated');
                return;
            }
            const response = await axios.post('http://10.19.14.105:8000/api/habits/', {
                title,
                description,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 201) {
                Alert.alert('Error', 'Failed to add habit');
                return;
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding habit:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Text >Add New Habit</Text>
            <TextInput
                placeholder="Habit Title"
                value={title}
                onChangeText={setTitle} />

            <TextInput
                placeholder="Description"
                multiline
                value={description}
                onChangeText={setDescription} />

            <Button title="Add Habit" onPress={addHabit} />
        </View>
    )
}