// components/Footer.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // Para gradientes

const Footer = () => {
    const navigation = useNavigation();

    const abrirRedSocial = (url: string) => {
        Linking.openURL(url).catch((err) =>
            console.error("Error al abrir la red social:", err)
        );
    };

    return (
        <View style={styles.container}>
            {/* Logo y nombre de la app */}
            <View style={styles.brandContainer}>
                <View style={styles.logoContainer}>
                    <MaterialIcons name="eco" size={30} color="#2ecc71" />
                </View>
                <LinearGradient
                    colors={["#2ecc71", "#27ae60"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientTextContainer}
                >
                    <Text style={styles.titulo}>INVERNATECH</Text>
                </LinearGradient>
            </View>
            <Text style={styles.subtitulo}>Innovación y tecnología para la agricultura sostenible.</Text>

            {/* Secciones */}
            <View style={styles.seccionesContainer}>
                {/* Sección Quiénes Somos */}
                <View style={styles.seccion}>
                    <Text style={styles.seccionTitulo}>Quiénes Somos</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Nosotros")}>
                        <Text style={styles.enlace}>Misión y Visión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("HistoriaAntecedentes")}>
                        <Text style={styles.enlace}>Nuestra Historia y Antecedentes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Politicas")}>
                        <Text style={styles.enlace}>Políticas</Text>
                    </TouchableOpacity>
                </View>

                {/* Sección Contacto */}
                <View style={styles.seccion}>
                    <Text style={styles.seccionTitulo}>Contacto</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Contactos")}>
                        <Text style={styles.enlace}>Contáctanos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("PreguntasFrecuentes")}>
                        <Text style={styles.enlace}>Preguntas Frecuentes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Ubicacion")}>
                        <Text style={styles.enlace}>Ubicación</Text>
                    </TouchableOpacity>
                </View>

                {/* Sección Síguenos */}
                <View style={styles.seccion}>
                    <Text style={styles.seccionTitulo}>Síguenos</Text>
                    <View style={styles.redesSociales}>
                        <TouchableOpacity onPress={() => abrirRedSocial("https://facebook.com")}>
                            <MaterialIcons name="facebook" size={24} color="#3b5998" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirRedSocial("https://x.com")}>
                            <Icons name="X" size={24} color="#1da1f2" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirRedSocial("https://instagram.com")}>
                            <Icons name="instagram" size={24} color="#e1306c" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => abrirRedSocial("https://linkedin.com")}>
                            <Icons name="linkedin" size={24} color="#0077b5" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#052300",
        padding: 20,
        borderTopWidth: 4,
        borderTopColor: "#2ecc71",
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(46, 204, 113, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    gradientTextContainer: {
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white", // Texto visible sobre el gradiente
    },
    subtitulo: {
        fontSize: 14,
        color: "#a8e6bc",
        textAlign: "center",
        marginBottom: 20,
    },
    seccionesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    seccion: {
        width: "49%", // Dos columnas
        marginBottom: 20,
    },
    seccionTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    enlace: {
        fontSize: 14,
        color: "#fff",
        marginBottom: 5,
    },
    redesSociales: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default Footer;