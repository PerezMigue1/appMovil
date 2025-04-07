import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import MainLayout from "../components/MainLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PreguntasFrecuentes = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Cómo puedo realizar una compra?",
            answer:
                "Puedes realizar una compra seleccionando los productos y agregándolos al carrito. Luego, sigue las instrucciones para el pago y envío.",
        },
        {
            question: "¿Cuáles son los métodos de pago aceptados?",
            answer: "Aceptamos pagos con tarjeta de crédito, débito y transferencias bancarias.",
        },
        {
            question: "¿Ofrecen envíos a todo el país?",
            answer: "Sí, realizamos envíos a nivel nacional con diferentes opciones de entrega.",
        },
        {
            question: "¿Cuánto tiempo tarda el envío?",
            answer: "El tiempo de entrega varía entre 2 a 5 días hábiles, dependiendo de la ubicación.",
        },
        {
            question: "¿Puedo cancelar mi pedido?",
            answer:
                "Sí, puedes cancelar tu pedido antes de que haya sido enviado. Contáctanos lo antes posible.",
        },
        {
            question: "¿Cómo puedo hacer una devolución?",
            answer:
                "Puedes solicitar una devolución dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.",
        },
        {
            question: "¿Los productos tienen garantía?",
            answer: "Sí, ofrecemos garantía en todos nuestros productos. La duración varía según el producto.",
        },
        {
            question: "¿Cómo puedo rastrear mi pedido?",
            answer:
                "Una vez enviado tu pedido, recibirás un número de seguimiento para rastrearlo en tiempo real.",
        },
        {
            question: "¿Puedo comprar al por mayor?",
            answer:
                "Sí, ofrecemos precios especiales para compras al por mayor. Contáctanos para más información.",
        },
        {
            question: "¿Cómo puedo contactar al servicio de atención al cliente?",
            answer:
                "Puedes contactarnos por correo electrónico, teléfono o WhatsApp. Estamos disponibles de lunes a viernes de 9:00 AM a 6:00 PM.",
        },
    ];

    return (
        <MainLayout>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Preguntas Frecuentes</Text>
                {faqs.map((faq, index) => (
                    <View key={index} style={styles.accordionItem}>
                        <TouchableOpacity
                            style={styles.accordionHeader}
                            onPress={() => toggleAccordion(index)}
                        >
                            <Text style={styles.accordionHeaderText}>{faq.question}</Text>
                        </TouchableOpacity>
                        {activeIndex === index && (
                            <View style={styles.accordionBody}>
                                <Text style={styles.accordionBodyText}>{faq.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
                <View style={styles.footerWrapper}>
                    <Footer />
                </View>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2E7D32",
    },
    accordionItem: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    accordionHeader: {
        padding: 15,
        backgroundColor: "#388E3C",
    },
    accordionHeaderText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    accordionBody: {
        padding: 15,
        backgroundColor: "#f9f9f9",
    },
    accordionBodyText: {
        fontSize: 14,
        color: "#333",
    },
    footerWrapper: {
        padding: 0,
        marginLeft: -20, // Compensa el padding del ScrollView
        marginRight: -40, // Compensa el padding del ScrollView
    },
});

export default PreguntasFrecuentes;