import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import ListaProductos from "../components/ListaProductos";
import Footer from "../components/Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }: any) => {
    const [user, setUser] = useState<any>(null);
    const [recomendados, setRecomendados] = useState<any[]>([]);
    const [masVendidos, setMasVendidos] = useState<any[]>([]);
    const [ofertas, setOfertas] = useState<any[]>([]);
    const [nuevos, setNuevos] = useState<any[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    // Verificar si hay un usuario logueado
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('usuario');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };

        fetchUser();
    }, []);

    // Obtener productos de la API
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Obtener todos los productos
                const res = await fetch('https://servidor-bbkq.vercel.app/Productos');
                const data = await res.json();

                const productosRecomendados = [...data]
                    .sort(() => 0.5 - Math.random()) // Mezclar aleatoriamente
                    .slice(0, 8); 
                setRecomendados(productosRecomendados);

                const productosMasVendidos = [...data]
                    .sort((a: any, b: any) => b.precio - a.precio) // Ordenar por precio descendente
                    .slice(0, 8); 
                setMasVendidos(productosMasVendidos);

                const productosOfertas = [...data]
                    .sort((a: any, b: any) => b.precio + a.precio) // Ordenar por precio descendente
                    .slice(0, 8); 
                setOfertas(productosOfertas);

                const productosNuevos = [...data]
                    .sort((a: any, b: any) => b.stock - a.stock) // Ordenar por fecha descendente
                    .slice(0, 8); 
                setNuevos(productosNuevos);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchProductos();
    }, []);

    const handleProductoPress = (producto: any) => {
        navigation.navigate("DetalleProducto", { producto });
    };

    const data = [
        ...(user ? [{ type: "bienvenida", user }] : []), // Tarjeta de bienvenida solo si hay usuario
        { type: "seccion", titulo: "Productos Recomendados", productos: recomendados },
        { type: "seccion", titulo: "Más Vendidos", productos: masVendidos },
        { type: "seccion", titulo: "Ofertas Especiales", productos: ofertas },
        { type: "seccion", titulo: "Nuevos Productos", productos: nuevos },
        { type: "footer" }, 
    ];

    // Renderizar un producto, la tarjeta de bienvenida, una sección o el footer
    const renderItem = ({ item }: { item: any | { type: string } }) => {
        if (item.type === "bienvenida") {
            return (
                <View style={styles.tarjetaBienvenida}>
                    <Text style={styles.bienvenidaTexto}>Bienvenido,</Text>
                    <Text style={styles.bienvenidaNombre}>{item.user?.nombre || "Usuario"}</Text>
                    <Text style={styles.bienvenidaSubtexto}>¡Gracias por elegirnos!</Text>
                </View>
            );
        }

        if (item.type === "seccion") {
            return (
                <View>
                    <Text style={styles.tituloSeccion}>{item.titulo}</Text>
                    <ListaProductos
                        productos={item.productos.slice(0, 8)} // Asegurar que solo se muestren 8 productos
                        onProductoPress={handleProductoPress}
                    />
                </View>
            );
        }

        if (item.type === "footer") {
            return <Footer />; // Renderizar el footer
        }

        return null;
    };

    if (cargando) {
        return (
            <MainLayout>
                <Header />
                <View style={styles.cargandoContainer}>
                    <ActivityIndicator size="large" color="#3D1069" />
                </View>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Header />
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.type + index}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    tarjetaBienvenida: {
        backgroundColor: "#00bb2d",
        borderRadius: 10,
        padding: 20,
        margin: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    bienvenidaTexto: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
    },
    bienvenidaNombre: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "bold",
        marginTop: 5,
    },
    bienvenidaSubtexto: {
        fontSize: 16,
        color: "#FFF",
        marginTop: 5,
    },
    cargandoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingBottom: 20,
    },
    tituloSeccion: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginTop: 20,
        marginBottom: 10,
        color: "#333",
    },
});

export default Home;