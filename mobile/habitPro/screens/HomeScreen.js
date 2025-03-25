import { View, Text, Button } from 'react-native';
import React from 'react';
import { useHabit } from '../context/ContextApi';

export default function HomeScreen({ navigation }) {
    const { data } = useHabit();
    {console.log(data);}
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')} />
        </View>
    );
}