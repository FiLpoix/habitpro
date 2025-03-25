import {View, Text, Button} from 'react-native';
import React from 'react';

export default function LoginScreen({navigation}) {
    return (
        <View>
            <Text>Login Screen</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')} />
        </View>
    );
}