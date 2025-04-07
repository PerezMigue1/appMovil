import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Nosotros = () => {
    const [info, setInfo] = useState({ mision: "", vision: "", valores: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get("https://servidor-bbkq.vercel.app/mision-vision/ver")
            .then((response) => {
                setInfo(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
                setError("No se pudo cargar la información.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
                <Text style={styles.loadingText}>Cargando información...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Sección principal */}
                <View style={styles.background}>
                    {/* Título Central */}
                    <View style={styles.header}>
                        <Text style={styles.title}>🌱 ¿Quiénes Somos?</Text>
                        <Text style={styles.subtitle}>
                            En <Text style={styles.bold}>InvernaTech</Text>, fusionamos la tecnología con la
                            agricultura para crear soluciones inteligentes que optimicen la
                            producción y el uso sostenible de los recursos.
                        </Text>
                    </View>

                    {/* Tarjetas de Misión, Visión y Valores */}
                    <View style={styles.cardsContainer}>
                        {/* Misión */}
                        <View style={[styles.card, styles.cardMision]}>
                            <Text style={styles.cardTitle}>🌍 Nuestra Misión</Text>
                            <Text style={styles.cardText}>
                                {info.mision || "No disponible"}
                            </Text>
                        </View>

                        {/* Visión */}
                        <View style={[styles.card, styles.cardVision]}>
                            <Text style={styles.cardTitle}>🚀 Nuestra Visión</Text>
                            <Text style={styles.cardText}>
                                {info.vision || "No disponible"}
                            </Text>
                        </View>

                        {/* Valores */}
                        <View style={[styles.card, styles.cardValores]}>
                            <Text style={styles.cardTitle}>💡 Nuestros Valores</Text>
                            <Text style={styles.cardText}>
                                {info.valores || "No disponible"}
                            </Text>
                        </View>
                    </View>
                </View>
                <Footer />
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f0f0f0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#2E7D32",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    background: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    header: {
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2E7D32",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
    },
    bold: {
        fontWeight: "bold",
    },
    cardsContainer: {
        flexDirection: "column",
        gap: 20,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardMision: {
        backgroundColor: "#388E3C",
    },
    cardVision: {
        backgroundColor: "#1976D2",
    },
    cardValores: {
        backgroundColor: "#FF6F00",
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    footer: {
        backgroundColor: "#043200",
        padding: 20,
        alignItems: "center",
        marginTop: 30,
    },
    footerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    footerSubtext: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5,
    },
});

export default Nosotros;