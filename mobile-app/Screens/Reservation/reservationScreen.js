import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaReservas from "./listReservations";
import CrearReserva from "./createReservation";

const Stack = createNativeStackNavigator();

export default function ReservationsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaReservas"
        component={ListaReservas}
        options={{ title: "Mis Reservas" }}
      />
      <Stack.Screen
        name="CrearReserva"
        component={CrearReserva}
        options={{ title: "Crear Reserva" }}
      />
    </Stack.Navigator>
  );
}
