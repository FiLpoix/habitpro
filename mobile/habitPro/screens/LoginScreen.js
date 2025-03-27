import {View, Text, Button} from 'react-native';
import React, { useState } from 'react';
import { useHabit } from '../context/ContextApi'

export default function LoginScreen({navigation}) {
    const [username, setUername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text>Login Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
}