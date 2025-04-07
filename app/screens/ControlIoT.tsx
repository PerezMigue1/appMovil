import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MainLayout from '../components/MainLayout';
import Header from '../components/Header';

// Cambia la IP a la del ESP32 y puerto 8080
const WEBSOCKET_URL = 'ws://192.168.252.128:8080';

const ControlIoT = () => {
  const [ws, setWs] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Estados para los actuadores y modo
  const [foco, setFoco] = useState(false);
  const [ventilador, setVentilador] = useState(false);
  const [bomba, setBomba] = useState(false);
  const [modoAuto, setModoAuto] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('Conectado al ESP32 vía WebSocket');
    };

    socket.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data);
      setMensaje(event.data);
      // Aquí podrías parsear si el ESP32 envía datos en JSON
    };

    socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
      setMensaje('Error en conexión WebSocket');
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const enviarComando = (comando) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(comando);
    } else {
      setMensaje('WebSocket no está conectado');
      Alert.alert('Error', 'WebSocket no está conectado');
    }
  };

  const toggleFoco = () => {
    const nuevoEstado = !foco;
    setFoco(nuevoEstado);
    enviarComando(nuevoEstado ? 'foco_on' : 'foco_off');
  };

  const toggleVentilador = () => {
    const nuevoEstado = !ventilador;
    setVentilador(nuevoEstado);
    enviarComando(nuevoEstado ? 'ventilador_on' : 'ventilador_off');
  };

  const toggleBomba = () => {
    const nuevoEstado = !bomba;
    setBomba(nuevoEstado);
    enviarComando(nuevoEstado ? 'bomba_on' : 'bomba_off');
  };

  const toggleModo = () => {
    const nuevoModo = !modoAuto;
    setModoAuto(nuevoModo);
    enviarComando(nuevoModo ? 'modo_auto' : 'modo_manual');
  };

  return (
    <MainLayout>
    <Header />
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Control del Dispositivo IoT</Text>
        <Text style={styles.message}>{mensaje}</Text>

        {/* Widget de Modo de Operación */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Modo de Operación</Text>
          <Text style={styles.widgetState}>Estado: {modoAuto ? 'Automático' : 'Manual'}</Text>
          <TouchableOpacity style={styles.button} onPress={toggleModo}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>

        {/* Widget de Ventilador */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Ventilador</Text>
          <Text style={styles.widgetState}>Estado: {ventilador ? 'Encendido' : 'Apagado'}</Text>
          <TouchableOpacity style={styles.button} onPress={toggleVentilador}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>

        {/* Widget de Bomba */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Bomba</Text>
          <Text style={styles.widgetState}>Estado: {bomba ? 'Encendida' : 'Apagada'}</Text>
          <TouchableOpacity style={styles.button} onPress={toggleBomba}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>

        {/* Widget de Foco */}
        <View style={styles.widget}>
          <Text style={styles.widgetTitle}>Foco</Text>
          <Text style={styles.widgetState}>Estado: {foco ? 'Encendido' : 'Apagado'}</Text>
          <TouchableOpacity style={styles.button} onPress={toggleFoco}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </MainLayout>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  widget: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ControlIoT;