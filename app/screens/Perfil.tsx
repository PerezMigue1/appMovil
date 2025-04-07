import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, Image, TouchableOpacity } from "react-native";
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
  edad: string;
  imagen?: string; // Agregar campo para la imagen del usuario
};

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

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
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("Error al cargar el perfil. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      setUser(null);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión. Inténtalo de nuevo.");
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
          <TouchableOpacity onPress={() => navigation.replace("Perfil")} style={styles.botonSimple}>
            <Text style={styles.textoBoton}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header />
      {user ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.tarjeta}>
            <Image
              source={user.imagen ? { uri: user.imagen } : require("../../assets/usuario.png")}
              style={styles.imagenUsuario}
            />
            <Text style={styles.titulo}>Perfil de Usuario</Text>

            <View style={styles.dato}>
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.valor}>{user.nombre}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Apellido Paterno:</Text>
              <Text style={styles.valor}>{user.apellidoP}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Apellido Materno:</Text>
              <Text style={styles.valor}>{user.apellidoM}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.valor}>{user.telefono}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.valor}>{user.email}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Sexo:</Text>
              <Text style={styles.valor}>{user.sexo}</Text>
            </View>

            <View style={styles.dato}>
              <Text style={styles.label}>Edad:</Text>
              <Text style={styles.valor}>{user.edad}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ModificarPerfil")} style={styles.botonSimple}>
              <Text style={styles.textoBoton}>Modificar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={[styles.botonSimple, { backgroundColor: "#ff4444" }]}>
              <Text style={styles.textoBoton}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Por favor, inicia sesión para ver tu perfil.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.botonSimple}>
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  imagenUsuario: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dato: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  valor: {
    fontSize: 16,
    color: "#333",
  },
  loginPrompt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  botonSimple: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Perfil;