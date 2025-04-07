// components/CardProductos.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type CardProductosProps = {
    id: string;
    image: string;
    title: string;
    description: string;
    onPress: () => void;
};

const CardProductos: React.FC<CardProductosProps> = ({ id, image, title, description, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 160,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        height: 120,
        overflow: "hidden",
        borderRadius: 8,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    textContainer: {
        marginTop: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#4CAF50",
        textAlign: "center",
    },
    description: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 5,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 20,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
});

export default CardProductos;