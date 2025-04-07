// navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Contactos from '../screens/Contactos';
import ControlIoTScreen from '../screens/ControlIoT';
import DetalleProducto from '../screens/DetalleProducto';
import Perfil from '../screens/Perfil';
import ProductosScreen from '../screens/Productos';
import VincularIoT from '../screens/VincularIoT';
import Cuenta from "../screens/Perfil";
import Nosotros from "../screens/Nosotros";
import HistoriaAntecedentes from "../screens/HistoriaAntecedentes";
import PreguntasFrecuentes from "../screens/PreguntasFrecuentes";
import Login from "../screens/Login";
import Registro from "../screens/Registro";
import Compra from "../screens/Compra";
import Carrito from '../screens/Carrito';
import Politicas from '../screens/Politicas';
import Ubicacion from "../screens/Ubicacion"
import RecuperarContraseña from "../screens/RecuperarContraseña"
import ModificarPerfil from '../screens/ModificarPerfil';
import IoTDashboard from '../screens/IoTDashboard'
import BuscarProductosScreen from "../screens/BuscarProductos";
import ConfirmacionCompra from "../screens/ConfirmacionCompra";


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Contactos" component={Contactos} />
                <Stack.Screen name="ControlIoT" component={ControlIoTScreen} />
                <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="ModificarPerfil" component={ModificarPerfil} />
                <Stack.Screen name="Productos" component={ProductosScreen} />
                <Stack.Screen
                    name="VincularIoT"
                    component={VincularIoT}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Cuenta" component={Cuenta} />
                <Stack.Screen name="Nosotros" component={Nosotros} />
                <Stack.Screen name="HistoriaAntecedentes" component={HistoriaAntecedentes} />
                <Stack.Screen name="PreguntasFrecuentes" component={PreguntasFrecuentes} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
                <Stack.Screen name="Compra" component={Compra} />
                <Stack.Screen name="Carrito" component={Carrito} />
                <Stack.Screen name="ConfirmacionCompra" component={ConfirmacionCompra} />
                <Stack.Screen name="Politicas" component={Politicas} />
                <Stack.Screen name="Ubicacion" component={Ubicacion} />
                <Stack.Screen name="RecuperarContraseña" component={RecuperarContraseña} />
                <Stack.Screen name="IoTDashboard" component={IoTDashboard} />
                <Stack.Screen
                    name="BuscarProductos"
                    component={BuscarProductosScreen}
                    options={{ title: "Resultados de búsqueda" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;