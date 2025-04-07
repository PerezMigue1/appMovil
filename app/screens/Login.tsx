import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../screens/UserContext"; // Ajusta la ruta según tu estructura

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin = async () => {
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("https://servidor-bbkq.vercel.app/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                // Actualizamos el contexto con el usuario
                setUser(data.usuario);
                // Guardar en AsyncStorage para persistencia
                await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
                navigation.navigate("Home"); // Navegar a la pantalla principal
            } else {
                setError(data.mensaje || "Correo o contraseña incorrectos.");
            }
        } catch (err) {
            setError("No se pudo conectar al servidor. Intenta nuevamente.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Text style={styles.label}>Correo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👀"}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={() => navigation.navigate("RecuperarContraseña")}
                >
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    card: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        height: 50,
    },
    eyeIcon: {
        fontSize: 20,
    },
    button: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    forgotPasswordButton: {
        alignItems: "center",
    },
    forgotPasswordText: {
        color: "#007bff",
        fontSize: 14,
        fontWeight: "500",
    },
    errorText: {
        color: "#dc3545",
        textAlign: "center",
        marginBottom: 15,
        fontSize: 14,
    },
});

export default Login;