import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import Footer from "../components/Footer";

interface PoliticaData {
    politicaDeUso: string;
    politicaDePrivacidad: string;
    terminosYCondiciones: string;
}

const Politicas = () => {
    const [data, setData] = useState<PoliticaData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPoliticas = async () => {
            try {
                const res = await axios.get(
                    "https://servidor-bbkq.vercel.app/politicas/ver"
                );
                setData(res.data);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar la información.");
                setLoading(false);
            }
        };
        fetchPoliticas();
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
            <><Header />
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Sección principal con fondo degradado */}
                    <View style={styles.background}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Nuestras Políticas</Text>
                            <Text style={styles.headerSubtitle}>
                                Conoce los lineamientos que rigen nuestra plataforma y protegen tu
                                información.
                            </Text>
                        </View>

                        <View style={styles.cardsContainer}>
                            {/* Política de Uso */}
                            <TouchableOpacity
                                style={[styles.card, styles.cardUso]}
                                activeOpacity={0.9}
                            >
                                <Text style={styles.cardTitle}>Política de Uso</Text>
                                <Text style={styles.cardText}>{data?.politicaDeUso}</Text>
                            </TouchableOpacity>

                            {/* Política de Privacidad */}
                            <TouchableOpacity
                                style={[styles.card, styles.cardPrivacidad]}
                                activeOpacity={0.9}
                            >
                                <Text style={styles.cardTitle}>Política de Privacidad</Text>
                                <Text style={styles.cardText}>{data?.politicaDePrivacidad}</Text>
                            </TouchableOpacity>

                            {/* Términos y Condiciones */}
                            <TouchableOpacity
                                style={[styles.card, styles.cardTerminos]}
                                activeOpacity={0.9}
                            >
                                <Text style={styles.cardTitle}>Términos y Condiciones</Text>
                                <Text style={styles.cardText}>{data?.terminosYCondiciones}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Footer />
                </ScrollView></>
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
        backgroundColor: "linear-gradient(135deg, #043200, #0a3b17)",
    },
    header: {
        marginBottom: 30,
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2E7D32",
        textAlign: "center",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 10,
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
    cardUso: {
        backgroundColor: "#388E3C",
    },
    cardPrivacidad: {
        backgroundColor: "#1976D2",
    },
    cardTerminos: {
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

export default Politicas;