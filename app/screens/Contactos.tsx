// screens/Contactos.tsx
import React from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import FormularioContacto from "../components/FormularioContacto";
import Footer from "../components/Footer";

const Contactos: React.FC = () => {
  const navigation = useNavigation();

  const handleFormSubmit = async (datos: { nombre: string; correo: string; asunto: string; mensaje: string }) => {
    const datosFormulario = {
      ...datos,
      estado: "pendiente", // Estado predeterminado
    };

    console.log("Datos a enviar:", datosFormulario); // Depuración

    try {
      const respuesta = await fetch("http://192.168.131.189:5000/api/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFormulario),
      });

      console.log("Respuesta del servidor:", respuesta); // Depuración

      if (!respuesta.ok) {
        throw new Error(`Error al enviar el formulario: ${respuesta.status}`);
      }

      const datosRespuesta = await respuesta.json();
      console.log("Respuesta del servidor:", datosRespuesta); // Depuración
      Alert.alert("Éxito", "Tu mensaje ha sido enviado correctamente.");
    } catch (error) {
      console.error("Error al enviar el formulario:", error); // Depuración
      Alert.alert("Error", "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.");
    }
  };

  return (
    <MainLayout>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Información de contacto */}
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contacto</Text>
          <View style={styles.contactItem}>
            <MaterialIcons name="place" size={24} color="#2E86C1" />
            <Text style={styles.contactText}>Calle Continuación Felipe Ángeles #58 - Local 2, Huejutla de Reyes, Hidalgo</Text>
          </View>
          <View style={styles.contactItem}>
            <MaterialIcons name="phone" size={24} color="#2E86C1" />
            <Text style={styles.contactText}>+52 771229172</Text>
          </View>
          <View style={styles.contactItem}>
            <MaterialIcons name="email" size={24} color="#2E86C1" />
            <Text style={styles.contactText}>InvernaTech@gmail.com</Text>
          </View>
        </View>

        {/* Formulario de contacto */}
        <FormularioContacto onSubmit={handleFormSubmit} />


        <View style={styles.footerWrapper}>
          <Footer />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 0, // Elimina el padding inferior para que el Footer no tenga espacio extra
  },
  contactContainer: {
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E86C1",
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  footerWrapper: {
    padding: 0,
    marginLeft: -20, // Compensa el padding del ScrollView
    marginRight: -40, // Compensa el padding del ScrollView
  },
});

export default Contactos;