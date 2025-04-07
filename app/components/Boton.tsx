import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import React from "react";

type props = {
  titulo: string;
  onPress:()=>void,
  variante?:'primario' | 'secundario' | 'peligro',
  icono?:React.ReactNode,
  posicionIcono?: "izquierda" | "derecha",
  disable?:boolean,
  estilo?:StyleProp<ViewStyle>,
};

const Boton = (Props:props) => {
  const getVariante=()=> {
    switch(Props.variante) {
      case 'secundario': return styles.secundario;
      case 'peligro': return styles.peligro;
      default: return styles.primario;
    }
  }
  
  return (
      <Pressable onPress={Props.onPress} 
      style={[styles.boton, getVariante(), Props.estilo, Props.disable && styles.disable]}
      disabled={Props.disable}>
          {Props.icono && Props.posicionIcono !== 'derecha' && Props.icono}
        <Text style={styles.texto}>{Props.titulo}</Text>
          {Props.icono && Props.posicionIcono === 'derecha' && Props.icono}
      </Pressable>
    )
}

export default Boton;

const styles = StyleSheet.create({
  boton: {
    flexDirection: 'row',
    backgroundColor: '#3D1069',
    marginVertical: 5,
    padding: 5,
    paddingStart: 10,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#732BF5',
    borderWidth: 2,
    alignItems: 'center',
  },
  texto: {
    color:'white',
    marginStart: 8,
    fontWeight: 'bold',
  },
  primario: {
    backgroundColor: '#3D1069',
  },
  secundario: {
    backgroundColor: '#0077AB',
  },
  peligro: {
    backgroundColor: '#EB3324',
  },
  disable: {
    opacity: .5,
  },
});