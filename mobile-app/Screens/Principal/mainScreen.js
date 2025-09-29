// Importaciones necesarias
import React, { act } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import MapView, { Marker } from "react-native-maps"; 
import { Ionicons } from "@expo/vector-icons"; 
import ReservationsScreen from '../Reservation/reservationScreen'; 
import ActivityScreen from "../Activity/ActivityScreen";
import CustomHeader from "../../components/customHeader";

import { auth } from "../../firebase/firebase"; 
import { signOut } from "firebase/auth";
import { CommonActions } from '@react-navigation/native';

const icon = require('../../assets/iconoAuto.png');




// Pantalla de parqueadero 
function ParqueaesScreen() {
  const reserva = {
    codigo: 'ABC12345',
    parqueadero: 'Parqueadero Central',
    direccion: 'Cra 15 #45-10, Bogotá',
    coordenadas: { latitude: 4.653, longitude: -74.083 },
    horaInicio: '10:00 AM',
    horaFin: '12:00 PM',
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerParq}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'black' }}>Reserva Activa</Text>
        <Text>Código: {reserva.codigo}</Text>
        <Text>Parqueadero: {reserva.parqueadero}</Text>
        <Text>Dirección: {reserva.direccion}</Text>
        <Text>Hora: {reserva.horaInicio} - {reserva.horaFin}</Text>
      </View>

      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        initialRegion={{
          latitude: reserva.coordenadas.latitude,
          longitude: reserva.coordenadas.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={reserva.coordenadas}
          title={reserva.parqueadero}
          description={reserva.direccion}
        />
      </MapView>
    </View>
  );
}

// Pantalla de configuración
function ConfiguracionScreen({ navigation }) {
  const opciones = [
    { nombre: "Mi cuenta", icono: "person-outline", action: "miCuenta" },
    { nombre: "Notificaciones", icono: "notifications-outline", action: "notificaciones" },
    { nombre: "Región e idioma", icono: "globe-outline", action: "regionIdioma" },
    { nombre: "Método de pagos", icono: "card-outline", action: "metodoPagos" },
    { nombre: "Preferencias", icono: "options-outline", action: "preferencias" },
    { nombre: "Soporte", icono: "help-circle-outline", action: "soporte" },
    { nombre: "Legal", icono: "document-text-outline", action: "legal" },
    { nombre: "Cerrar sesión", icono: "log-out-outline", action: "logout" },

  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "auth",
              state: {
                routes: [
                  { name: "Login" } // Redirige a la pantalla de inicio después de cerrar sesión
                ],
              },
            },
          ],
        })
      )
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleOptionPress = (action) => {
    if (action === "logout") {
      handleLogout();
    } else {
      
      console.log(`Opción seleccionada: ${action}`);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ padding: 20 }}>
        {opciones.map((opcion, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
            }}
            onPress={() => handleOptionPress(opcion.action)}
          >
            <Ionicons name={opcion.icono} size={24} color="#82e486" />
            <Text style={{ marginLeft: 10, fontSize: 16 }}>{opcion.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Menu de despliegue 

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const navigation = useNavigation();
  
  const handleSearch = () => {
    
  };

  const handleMenu = () => {
    navigation.openDrawer(); 
  };
  


  // Menu inferior de navegación
  return (
    <>
      <CustomHeader onSearchPress={handleSearch} onMenuPress={handleMenu} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Actividad") {
              iconName = "time-outline";
            } else if (route.name === "Parqueadero") {
              iconName = "car-outline";
            } else if (route.name === "Reservas") {
              iconName = "calendar-outline";
            } else if (route.name === "Configuración") {
              iconName = "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#82e486",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#ffffff", paddingBottom: 5 },
          headerShown: false
        })}
      >
        <Tab.Screen name="Actividad" component={ActivityScreen} />
        <Tab.Screen name="Parqueadero" component={ParqueaesScreen} />
        <Tab.Screen name="Reservas" component={ReservationsScreen} />
        <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
        
      </Tab.Navigator>
    </>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#82e486",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnReserva: {
  fontSize: 16, 
  color: "#666", 
  textAlign: "center", 
  marginBottom: 30
  },
  containerReserva: {
    flex: 1, 
    backgroundColor: "#ffffff", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20
  },
  titleR: {
    fontSize: 24, 
    fontWeight: "bold", 
    color: "black", 
    marginBottom: 20
  },
  containerParq: {
      backgroundColor: '#82e486', 
      padding: 20,  
      borderRadius: 10, 
      margin: 20, 
      marginTop: '70', 
      width: '80%', 
      alignSelf: 'center', 
      alignItems: 'center', 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84, 
      elevation: 5
    },
  map: {
      width: '90%', 
      height: 400 , 
      marginTop: 20, 
      alignSelf: 'center', 
      borderRadius: 15, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.25, 
      shadowRadius: 3.84, 
      elevation: 5     
  }
}
);
 
