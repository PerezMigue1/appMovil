import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../screens/UserContext';

const API_URL = "https://servidor-bbkq.vercel.app/dispositivos";

const VincularIoT = () => {
    const { user } = useContext(UserContext);
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [ip, setIp] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        if (!user) return;

        axios.get(`${API_URL}/estado?email=${user.email}`)
            .then(response => {
                if (response.data) {
                    navigation.navigate('IoTDashboard');
                }
            })
            .catch(error => {
                if (error.response && error.response.status !== 404) {
                    setMensaje('Error al verificar el dispositivo');
                }
            });
    }, [user, navigation]);

    const handleVincular = async () => {
        if (!nombre || !ip) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/vincular`, {
                nombre,
                ip,
                email: user.email,
            });

            if (response.status === 200) {
                navigation.navigate('IoTDashboard');
            } else {
                setMensaje(response.data.mensaje || 'Error al vincular dispositivo');
            }
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || 'Error al conectar con el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Vincular Dispositivo IoT</Text>
                <TextInput
                    placeholder="Nombre del dispositivo"
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    placeholder="Dirección IP"
                    style={styles.input}
                    value={ip}
                    onChangeText={setIp}
                />
                {mensaje ? <Text style={styles.error}>{mensaje}</Text> : null}
                <TouchableOpacity style={styles.button} onPress={handleVincular}>
                    <Text style={styles.buttonText}>Vincular</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#228B22',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 12,
        width: 350,
        alignItems: 'center',
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#228B22',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default VincularIoT;