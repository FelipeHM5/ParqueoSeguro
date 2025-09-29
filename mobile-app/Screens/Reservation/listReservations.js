import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export default function ListaReservas() {
  const navigation = useNavigation();
  const [reservas, setReservas] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const q = query(
      collection(db, "reservas"),
      where("userId", "==", auth.currentUser.uid),
      where("estado", "==", "activa")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reservasData = [];
      snapshot.forEach((doc) => {
        reservasData.push({ id: doc.id, ...doc.data() });
      });
      setReservas(reservasData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {reservas.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No tienes reservas activas.</Text>
          <Button
            title="Crear Reserva"
            onPress={() => navigation.navigate("CrearReserva")}
          />
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                marginBottom: 10,
                backgroundColor: "#f3f3f3",
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.parqueadero}</Text>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Hora: {item.hora}</Text>
              <Text>Estado: {item.estado}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
