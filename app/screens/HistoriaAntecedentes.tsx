import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HistoriaAntecedentes = () => {
    const [historia, setHistoria] = useState("");
    const [antecedentes, setAntecedentes] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://servidor-bbkq.vercel.app/historial-antecedentes/ver")
            .then((response) => {
                if (response.data) {
                    setHistoria(response.data.historial);
                    setAntecedentes(response.data.antecedentes);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            })
            .finally(() => {
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

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Sección principal */}
                <View style={styles.background}>
                    <Text style={styles.title}>📜 Historia y Antecedentes</Text>
                    <Text style={styles.subtitle}>
                        Conoce más sobre nuestros orígenes y el camino que hemos recorrido en el
                        mundo de la tecnología agrícola.
                    </Text>

                    <View style={styles.cardsContainer}>
                        {/* Historia */}
                        <View style={[styles.card, styles.cardHistoria]}>
                            <Text style={styles.cardTitle}>📖 Nuestra Historia</Text>
                            <Text style={styles.cardText}>
                                {historia || "Cargando información..."}
                            </Text>
                        </View>

                        {/* Antecedentes */}
                        <View style={[styles.card, styles.cardAntecedentes]}>
                            <Text style={styles.cardTitle}>🏛️ Antecedentes</Text>
                            <Text style={styles.cardText}>
                                {antecedentes || "Cargando información..."}
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
    background: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#2E7D32",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
    },
    cardsContainer: {
        flexDirection: "column",
        gap: 20,
    },
    card: {
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardHistoria: {
        backgroundColor: "#2E7D32",
    },
    cardAntecedentes: {
        backgroundColor: "#8D6E63",
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
        textAlign: "justify",
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

export default HistoriaAntecedentes;