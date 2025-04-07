import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import Footer from "../components/Footer";

const Ubicacion = () => {
    // Coordenadas de la UTHH de la Huasteca Hidalguense
    const initialRegion = {
        latitude: 21.1559357,
        longitude: -98.3836778,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Sección principal */}
                <View style={styles.background}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Nuestra Ubicación</Text>
                        <Text style={styles.subtitle}>
                            Visítanos en el corazón de la Huasteca Hidalguense, para conocer nuestras modernas instalaciones y programas innovadores.
                        </Text>
                    </View>

                    {/* Contenedor del mapa */}
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={initialRegion}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                        />
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#2E7D32",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        marginBottom: 20,
    },
    mapContainer: {
        width: "100%",
        height: 400,
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    map: {
        flex: 1,
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

export default Ubicacion;