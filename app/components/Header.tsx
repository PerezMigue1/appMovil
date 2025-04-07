// components/Header.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput } from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../screens/UserContext";
import { useNavigation } from "@react-navigation/native";
import DropdownMenu from "./DropdownMenu";

const { width } = Dimensions.get("window");

interface HeaderProps {
  onSearch?: (searchText: string) => void; // Prop opcional para manejar la búsqueda
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  // Maneja el cierre de sesión
  const handleLogout = () => {
    setUser(null);
    navigation.navigate("Login");
  };

  // Maneja la búsqueda
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText); // Pasa el texto de búsqueda al componente padre
    }
    navigation.navigate("BuscarProductos", { searchText }); // Navega a la pantalla de búsqueda con el texto
  };

  return (
    <View style={styles.header}>
      {/* Botón para abrir/cerrar el menú */}
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
        <Feather name="menu" size={24} color="white" />
      </TouchableOpacity>

      {/* Logo y nombre de la app */}
      <View style={styles.brandContainer}>
        <Image
          source={require("../../assets/logo.jpeg")}
          style={styles.logo}
        />
        <Text style={styles.appName}>INVERNATECH</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText} // Actualiza el estado del texto de búsqueda
          onSubmitEditing={handleSearch} // Navega al presionar "Enter"
        />
      </View>

      {/* Menú de navegación a la derecha */}
      <View style={styles.navOptions}>
        {/* Botón de perfil si el usuario está logueado */}
        {user && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Perfil")}
          >
            <FontAwesome name="user" size={20} color="white" />
          </TouchableOpacity>
        )}

        {/* Botón de control IoT si el usuario está logueado */}
        {user && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("ControlIoT")}
          >
            <FontAwesome name="laptop" size={20} color="white" />
          </TouchableOpacity>
        )}

        {/* Botón de cerrar sesión si el usuario está logueado */}
        {user && (
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Menú desplegable */}
      {menuOpen && <DropdownMenu />}
    </View>
  );
};

// Estilos (sin cambios)
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 34,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#043200",
    borderBottomWidth: 2,
    borderBottomColor: "#32cd60",
  },
  menuButton: {
    padding: 5,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginRight: 10,
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#32cd60",
  },
  navOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
});

export default Header;