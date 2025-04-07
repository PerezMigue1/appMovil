import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type User = {
    _id: string;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    telefono: string;
    email: string;
    sexo: string;
    edad: string | number; // Asegúrate de que la edad pueda ser string o number
};

const ModificarPerfil = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();

    // Estados para los campos editables
    const [nombre, setNombre] = useState<string>("");
    const [apellidoP, setApellidoP] = useState<string>("");
    const [apellidoM, setApellidoM] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [sexo, setSexo] = useState<string>("masculino"); // Estado para el sexo
    const [edad, setEdad] = useState<string>(""); // Estado para la edad (como string)

    // Obtener datos del usuario al cargar el componente
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await AsyncStorage.getItem("usuario");
                if (!userData) {
                    setLoading(false);
                    return;
                }

                const { _id } = JSON.parse(userData);

                const response = await fetch(`https://servidor-bbkq.vercel.app/usuarios/${_id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del perfil");
                }

                const userProfile = await response.json();
                setUser(userProfile);

                // Inicializar los estados con los datos del usuario
                setNombre(userProfile.nombre);
                setApellidoP(userProfile.apellidoP);
                setApellidoM(userProfile.apellidoM);
                setTelefono(userProfile.telefono);
                setEmail(userProfile.email);
                setSexo(userProfile.sexo || "masculino"); // Inicializar el sexo
                setEdad(userProfile.edad.toString()); // Convertir la edad a string
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setError("Error al cargar el perfil. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Guardar los cambios en el perfil
    const handleSave = async () => {
        if (!user) return;

        setSaving(true);
        try {
            const response = await fetch(`https://servidor-bbkq.vercel.app/usuarios/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    apellidoP,
                    apellidoM,
                    telefono,
                    email,
                    sexo,
                    edad: parseInt(edad, 10), // Convertir la edad a número antes de enviar
                }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el perfil");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);

            Alert.alert("Éxito", "Perfil actualizado correctamente.");
            navigation.goBack(); // Regresar a la pantalla anterior
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            Alert.alert("Error", "No se pudo actualizar el perfil. Inténtalo de nuevo.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <Header />
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.texto}>Cargando perfil...</Text>
                </View>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <Header />
                <View style={styles.container}>
                    <Text style={[styles.texto, { color: "red" }]}>{error}</Text>
                    <TouchableOpacity onPress={() => navigation.replace("ModificarPerfil")} style={styles.botonSimple}>
                        <Text style={styles.textoBoton}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.tarjeta}>
                    <Text style={styles.titulo}>Modificar Perfil</Text>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Nombre"
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Apellido Paterno:</Text>
                        <TextInput
                            style={styles.input}
                            value={apellidoP}
                            onChangeText={setApellidoP}
                            placeholder="Apellido Paterno"
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Apellido Materno:</Text>
                        <TextInput
                            style={styles.input}
                            value={apellidoM}
                            onChangeText={setApellidoM}
                            placeholder="Apellido Materno"
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Teléfono:</Text>
                        <TextInput
                            style={styles.input}
                            value={telefono}
                            onChangeText={setTelefono}
                            placeholder="Teléfono"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Sexo:</Text>
                        <Picker
                            selectedValue={sexo}
                            onValueChange={(itemValue) => setSexo(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Femenino" value="femenino" />
                        </Picker>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Edad:</Text>
                        <TextInput
                            style={styles.input}
                            value={edad}
                            onChangeText={setEdad}
                            placeholder="Edad"
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity onPress={handleSave} style={styles.botonGuardar} disabled={saving}>
                        {saving ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.textoBoton}>Guardar Cambios</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    tarjeta: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    campo: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    picker: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    botonGuardar: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    botonSimple: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 10,
    },
});

export default ModificarPerfil;