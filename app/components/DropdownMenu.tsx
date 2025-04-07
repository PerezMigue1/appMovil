// components/DropdownMenu.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DropdownMenu = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState<any>(null);

    // Verificar si hay un usuario logueado
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('usuario');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };

        fetchUser();
    }, []);

    // Función para manejar el cierre de sesión
    const handleLogout = async () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que quieres cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Cerrar sesión", 
                    onPress: async () => {
                        await AsyncStorage.removeItem('usuario');
                        setUser(null);
                        navigation.navigate("Login");
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.menu}>
            {!user && ( // Mostrar solo si no hay usuario logueado
                <>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.menuItemText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => navigation.navigate("Registro")}
                    >
                        <Text style={styles.menuItemText}>Registrarte</Text>
                    </TouchableOpacity>
                </>
            )}
            {user && ( // Mostrar solo si hay usuario logueado
                <TouchableOpacity
                    style={[styles.menuItem, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Perfil")}
            >
                <Text style={styles.menuItemText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Productos")}
            >
                <Text style={styles.menuItemText}>Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("VincularIoT")}
            >
                <Text style={styles.menuItemText}>Vincular IoT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("IoTDashboard")}
            >
                <Text style={styles.menuItemText}>Dispositivo IoT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "#FFF",
        padding: 10,
        position: "absolute",
        top: 70, // Ajusta la posición debajo del header
        left: 15, // Alinea a la derecha
        elevation: 5, // Sombra en Android
        shadowColor: "#000", // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 10, // Bordes redondeados
        zIndex: 1000, // Asegura que esté por encima de otros elementos
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    menuItemText: {
        fontSize: 16,
        color: "#333",
    },
    logoutButton: {
        backgroundColor: "#FF0000", 
        borderRadius: 5, // Bordes redondeados
        marginTop: 10, // Espacio superior
    },
    logoutButtonText: {
        fontSize: 16,
        color: "#FFF", // Texto blanco
        textAlign: "center", // Centrar texto
    },
});

export default DropdownMenu;