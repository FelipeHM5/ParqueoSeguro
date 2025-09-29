import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, ActivityIndicator, Alert} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Button, Icon, Input}  from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import CountryPicker from 'react-native-country-picker-modal';

import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";


const icon = require('../../assets/logo.png');



export default function SignupScreen() {
    const [name, setName] = useState("");
    const [identification, setIdentification] = useState("");
    const [nacionality, setNacionality] = useState("");
    const [country, setCountry] = useState(null);
    const [countryCode, setCountryCode] = useState("CO");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [succesMessage, setSuccessMessage] = useState(null);

    const navigation = useNavigation();

    //Logica para el registro de usuario
    const handleRegister = async () => {
        if (!name || !identification || !nacionality || !number || !email || !password || !confirm) {
            setError("Por favor, completa todos los campos");
            return;
        }
        if (password !== confirm) {
            setError("Las contraseñas no coinciden");
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        try {
            setError(null);
            setSuccessMessage(null);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //Cambio para unificar la autenticacion de usuarios
            //PENDIENTE POR VERIFICAR FUNCIONAMIENTO
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "usuarios", uid), {
                nombre: name,
                email,
                rol: "cliente",
                createdAt: serverTimestamp(),
                identificacion: identification,
                nacionalidad: nacionality,
                pais: country ? country.name : "",
                telefono: number

            });

            console.log("Usuario registrado:", uid);
            setSuccessMessage("Usuario registrado exitosamente");

            setEmail("");
            setPassword("");
            setConfirm("");
            setName("");
            setIdentification("");
            setNacionality("");
            setNumber("");

        } catch (e) {
            let errorMessage = "Error al registrar el usuario";
            if (e.code) {
                switch (e.code){
                    case 'auth/email-already-in-use':
                        errorMessage = "El correo electrónico ya está en uso";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "El correo electrónico no es válido";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "La contraseña debe tener al menos 6 caracteres";
                        break;
                    default:
                        errorMessage = e.message;
                }
            }
            setError(errorMessage);
            console.error("Error al registrar el usuario:", e);
        }   
    };

   
   return (
    <KeyboardAwareScrollView style= {styles.scroll}>    
        
        <View style={styles.info}>
            <StatusBar style="light" />
            
            <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
                
                <Image source={icon} style={{ width: 300, height: 100 }} />
                
                <Text style={styles.text}>
                    Bienvenido a ParqueoSeguro, tu app de confianza para estacionar. 
                    Encuentra y reserva parqueaderos cercanos en segundos. 
                    Olvídate de dar vueltas buscando dónde estacionar.
                </Text>
                
                {/* Formulario de registro */}
                <View style={styles.formulario}>
                    <Text style={styles.titulo}>Regístrate</Text>
                    
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#666"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />   

                        <Input
                            style={styles.input}
                            placeholder="Identificación"
                            placeholderTextColor="#666"
                            value={identification}
                            onChangeText={setIdentification}
                            keyboardType="numeric"                          
                        />   

                        <Input
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />   

                        <CountryPicker
                            withFilter
                            withFlag                           
                            withCallingCode
                            withAlphaFilter
                            countryCode={countryCode}
                            onSelect={(selectedCountry) => {
                                setCountryCode(selectedCountry.cca2);
                                setCountry(selectedCountry);
                                setNacionality(selectedCountry.name);
                                setNumber(`+${selectedCountry.callingCode[0]} `);
                            }}
                        />
                        <Input
                            style={styles.input}
                            placeholder="Nacionalidad"                           
                            placeholderTextColor="#666"
                            value={nacionality}
                            onChangeText={setNacionality}
                            autoCapitalize="words"
                            editable={false}
                            
                        /> 
                        

                        <Input
                            style={styles.input}
                            placeholder="Telefono"
                            placeholderTextColor="#666"
                            keyboardType="phone-pad"
                            value={number}
                            onChangeText={setNumber}
                        /> 

                        <Input
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#666"
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <Icon
                                    type="material-community"
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    iconStyle={styles.iconEye}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            value={password}
                            onChangeText={setPassword}
                        />
                                  
                        <Input
                            style={styles.input}
                            placeholder="Confirmar Contraseña"
                            placeholderTextColor="#666"
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <Icon
                                    type="material-community"
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    iconStyle={styles.iconEye}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            }
                            value={confirm}
                            onChangeText={setConfirm}                                                                                                       
                        />
                    
                    </View>
                        
                        {/* Botón de registro */}
                        <Button
                            title="Registrarse"
                            buttonStyle={styles.boton}
                            titleStyle={styles.textoBoton}
                            onPress={handleRegister}                                         
                        />

                        {/* Avisos de error */}
                        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
                        {succesMessage && <Text style={{ color: 'green', marginTop: 10 }}>{succesMessage}</Text>}
                    
                        
                        {/* Redirigir a inicar sesion */}
                         <View style={styles.iniciarSesion}>
                            <Text style={{ color: '#000000', fontSize: 12 }}>¿Ya tienes cuenta? </Text>
                            <TouchableHighlight
                                underlayColor={'#6fda8a'}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={{ color: '#82e486', fontSize: 12 }}>Inicia Sesion</Text>
                            </TouchableHighlight>
                        </View>
                
                </View>
            </ScrollView>
        </View> 
    </KeyboardAwareScrollView>
    );
}

// Estilos
const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#17224d',
    },
    info: {
        flex: 1,
        backgroundColor: '#17224d',
        paddingTop: 40,
    },
    text : {
        color: '#ffffff', 
        margin: 15, 
        fontSize: 12, 
        paddingBottom: 20, 
        textAlign: 'justify'       
    },
    formulario: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '98%',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f4068',
        marginBottom: 20
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        
    },
    input: {
        width: '100%',
        borderBottomWidth: 0,
        borderBottomColor: '#1f4068',
        paddingHorizontal: 0,
    },
    
    boton: {
        backgroundColor: '#82e486',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginTop: 20
        
    },
    textoBoton: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
       
    },
    iniciarSesion: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    iconEye: {
        marginRight: 10,
        color: '#666',
        
    },
    selectedCountry: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    }
});
