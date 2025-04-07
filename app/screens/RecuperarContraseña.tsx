import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RecuperarContraseña = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigation = useNavigation();

    // Paso 1: Obtener la pregunta secreta en base al email
    const handleEmailSubmit = async () => {
        setError("");
        try {
            const response = await axios.post(
                "https://servidor-bbkq.vercel.app/usuarios/recuperar-pregunta",
                { email }
            );
            if (response.data && response.data.pregunta) {
                setPregunta(response.data.pregunta);
                setStep(2);
            } else {
                setError("Correo no encontrado.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al obtener la pregunta secreta.");
        }
    };

    // Paso 2: Verificar la respuesta secreta
    const handleRespuestaSubmit = async () => {
        setError("");
        try {
            const response = await axios.post(
                "https://servidor-bbkq.vercel.app/usuarios/verificar-respuesta",
                { email, respuesta }
            );
            if (response.data && response.data.success) {
                setStep(3);
            } else {
                setError(response.data.mensaje || "Respuesta incorrecta.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al verificar la respuesta secreta.");
        }
    };

    // Paso 3: Cambiar la contraseña
    const handlePasswordSubmit = async () => {
        setError("");
        if (nuevaContraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        try {
            const response = await axios.post(
                "https://servidor-bbkq.vercel.app/usuarios/cambiar-contrasena",
                { email, nuevaContraseña }
            );
            if (response.data && response.data.success) {
                setSuccess("Contraseña actualizada exitosamente. Redirigiendo al login...");
                setTimeout(() => {
                    navigation.navigate("Login");
                }, 2000);
            } else {
                setError(response.data.mensaje || "Error al cambiar la contraseña.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al cambiar la contraseña.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? <Text style={styles.successText}>{success}</Text> : null}

            {step === 1 && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Correo Electrónico</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 2 && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Pregunta Secreta</Text>
                    <TextInput
                        style={styles.input}
                        value={pregunta}
                        editable={false}
                    />
                    <Text style={styles.label}>Respuesta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu respuesta"
                        value={respuesta}
                        onChangeText={setRespuesta}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRespuestaSubmit}>
                        <Text style={styles.buttonText}>Verificar Respuesta</Text>
                    </TouchableOpacity>
                </View>
            )}

            {step === 3 && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Nueva Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu nueva contraseña"
                        value={nuevaContraseña}
                        onChangeText={setNuevaContraseña}
                        secureTextEntry
                    />
                    <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirma tu nueva contraseña"
                        value={confirmarContraseña}
                        onChangeText={setConfirmarContraseña}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
                        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2E7D32",
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#2E7D32",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    successText: {
        color: "green",
        textAlign: "center",
        marginBottom: 10,
    },
});

export default RecuperarContraseña;