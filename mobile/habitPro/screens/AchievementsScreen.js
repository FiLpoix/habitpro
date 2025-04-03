import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AchievementsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleF}> A PERSISTÊNCIA {`\n`}LEVA AO SUCESSO!!</Text>
      <Text style={styles.title}>MINHAS INSÍGNIAS</Text>
      <Text style={styles.description}>Aqui estão suas conquistas!</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
    },
    titleF: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        marginTop: 20,
        padding:40,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    backButton: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
    middleContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});