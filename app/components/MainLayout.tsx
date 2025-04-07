// components/MainLayout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import BottomMenu from "./BottomMenu";

const MainLayout = ({ children }) => {
    return (
        <View style={styles.container}>
            {/* Contenido de la pantalla */}
            <View style={styles.content}>{children}</View>

            {/* Menú inferior */}
            <BottomMenu />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1, // Ocupa todo el espacio disponible excepto el menú inferior
    },
});

export default MainLayout;