// screens/BuscarProductosScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import CardProductos from "../components/CardProductos";
import MainLayout from "../components/MainLayout";

type Producto = {
    _id: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    stock: number;
    imagenUrl: string;
    fechaCreacion: string;
};

const BuscarProductosScreen = () => {
    const route = useRoute();
    const { searchText } = route.params as { searchText: string }; // Obtener el texto de búsqueda
    const [busqueda, setBusqueda] = useState(searchText); // Inicializar el estado con el texto de búsqueda
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
    const navigation = useNavigation();

    // Función para manejar la búsqueda
    const handleSearch = async (searchText: string) => {
        setBusqueda(searchText);

        if (searchText) {
            try {
                const res = await fetch("https://servidor-bbkq.vercel.app/Productos");
                const data = await res.json();
                const filtrados = data.filter((p: Producto) =>
                    p.nombre.toLowerCase().includes(searchText.toLowerCase())
                );
                setProductosFiltrados(filtrados);
            } catch (error) {
                console.error("Error al buscar productos:", error);
            }
        } else {
            setProductosFiltrados([]);
        }
    };

    // Efecto para realizar la búsqueda al cargar la pantalla
    useEffect(() => {
        handleSearch(searchText);
    }, [searchText]);

    // Función para manejar el clic en un producto
    const handleProductoPress = (producto: Producto) => {
        navigation.navigate("DetalleProducto", { producto });
    };

    return (
        <MainLayout>
            {/* Header con barra de búsqueda */}
            <Header onSearch={handleSearch} />

            {/* Resultados de la búsqueda */}
            <View style={styles.container}>
                {busqueda ? (
                    productosFiltrados.length > 0 ? (
                        <FlatList
                            data={productosFiltrados}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <CardProductos
                                    id={item._id}
                                    image={item.imagenUrl}
                                    title={item.nombre}
                                    description={`Precio: $${item.precio}`}
                                    onPress={() => handleProductoPress(item)}
                                />
                            )}
                            contentContainerStyle={styles.listaContainer}
                        />
                    ) : (
                        <Text style={styles.textoVacio}>No se encontraron productos.</Text>
                    )
                ) : (
                    <Text style={styles.textoVacio}>Ingresa un término de búsqueda.</Text>
                )}
            </View>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listaContainer: {
        paddingBottom: 20,
    },
    textoVacio: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
});

export default BuscarProductosScreen;