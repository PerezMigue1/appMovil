import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";
import ListaProductos from "../components/ListaProductos";
import MainLayout from "../components/MainLayout";

const ProductosScreen = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda
  const navigation = useNavigation();

  // Función para manejar el clic en un producto
  const handleProductoPress = (producto: any) => {
    navigation.navigate("DetalleProducto", { producto });
  };

  // Función para manejar la búsqueda
  const handleSearch = (searchText: string) => {
    setBusqueda(searchText); // Actualiza el estado de búsqueda
  };

  return (
    <MainLayout>
      {/* Header con barra de búsqueda */}
      <Header onSearch={handleSearch} />

      <ScrollView>
        <Text style={styles.titulo}>Categorías</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoriaSeleccionada}
            onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
            style={styles.picker}
            dropdownIconColor="#ffffff"
            mode="dropdown"
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Semillas" value="Semillas" />
            <Picker.Item label="Herramientas" value="Herramientas" />
            <Picker.Item label="Fertilizantes" value="Fertilizantes" />
            <Picker.Item label="Macetas" value="Macetas" />
            <Picker.Item label="Insecticidas" value="Insecticidas" />
            <Picker.Item label="Riego" value="Riego" />
            <Picker.Item label="Sustratos" value="Sustratos" />
            <Picker.Item label="Proteccion" value="Protección" />
            <Picker.Item label="Accesorios" value="Accesorios" />
            <Picker.Item label="Plantulas" value="Plántulas" />
            <Picker.Item label="Agroquimicos" value="Agroquímicos" />
            <Picker.Item label="Invernaderos" value="Invernaderos" />
          </Picker>
        </View>

        <Text style={styles.titulo}>Productos Recomendados</Text>
        <View style={styles.listaContainer}>
          <ListaProductos
            categoria={categoriaSeleccionada}
            onProductoPress={handleProductoPress}
            limite={12} // Mostrar 12 productos
            orden="aleatorio" // Orden aleatorio
            busqueda={busqueda} // Pasar el texto de búsqueda
          />
        </View>

        <Text style={styles.titulo}>Más Vendidos</Text>
        <View style={styles.listaContainer}>
          <ListaProductos
            categoria={categoriaSeleccionada}
            onProductoPress={handleProductoPress}
            limite={12} // Mostrar 12 productos
            orden="precio-asc" // Ordenar por precio ascendente
            busqueda={busqueda} // Pasar el texto de búsqueda
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  pickerContainer: {
    marginHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 5,
    margin: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#007BFF",
    color: "#ffffff",
    borderRadius: 10,
  },
  listaContainer: {
    flex: 1,
    marginBottom: 20,
  },
});

export default ProductosScreen;