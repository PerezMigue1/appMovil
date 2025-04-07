import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";

const DetalleProducto = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { producto } = route.params; // Obtener los datos del producto
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('usuario');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  const handleComprarAhora = () => {
    if (user) {
      navigation.navigate("Compra", { producto });
    } else {
      Alert.alert(
        "Iniciar sesión requerido",
        "Debes iniciar sesión para realizar una compra.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Iniciar sesión", onPress: () => navigation.navigate("Login") }
        ]
      );
    }
  };

  const agregarAlCarrito = async () => {
    try {
      // Obtener el carrito actual de AsyncStorage
      const carritoActual = await AsyncStorage.getItem('carrito');
      let carrito = carritoActual ? JSON.parse(carritoActual) : [];

      // Verificar si el producto ya está en el carrito
      const productoExistente = carrito.find((item: any) => item._id === producto._id);
      if (productoExistente) {
        Alert.alert("Producto ya en el carrito", "Este producto ya ha sido agregado al carrito.");
        return;
      }

      // Agregar el producto al carrito
      carrito.push(producto);
      await AsyncStorage.setItem('carrito', JSON.stringify(carrito));

      Alert.alert("Éxito", "Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      Alert.alert("Error", "No se pudo agregar el producto al carrito");
    }
  };

  return (
    <MainLayout>
      <Header />
      <View style={styles.container}>
        {/* Tarjeta del Producto */}
        <View style={styles.card}>
          <Image source={{ uri: producto.imagenUrl }} style={styles.imagen} />
          <Text style={styles.nombre}>{producto.nombre}</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
          <Text style={styles.precio}>${producto.precio}</Text>
          <Text style={styles.stock}>Stock disponible: {producto.stock}</Text>

          <TouchableOpacity style={styles.botonComprar} onPress={handleComprarAhora}>
            <Text style={styles.botonComprarTexto}>Comprar Ahora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonAgregarCarrito} onPress={agregarAlCarrito}>
            <Text style={styles.botonAgregarCarritoTexto}>Agregar al Carrito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
            <Text style={styles.botonRegresarTexto}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  imagen: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 15,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
  },
  descripcion: {
    fontSize: 16,
    textAlign: "center",
    color: "#495057",
    marginVertical: 10,
  },
  precio: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
  },
  stock: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 15,
  },
  botonComprar: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  botonComprarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonAgregarCarrito: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  botonAgregarCarritoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonRegresar: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  botonRegresarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DetalleProducto;