import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/Home/homeScreen";
import LoginScreen from "./Screens/Login/loginScreen";
import SignUpScreen from "./Screens/SignUp/signupScreen";
import MainScreen from "./Screens/Principal/mainScreen"; 
import ReservationsScreen from "./Screens/Reservation/reservationScreen";
import ActivityScreen from "./Screens/Activity/ActivityScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack de autenticación (pantallas previas al ingreso a la app)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  );
}

// Drawer con el contenido principal de la app (Se agregaran más pantallas según avance el desarrollo)
function AppDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: 'right' }}>
     
      <Drawer.Screen name="Main" component={MainScreen} />

    </Drawer.Navigator>
  );
}

// Navegador principal (elige entre autenticación y la app principal)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>       
        <Stack.Screen name="auth" component={AuthStack} />
        <Stack.Screen name="MainApp" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
