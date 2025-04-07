import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import CardProductos from "./CardProductos";

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

type ListaProductosProps = {
    productos?: Producto[]; // Propiedad opcional: lista de productos
    categoria?: string; // Propiedad opcional: filtrar por categoría
    limite?: number; // Propiedad opcional: límite de productos
    orden?: "aleatorio" | "precio-asc" | "precio-desc"; // Propiedad opcional: orden
    onProductoPress: (producto: Producto) => void;
    busqueda?: string; // Nueva propiedad: texto de búsqueda
};

const ListaProductos: React.FC<ListaProductosProps> = ({
    productos,
    categoria,
    limite,
    orden,
    onProductoPress,
    busqueda, // Nueva prop: texto de búsqueda
}) => {
    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                let datos = productos; // Usar los productos proporcionados directamente

                if (!datos && categoria) {
                    // Si no se proporcionan productos pero sí una categoría, obtenerlos de la API
                    const res = await fetch("https://servidor-bbkq.vercel.app/Productos");
                    const data = await res.json();
                    datos = data.filter((p: Producto) => p.categoria === categoria);
                } else if (!datos) {
                    // Si no se proporcionan productos ni categoría, obtener todos los productos
                    const res = await fetch("https://servidor-bbkq.vercel.app/Productos");
                    datos = await res.json();
                }

                // Filtrar por búsqueda si hay texto de búsqueda
                if (busqueda) {
                    datos = datos.filter((p: Producto) =>
                        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
                    );
                }

                // Ordenar los productos
                if (orden === "aleatorio") {
                    datos = datos.sort(() => 0.5 - Math.random()); // Orden aleatorio
                } else if (orden === "precio-asc") {
                    datos = datos.sort((a, b) => a.precio - b.precio); // Precio ascendente
                } else if (orden === "precio-desc") {
                    datos = datos.sort((a, b) => b.precio - a.precio); // Precio descendente
                }

                // Limitar el número de productos
                if (limite) {
                    datos = datos.slice(0, limite);
                }

                setProductosFiltrados(datos || []);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        cargarDatos();
    }, [productos, categoria, limite, orden, busqueda]); // Agregar busqueda como dependencia

    if (productosFiltrados.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.textoVacio}>No hay productos disponibles.</Text>
            </View>
        );
    }

    return (
        <FlatList
            horizontal
            data={productosFiltrados}
            renderItem={({ item }) => (
                <CardProductos
                    id={item._id}
                    image={item.imagenUrl}
                    title={item.nombre}
                    description={`Precio: $${item.precio}`}
                    onPress={() => onProductoPress(item)}
                />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listaContainer}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listaContainer: {
        paddingHorizontal: 10,
    },
    textoVacio: {
        fontSize: 16,
        color: "#666",
    },
});

export default ListaProductos;