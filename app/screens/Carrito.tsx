import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";

const Carrito = () => {
    const navigation = useNavigation();
    const [productos, setProductos] = useState<any[]>([]);

    useEffect(() => {
        const fetchCarrito = async () => {
            const carrito = await AsyncStorage.getItem('carrito');
            if (carrito) {
                setProductos(JSON.parse(carrito));
            }
        };

        fetchCarrito();
    }, []);

    // Función para aumentar la cantidad de un producto
    const aumentarCantidad = (id: string) => {
        const nuevosProductos = productos.map((producto) =>
            producto._id === id ? { ...producto, cantidad: (producto.cantidad || 1) + 1 } : producto
        );
        setProductos(nuevosProductos);
        AsyncStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    };

    // Función para disminuir la cantidad de un producto
    const disminuirCantidad = (id: string) => {
        const nuevosProductos = productos.map((producto) =>
            producto._id === id && producto.cantidad > 1
                ? { ...producto, cantidad: producto.cantidad - 1 }
                : producto
        );
        setProductos(nuevosProductos);
        AsyncStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    };

    // Función para eliminar un producto del carrito
    const eliminarProducto = (id: string) => {
        const nuevosProductos = productos.filter((producto) => producto._id !== id);
        setProductos(nuevosProductos);
        AsyncStorage.setItem('carrito', JSON.stringify(nuevosProductos));
    };

    // Calcular el total del carrito
    const total = productos.reduce((sum, producto) => sum + producto.precio * (producto.cantidad || 1), 0);

    const handleRealizarCompra = () => {
        navigation.navigate("Compra", { productos });
    };

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titulo}>Carrito de Compras</Text>
                {productos.length === 0 ? (
                    <Text style={styles.mensajeVacio}>El carrito está vacío</Text>
                ) : (
                    <>
                        <FlatList
                            data={productos}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={styles.producto}>
                                    <Text style={styles.nombre}>{item.nombre}</Text>
                                    <Text style={styles.precio}>${item.precio} c/u</Text>
                                    <View style={styles.cantidadContainer}>
                                        <TouchableOpacity
                                            style={styles.botonCantidad}
                                            onPress={() => disminuirCantidad(item._id)}
                                        >
                                            <Text style={styles.botonCantidadTexto}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.cantidad}>{item.cantidad || 1}</Text>
                                        <TouchableOpacity
                                            style={styles.botonCantidad}
                                            onPress={() => aumentarCantidad(item._id)}
                                        >
                                            <Text style={styles.botonCantidadTexto}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.subtotal}>
                                        Subtotal: ${item.precio * (item.cantidad || 1)}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.botonEliminar}
                                        onPress={() => eliminarProducto(item._id)}
                                    >
                                        <Text style={styles.botonEliminarTexto}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            scrollEnabled={false} // Desactiva el scroll interno de FlatList
                        />
                        <Text style={styles.total}>Total: ${total}</Text>

                        <TouchableOpacity style={styles.botonComprar} onPress={handleRealizarCompra}>
                            <Text style={styles.botonComprarTexto}>Realizar Compra</Text>
                        </TouchableOpacity>
                    </>
                )}
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
    mensajeVacio: {
        fontSize: 16,
        textAlign: "center",
        color: "#6c757d",
    },
    producto: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    nombre: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    precio: {
        fontSize: 16,
        color: "#28a745",
        marginBottom: 10,
    },
    cantidadContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    botonCantidad: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    botonCantidadTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cantidad: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    subtotal: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#212529",
    },
    botonEliminar: {
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    botonEliminarTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "right",
    },
    botonComprar: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    botonComprarTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Carrito;