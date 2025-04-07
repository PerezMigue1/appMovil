// components/FormularioContacto.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Boton from "./Boton";

type FormularioContactoProps = {
    onSubmit: (datos: { nombre: string; correo: string; asunto: string; mensaje: string }) => void;
};

const FormularioContacto: React.FC<FormularioContactoProps> = ({ onSubmit }) => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [asunto, setAsunto] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = () => {
        if (!nombre || !correo || !asunto || !mensaje) {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        onSubmit({ nombre, correo, asunto, mensaje });
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Envíanos un mensaje</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Asunto"
                value={asunto}
                onChangeText={setAsunto}
            />
            <TextInput
                style={[styles.input, styles.mensajeInput]}
                placeholder="Mensaje"
                value={mensaje}
                onChangeText={setMensaje}
                multiline
                numberOfLines={4}
            />

            <Boton
                    titulo="Enviar"
                    onPress={handleSubmit}
                    variante="secundario"
                />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2E86C1",
        marginBottom: 10,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#CCC",
    },
    mensajeInput: {
        height: 100,
        textAlignVertical: "top",
    },
    botonEnviar: {
        backgroundColor: "#2E86C1",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
    },
    botonTexto: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default FormularioContacto;
