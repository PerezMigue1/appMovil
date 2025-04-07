import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { UserContext } from '../screens/UserContext'; // Ajusta la ruta según tu estructura
import MainLayout from '../components/MainLayout';
import Header from '../components/Header';

// URL de la API
const API_URL = 'https://servidor-bbkq.vercel.app/dispositivos/estado';

// Definición de tipos
interface Dispositivo {
    automatico: boolean;
    ventilador: boolean;
    bomba: boolean;
    foco: boolean;
}

interface User {
    email: string;
}

const ControlIoT = () => {
    const { user } = useContext(UserContext) as { user: User | null };
    const [dispositivo, setDispositivo] = useState<Dispositivo | null>(null);
    const [mensaje, setMensaje] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // Obtener datos del dispositivo al cargar el componente
    useEffect(() => {
        if (!user) return;

        axios.get(`${API_URL}?email=${user.email}`)
            .then(response => {
                setDispositivo(response.data);
                setLoading(false);
            })
            .catch(error => {
                setMensaje('Error al cargar datos del dispositivo');
                console.error(error);
                setLoading(false);
            });
    }, [user]);

    // Enviar comando al dispositivo
    const enviarComando = (comando: string) => {
        if (!dispositivo || !user) return;

        axios.post('https://servidor-bbkq.vercel.app/dispositivos/comando', {
            email: user.email,
            comando,
        })
            .then(() => {
                setMensaje(`Comando enviado: ${comando}`);
                // Actualizar el estado local del dispositivo
                switch (comando) {
                    case 'modo_auto':
                    case 'modo_manual':
                        setDispositivo({ ...dispositivo, automatico: !dispositivo.automatico });
                        break;
                    case 'ventilador_on':
                    case 'ventilador_off':
                        setDispositivo({ ...dispositivo, ventilador: !dispositivo.ventilador });
                        break;
                    case 'bomba_on':
                    case 'bomba_off':
                        setDispositivo({ ...dispositivo, bomba: !dispositivo.bomba });
                        break;
                    case 'foco_on':
                    case 'foco_off':
                        setDispositivo({ ...dispositivo, foco: !dispositivo.foco });
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                setMensaje('Error al enviar el comando');
                console.error(error);
            });
    };

    // Mostrar un indicador de carga mientras se obtienen los datos
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.texto}>Cargando datos del dispositivo...</Text>
            </View>
        );
    }

    // Mostrar un mensaje si no hay datos del dispositivo
    if (!dispositivo) {
        return (
            <View style={styles.container}>
                <Text style={styles.texto}>No se pudo cargar el dispositivo.</Text>
            </View>
        );
    }

    return (
        <MainLayout>
            <Header />
            <View style={styles.container}>
                <Text style={styles.titulo}>Control del Dispositivo IoT</Text>
                <Text style={styles.mensaje}>{mensaje}</Text>

                {/* Widget de Modo de Operación */}
                <View style={styles.widget}>
                    <Text style={styles.widgetTitle}>Modo de Operación</Text>
                    <Text style={styles.widgetState}>Estado: {dispositivo.automatico ? 'Automático' : 'Manual'}</Text>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => enviarComando(dispositivo.automatico ? 'modo_manual' : 'modo_auto')}
                    >
                        <Text style={styles.botonText}>Cambiar Modo</Text>
                    </TouchableOpacity>
                </View>

                {/* Widget de Ventilador */}
                <View style={styles.widget}>
                    <Text style={styles.widgetTitle}>Ventilador</Text>
                    <Text style={styles.widgetState}>Estado: {dispositivo.ventilador ? 'Encendido' : 'Apagado'}</Text>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => enviarComando(dispositivo.ventilador ? 'ventilador_off' : 'ventilador_on')}
                    >
                        <Text style={styles.botonText}>Cambiar</Text>
                    </TouchableOpacity>
                </View>

                {/* Widget de Bomba */}
                <View style={styles.widget}>
                    <Text style={styles.widgetTitle}>Bomba</Text>
                    <Text style={styles.widgetState}>Estado: {dispositivo.bomba ? 'Encendida' : 'Apagada'}</Text>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => enviarComando(dispositivo.bomba ? 'bomba_off' : 'bomba_on')}
                    >
                        <Text style={styles.botonText}>Cambiar</Text>
                    </TouchableOpacity>
                </View>

                {/* Widget de Foco */}
                <View style={styles.widget}>
                    <Text style={styles.widgetTitle}>Foco</Text>
                    <Text style={styles.widgetState}>Estado: {dispositivo.foco ? 'Encendido' : 'Apagado'}</Text>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => enviarComando(dispositivo.foco ? 'foco_off' : 'foco_on')}
                    >
                        <Text style={styles.botonText}>Cambiar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </MainLayout>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f9',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    mensaje: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    widget: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    widgetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    widgetState: {
        fontSize: 16,
        marginBottom: 10,
    },
    boton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    botonText: {
        color: '#fff',
        fontSize: 16,
    },
    texto: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ControlIoT;