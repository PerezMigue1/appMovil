// components/BottomMenu.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomMenu = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Home")}
            >
                <MaterialIcons name="home" size={24} color="#4CAF50" />
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Cuenta")}
            >
                <MaterialIcons name="account-circle" size={24} color="#4CAF50" />
                <Text style={styles.text}>Cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate("Carrito")}
            >
                <MaterialIcons name="shopping-cart" size={24} color="#4CAF50" />
                <Text style={styles.text}>Carrito</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    menuItem: {
        alignItems: "center",
    },
    text: {
        fontSize: 12,
        color: "#32cd60",
    },
});

export default BottomMenu;