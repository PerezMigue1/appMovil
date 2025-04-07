// IoTDashboard.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import { Client, Message } from 'react-native-paho-mqtt';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';
import MainLayout from '../components/MainLayout';

// 🔒 MQTT Config
const MQTT_BROKER = "wss://e1d8872f.ala.dedicated.aws.emqxcloud.com:8084/mqtt";
const CLIENT_ID = 'mqttx_d44d469a'; // 👈 Client ID fijo
const MQTT_OPTIONS = {
    userName: 'erisouo',
    password: '12dejulio',
};

// Temas MQTT
const TOPICS = {
    temperatura: "proyec/temperatura",
    humedad: "proyec/humedad",
    luz: "proyec/luz",
    modo: "proyec/modo",
    ventilador: "proyec/ventilador",
    bomba: "proyec/bomba",
    foco: "proyec/foco"
};

// 🧠 Almacenamiento local requerido por la librería
const myStorage = {
    setItem: (key, item) => {
        myStorage[key] = item;
        return Promise.resolve();
    },
    getItem: (key) => Promise.resolve(myStorage[key]),
    removeItem: (key) => {
        delete myStorage[key];
        return Promise.resolve();
    }
};

const IoTDashboard = () => {
    const [sensorData, setSensorData] = useState({ temperatura: 0, humedad: 0, luz: 0 });
    const [modo, setModo] = useState('Automático');
    const [ventilador, setVentilador] = useState(false);
    const [bomba, setBomba] = useState(false);
    const [foco, setFoco] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const newClient = new Client({
            uri: MQTT_BROKER,
            clientId: CLIENT_ID, // ✅ Usamos el ID fijo aquí
            storage: myStorage,
        });

        newClient.connect(MQTT_OPTIONS).then(() => {
            console.log('🔌 Conectado a MQTT');
            Object.values(TOPICS).forEach(topic => newClient.subscribe(topic));
            setClient(newClient);
        });

        newClient.on('connectionLost', (responseObject) => {
            if (responseObject.errorCode !== 0) {
                console.log('📴 Conexión perdida:', responseObject.errorMessage);
            }
        });

        newClient.on('messageReceived', (message) => {
            const topic = message.destinationName;
            const msg = message.payloadString;

            switch (topic) {
                case TOPICS.temperatura:
                    setSensorData(prev => ({ ...prev, temperatura: parseFloat(msg) }));
                    break;
                case TOPICS.humedad:
                    setSensorData(prev => ({ ...prev, humedad: parseFloat(msg) }));
                    break;
                case TOPICS.luz:
                    setSensorData(prev => ({ ...prev, luz: parseFloat(msg) }));
                    break;
                case TOPICS.modo:
                    setModo(msg);
                    break;
                case TOPICS.ventilador:
                    setVentilador(msg === '1');
                    break;
                case TOPICS.bomba:
                    setBomba(msg === '1');
                    break;
                case TOPICS.foco:
                    setFoco(msg === '1');
                    break;
            }
        });

        return () => {
            if (newClient.isConnected()) {
                newClient.disconnect();
            }
        };
    }, []);

    const publishCommand = (topic, value) => {
        if (!client) return Alert.alert("MQTT no conectado");

        const message = new Message(value);
        message.destinationName = topic;
        client.send(message);
        console.log(`📤 MQTT -> ${topic}: ${value}`);
    };

    const toggleModo = () => {
        const nuevoModo = modo === 'Automático' ? 'Manual' : 'Automático';
        setModo(nuevoModo);
        publishCommand(TOPICS.modo, nuevoModo);
    };

    const toggleActuador = (estado, setEstado, topic) => {
        const nuevo = !estado;
        setEstado(nuevo);
        publishCommand(topic, nuevo ? '1' : '0');
    };

    return (
        <MainLayout >
        <ScrollView contentContainerStyle={styles.container}>
            <Header />
            <Text style={styles.title}>Dashboard IoT</Text>

            <Text style={styles.subtitle}>Sensores</Text>
            <SensorCard icon="thermometer-half" label="Temperatura" value={`${sensorData.temperatura} °C`} color={sensorData.temperatura > 30 ? '#e74c3c' : '#3498db'} />
            <SensorCard icon="tint" label="Humedad" value={`${sensorData.humedad} %`} color={sensorData.humedad > 50 ? '#2980b9' : '#5dade2'} />
            <SensorCard icon="lightbulb" label="Luz" value={`${sensorData.luz} %`} color={sensorData.luz > 50 ? '#f1c40f' : '#7f8c8d'} />

            <Text style={styles.subtitle}>Modo</Text>
            <View style={styles.card}>
                <Icon name={modo === 'Automático' ? 'robot' : 'hand-paper'} size={50} color={modo === 'Automático' ? '#27ae60' : '#e74c3c'} />
                <Text style={styles.cardTitle}>{modo}</Text>
                <Text style={styles.value}>{modo === 'Automático' ? 'Sistema automático' : 'Control manual'}</Text>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: modo === 'Automático' ? '#3498db' : '#e74c3c' }]}
                    onPress={toggleModo}
                >
                    <Text style={styles.buttonText}>
                        {modo === 'Automático' ? 'Cambiar a Manual' : 'Cambiar a Automático'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Actuadores</Text>
            <ActuadorCard icon="fan" label="Ventilador" estado={ventilador} onToggle={() => toggleActuador(ventilador, setVentilador, TOPICS.ventilador)} />
            <ActuadorCard icon="water" label="Bomba" estado={bomba} onToggle={() => toggleActuador(bomba, setBomba, TOPICS.bomba)} />
            <ActuadorCard icon="lightbulb" label="Foco" estado={foco} onToggle={() => toggleActuador(foco, setFoco, TOPICS.foco)} />
        </ScrollView>
        </MainLayout>
    );
};

const SensorCard = ({ icon, label, value, color }) => (
    <View style={styles.card} >
        <Icon name={icon} size={50} color={color} />
        <Text style={styles.cardTitle}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const ActuadorCard = ({ icon, label, estado, onToggle }) => (
    <View style={styles.card}>
        <Icon name={icon} size={50} color={estado ? '#27ae60' : '#e74c3c'} />
        <Text style={styles.cardTitle}>{label}</Text>
        <Text style={styles.value}>{estado ? 'Encendido' : 'Apagado'}</Text>
        <TouchableOpacity
            style={[styles.button, { backgroundColor: estado ? '#3498db' : '#e74c3c' }]}
            onPress={onToggle}
        >
            <Text style={styles.buttonText}>{estado ? 'Apagar' : 'Encender'}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 0,
        margin: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    subtitle: {
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: '600',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default IoTDashboard;