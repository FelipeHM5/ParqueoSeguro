import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Alert} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

// Partes exportadas
export default function CreateReservation() {
  const navigation = useNavigation();
  const [parqueadero, setParqueadero] = useState("");
  const [placa, setPlaca] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const auth = getAuth();


  // Lógica para guardar reserva 
  const handleCreateReserve = async () => {
    try {
      await addDoc(collection(db, "reservas"), {
        userId: auth.currentUser.uid,
        parqueadero,
        placa,
        vehiculo,
        fecha,
        hora,
        estado: "activa",
        createdAt: new Date()
      });

      Alert.alert("Éxito", "Reserva creada exitosamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la reserva");
      console.error("Error al crear reserva: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Parqueadero</Text>
      <Picker
        selectedValue={parqueadero}
        onValueChange={(itemValue) => setParqueadero(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un parqueadero" value="" />
        <Picker.Item label="Parqueadero Central" value="Parqueadero Central" />
        <Picker.Item label="Parqueadero Norte" value="Parqueadero Norte" />
        <Picker.Item label="Parqueadero Sur" value="Parqueadero Sur" />
      </Picker>

      <Text style={styles.label}>Placa del Vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="ABC-123"
        value={placa}
        maxLength={6}
        autoCapitalize="characters"
        onChangeText={(text) => {
    // Solo permite letras y números
    const filtered = text.replace(/[^A-Z0-9]/g, '');
    setPlaca(filtered);
  }}
      />

      <Text style={styles.label}>Tipo de Vehículo</Text>
      <Picker
        selectedValue={vehiculo}
        onValueChange={(itemValue) => setVehiculo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un tipo de vehículo" value="" />
        <Picker.Item label="Automóvil" value="Automóvil" />
        <Picker.Item label="Motocicleta" value="Motocicleta" />
        <Picker.Item label="Camioneta" value="Camioneta" />
      </Picker>

      <Text style={styles.label}>Fecha de Reserva</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={fecha}
        onChangeText={setFecha}
      />
      <Text style={styles.label}>Hora de Reserva</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM"
        value={hora}
        onChangeText={setHora}
      />

      <View style={styles.buttonContainer}>
        <Button title="Crear Reserva" onPress={handleCreateReserve} />
    </View>

  </View>
  );
  }

  // Estilos
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    label: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: "bold",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
    picker: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginTop: 10,
    },
    buttonContainer: {
      marginTop: 30,
    },

  });

