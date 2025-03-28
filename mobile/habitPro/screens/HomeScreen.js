import { View, Text, Button, Image, TouchableOpacity, FlatList, ImageBackground, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useHabit } from '../context/ContextApi';
import api from '../services/api';

export default function HomeScreen({ navigation }) {

    return (
        <View>
            <ImageBackground
                source={require('../assets/gray.jpg')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover">
                    
                <Image source={require('../assets/profilePic.jpg')}
                    style={{ width: 50, height: 50, borderRadius: 20 }} />
                <Text>Home Screen</Text>

                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')} />

            </ImageBackground>

        </View>
    );
}