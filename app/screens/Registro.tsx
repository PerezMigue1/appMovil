import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

interface FormData {
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    telefono: string;
    email: string;
    password: string;
    confirmarContraseña: string;
    sexo: string;
    edad: string;
    pregunta_recuperacion: string;
    respuesta_recuperacion: string;
}

interface Pregunta {
    _id: string;
    pregunta: string;
}

const Registro = () => {
    const navigation = useNavigation();
    const API_URL = "https://servidor-bbkq.vercel.app"; // Ajusta tu URL si es distinto

    const initialFormData: FormData = {
        nombre: "",
        apellidoP: "",
        apellidoM: "",
        telefono: "",
        email: "",
        password: "",
        confirmarContraseña: "",
        sexo: "",
        edad: "",
        pregunta_recuperacion: "",
        respuesta_recuperacion: "",
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    // Obtener preguntas de recuperación
    useEffect(() => {
        const obtenerPreguntas = async () => {
            try {
                const response = await axios.get(`${API_URL}/pregunta-recuperacion/ver`);
                setPreguntas(response.data);
            } catch (error) {
                console.error("Error al obtener preguntas:", error);
            }
        };
        obtenerPreguntas();
    }, []);

    // Manejo de cambios en los inputs
    const handleChange = (key: keyof FormData, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    // Validación por paso
    const validateStep = (): boolean => {
        if (step === 1) {
            if (!formData.nombre || !formData.apellidoP || !formData.telefono || !formData.email) {
                setError("Todos los campos del paso 1 son obligatorios.");
                return false;
            }
            if (!formData.email.includes("@")) {
                setError("Ingrese un correo electrónico válido.");
                return false;
            }
            if (!/^\d{10}$/.test(formData.telefono)) {
                setError("El teléfono debe tener 10 dígitos.");
                return false;
            }
        } else if (step === 2) {
            if (!formData.password || !formData.confirmarContraseña) {
                setError("Ambos campos de contraseña son obligatorios.");
                return false;
            }
            if (formData.password.length < 8) {
                setError("La contraseña debe tener al menos 8 caracteres.");
                return false;
            }
            if (!/[A-Z]/.test(formData.password)) {
                setError("La contraseña debe contener al menos una mayúscula.");
                return false;
            }
            if (!/[0-9]/.test(formData.password)) {
                setError("La contraseña debe contener al menos un número.");
                return false;
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
                setError("La contraseña debe contener al menos un carácter especial.");
                return false;
            }
            if (formData.password !== formData.confirmarContraseña) {
                setError("Las contraseñas no coinciden.");
                return false;
            }
        } else if (step === 3) {
            if (!formData.sexo || !formData.edad || !formData.pregunta_recuperacion || !formData.respuesta_recuperacion) {
                setError("Todos los campos del paso 3 son obligatorios.");
                return false;
            }
        }
        setError(null);
        return true;
    };

    // Navegación entre pasos
    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        setError(null);
        setStep(step - 1);
    };

    // Envío del formulario
    const handleSubmit = async () => {
        if (!validateStep()) return;

        const datosAEnviar = {
            nombre: formData.nombre,
            apellidoP: formData.apellidoP,
            apellidoM: formData.apellidoM,
            telefono: formData.telefono,
            email: formData.email,
            password: formData.password,
            sexo: formData.sexo,
            edad: formData.edad,
            pregunta_recuperacion: formData.pregunta_recuperacion,
            respuesta_recuperacion: formData.respuesta_recuperacion,
        };

        try {
            const response = await axios.post(`${API_URL}/usuarios/registro`, datosAEnviar);
            if (response.status === 201) {
                setShowModal(true);
                setFormData(initialFormData);
            }
        } catch (error) {
            setError(error.response?.data?.mensaje || "Error al registrar usuario.");
        }
    };

    // Renderizado de cada paso
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Text style={styles.sectionTitle}>Datos Personales</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChangeText={(value) => handleChange("nombre", value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Paterno"
                            value={formData.apellidoP}
                            onChangeText={(value) => handleChange("apellidoP", value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido Materno"
                            value={formData.apellidoM}
                            onChangeText={(value) => handleChange("apellidoM", value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={formData.telefono}
                            onChangeText={(value) => handleChange("telefono", value)}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={formData.email}
                            onChangeText={(value) => handleChange("email", value)}
                            keyboardType="email-address"
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Text style={styles.sectionTitle}>Seguridad</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Contraseña"
                                value={formData.password}
                                onChangeText={(value) => handleChange("password", value)}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Confirmar Contraseña"
                                value={formData.confirmarContraseña}
                                onChangeText={(value) => handleChange("confirmarContraseña", value)}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </>
                );
            case 3:
                return (
                    <>
                        <Text style={styles.sectionTitle}>Información Adicional</Text>
                        <Picker
                            selectedValue={formData.sexo}
                            onValueChange={(value) => handleChange("sexo", value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Seleccione una opción" value="" />
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Femenino" value="femenino" />
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Edad"
                            value={formData.edad}
                            onChangeText={(value) => handleChange("edad", value)}
                            keyboardType="numeric"
                        />
                        <Picker
                            selectedValue={formData.pregunta_recuperacion}
                            onValueChange={(value) => handleChange("pregunta_recuperacion", value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Seleccione una pregunta" value="" />
                            {preguntas.map((pregunta) => (
                                <Picker.Item key={pregunta._id} label={pregunta.pregunta} value={pregunta._id} />
                            ))}
                        </Picker>
                        <TextInput
                            style={styles.input}
                            placeholder="Respuesta de recuperación"
                            value={formData.respuesta_recuperacion}
                            onChangeText={(value) => handleChange("respuesta_recuperacion", value)}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Regístrate</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}

            {renderStep()}

            <View style={styles.buttonContainer}>
                {step > 1 && (
                    <TouchableOpacity style={styles.secondaryButton} onPress={handlePrev}>
                        <Text style={styles.buttonText}>Anterior</Text>
                    </TouchableOpacity>
                )}
                {step < 3 && (
                    <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                        <Text style={styles.buttonText}>Siguiente</Text>
                    </TouchableOpacity>
                )}
                {step === 3 && (
                    <TouchableOpacity style={styles.successButton} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Modal de confirmación */}
            <Modal visible={showModal} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Registro Exitoso</Text>
                        <Text style={styles.modalText}>¡Tu cuenta ha sido creada exitosamente!</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styles.modalButtonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 40,
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#555",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
    },
    passwordInput: {
        flex: 1,
        height: 50,
    },
    picker: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    secondaryButton: {
        backgroundColor: "#6c757d",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    successButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "#dc3545",
        textAlign: "center",
        marginBottom: 15,
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default Registro;