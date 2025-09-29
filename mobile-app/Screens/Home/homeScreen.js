import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, Platform, ActivityIndicator} from 'react-native';

const icon = require('../../assets/logo.png');
const email = require('../../assets/email.png');

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.info}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
        <Image source={icon} style={{ width: 300, height: 100 }}/>

        <Text style={{ color: '#ffffff', margin: 15, fontSize: 12, paddingBottom: 20, textAlign: 'justify' }}>
          Bienvenido a ParqueoSeguro, tu app de confianza para estacionar. 
          Encuentra y reserva parqueaderos cercanos en segundos. 
          Olvídate de dar vueltas buscando dónde estacionar.
        </Text>

        <View style={styles.contenido}>
          <Text style={{ color: '#000000', margin: 15, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            ¡Empieza con ParqueoSeguro ahora y haz que estacionar sea más fácil que nunca!
          </Text>

            {/* Botón de iniciar sesión */}
            
            <TouchableHighlight
              underlayColor={'#ffffff'}
              onPress={() => navigation.navigate('Login')}
              style={{
                height: 50,
                width: 200,
                margin: 200,
                backgroundColor: '#82e486',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}
            >

              <View style={styles.boton}>
              <Image source={email} style={{ width: 20, height: 20, marginRight: 10 }} />
              <Text style={{ color: '#ffffff', fontWeight: 'bold'}}>Iniciar Sesión</Text>
              </View>
            
            </TouchableHighlight>
        </View>
      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    backgroundColor: '#17224d',
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 40,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  contenido: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingTop: 20,
    height: 600,
    width: 380,
    alignItems: 'center',
    justifyContent: 'top',
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

