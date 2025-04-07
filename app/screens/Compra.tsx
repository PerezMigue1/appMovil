import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainLayout from "../components/MainLayout";
import axios from "axios";

const Compra = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productos } = route.params; // Productos con sus cantidades
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tarjeta, setTarjeta] = useState("");
    const [codigoSeguridad, setCodigoSeguridad] = useState("");

    const handleCompra = async () => {
        if (!nombre || !direccion || !tarjeta || !codigoSeguridad) {
            Alert.alert("Error", "Por favor, completa todos los campos");
            return;
        }

        if (tarjeta.length !== 16 || !/^\d+$/.test(tarjeta)) {
            Alert.alert("Error", "El número de tarjeta debe tener 16 dígitos");
            return;
        }

        if (codigoSeguridad.length !== 3 || !/^\d+$/.test(codigoSeguridad)) {
            Alert.alert("Error", "El código de seguridad debe tener 3 dígitos");
            return;
        }

        try {
            const userData = await AsyncStorage.getItem("usuario");
            if (!userData) {
                Alert.alert("Error", "Debes iniciar sesión para realizar una compra");
                return;
            }

            const user = JSON.parse(userData);
            const compraData = {
                venta: {
                    usuario_email: user.email,
                    productos: productos.map((producto) => ({
                        producto_id: producto._id,
                        nombre: producto.nombre,
                        cantidad: producto.cantidad || 1, // Usar la cantidad del producto
                        precio_unitario: producto.precio,
                        subtotal: producto.precio * (producto.cantidad || 1), // Calcular el subtotal
                    })),
                    total: productos.reduce((sum, producto) => sum + producto.precio * (producto.cantidad || 1), 0), // Calcular el total
                },
                pago: {
                    metodo_pago: "tarjeta_credito",
                },
            };

            const response = await axios.post("http://192.168.89.189:5000/api/ventas", compraData);
            if (response.data) {
                // Limpiar el carrito después de la compra
                await AsyncStorage.removeItem('carrito');
                Alert.alert("Éxito", "Compra realizada correctamente");
                navigation.navigate("ConfirmacionCompra", { compra: response.data.venta });
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al realizar la compra");
        }
    };

    return (
        <MainLayout>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.titulo}>Confirmar Compra</Text>
                <Text style={styles.subtitulo}>Productos:</Text>
                {productos.map((producto) => (
                    <View key={producto._id} style={styles.producto}>
                        <Text style={styles.nombre}>{producto.nombre}</Text>
                        <Text style={styles.cantidad}>Cantidad: {producto.cantidad || 1}</Text>
                        <Text style={styles.subtotal}>
                            Subtotal: ${producto.precio * (producto.cantidad || 1)}
                        </Text>
                    </View>
                ))}
                <Text style={styles.total}>Total: ${productos.reduce((sum, producto) => sum + producto.precio * (producto.cantidad || 1), 0)}</Text>

                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <Text style={styles.label}>Dirección de envío</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección de envío"
                    value={direccion}
                    onChangeText={setDireccion}
                />

                <Text style={styles.label}>Número de tarjeta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Número de tarjeta"
                    value={tarjeta}
                    onChangeText={setTarjeta}
                    keyboardType="numeric"
                    maxLength={16}
                />

                <Text style={styles.label}>Código de seguridad</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Código de seguridad"
                    value={codigoSeguridad}
                    onChangeText={setCodigoSeguridad}
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={3}
                />

                <TouchableOpacity style={styles.botonComprar} onPress={handleCompra}>
                    <Text style={styles.botonComprarTexto}>Confirmar Compra</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
                    <Text style={styles.botonRegresarTexto}>Regresar</Text>
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
    cantidad: {
        fontSize: 16,
        color: "#6c757d",
        marginBottom: 5,
    },
    subtotal: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#28a745",
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: "right",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    botonComprar: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    botonComprarTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    botonRegresar: {
        backgroundColor: "#6c757d",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    botonRegresarTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Compra;