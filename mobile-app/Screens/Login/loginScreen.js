// Importaciones necesarias
import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import {Icon, Input}  from 'react-native-elements';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, ActivityIndicator } from "react-native";

import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const icon = require('../../assets/logo.png');


// Logica para validacion de usuario
export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.navigate('MainApp');
  } catch (error) {
    setTimeout(() => {
      alert('Correo o contraseña incorrectos');
      setLoading(false);
    }, 1000);
    return;
  }
  setLoading(false);
};
  
  // Diseño de la pantalla de inicio de sesión
  return (
    <View style={styles.info}>
        <StatusBar style="light" />
          <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
            <Image source={icon} style={{ width: 300, height: 100 }} />
  
                <Text style={{ color: '#ffffff', margin: 15, fontSize: 12, paddingBottom: 20, textAlign: 'justify' }}>
                  Bienvenido a ParqueoSeguro, tu app de confianza para estacionar. 
                  Encuentra y reserva parqueaderos cercanos en segundos. 
                  Olvídate de dar vueltas buscando dónde estacionar.
                </Text>
  
              
                <View style={styles.formulario}>
                <Text style={styles.titulo}>Inicia Sesion</Text>
                          
                <View style={styles.inputContainer}>
                  
                  <Input
                    style={styles.input}
                    placeholder= "Correo Electrónico"
                    placeholderTextColor= "#666"
                    keyboardType= "email-address"   
                    value={email}
                    onChangeText={setEmail}     
                    leftIcon=<Icon
                      name="email"
                    />  
                  />
                  
                  <Input
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon=<Icon
                    type="material-community"
                      name={ showPassword ? "eye-off-outline" : "eye-outline" }
                      iconStyle={styles.iconEye}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                    leftIcon=<Icon
                      name="lock"                     
                    />
                  />
                
                </View>
    
              {/* Botón de iniciar sesión */}
          <TouchableHighlight
              underlayColor={'#6fda8a'}
              onPress={handleLogin}
              style={styles.boton}
              disabled={loading}
            >
            <Text style={styles.textoBoton}>{loading ? 'Ingresando...' : 'Ingresar'}</Text>
          </TouchableHighlight>

          {loading && (
            <ActivityIndicator size="large" color="#82e486" style={{ marginTop: 20 }} />
          )}

          {/* Texto de registro */}
          <View style={styles.registrarse}>
            <Text style={{ color: '#000000', fontSize: 12 }}>¿No tienes cuenta? </Text>
            <TouchableHighlight
              underlayColor={'#6fda8a'}
              onPress={() => navigation.replace('SignUp')  }
            >
              <Text style={{ color: '#82e486', fontSize: 12 }}>Regístrate</Text>
            </TouchableHighlight>
          </View>
          
        </View>              
      </ScrollView>
    </View>
  );
}


// Estilos de la pantalla    
const styles = StyleSheet.create({
  
  info: {
    flex: 1,
    backgroundColor: '#17224d',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  textoBienvenida: {
    color: '#ffffff',
    margin: 15,
    fontSize: 12,
    paddingBottom: 20,
    textAlign: 'justify',
  },
  formulario: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  titulo: {
    color: '#000000',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#ddd',
    marginBottom: '30%',
    width: '90%',
    height: 50,
    flexDirection: 'column'
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    marginLeft: 5
  },
  boton: {
    height: 50,
    width: 200,
    backgroundColor: '#82e486',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  textoBoton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registrarse: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
