import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";

const ConfirmacionCompra = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { compra } = route.params;

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titulo}>¡Compra Exitosa!</Text>
                <Text style={styles.subtitulo}>Detalles de la compra:</Text>
                <Text style={styles.texto}>ID de la compra: {compra._id}</Text>
                <Text style={styles.texto}>Total: ${compra.total}</Text>
                <Text style={styles.texto}>Fecha: {new Date(compra.fecha_venta).toLocaleDateString()}</Text>

                <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate("Carrito")}>
                    <Text style={styles.botonVolverTexto}>Volver al Inicio</Text>
                </TouchableOpacity>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
    },
    botonVolver: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    botonVolverTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ConfirmacionCompra;