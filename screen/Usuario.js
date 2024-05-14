import { useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserValues } from '../providers/UserValues';

const Usuario = ({ navigation }) => {
  const { user } = useContext(UserValues);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.box}>
      <View style={styles.banner}></View>
      <Text style={styles.inf}>Informacion del usuario</Text>
      <View style={styles.container}>
        <Text style={styles.titu}>Nombre:</Text>
        <Text style={styles.nombre}>{user.nombre}</Text>
        <Text style={styles.apell}>Apellidos:</Text>
        <Text>{user.apellidos}</Text>
        <Text style={styles.corr}>Gmail</Text>
        <Text>{user.correo}</Text>
        <TouchableOpacity
          style={styles.btn1}
          onPress={() => {
            navigation.navigate('ListaProducto');
          }}
        >
          <Text style={styles.createAccountText}>Regresar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={logout}>
          <Text styles={styles.btnText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { flex: 1 },
  banner: {
    alignItems: 'center',
    height: 240,
    borderBottomRightRadius: 400,
    backgroundColor: '#8400FF'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  inf: {
    marginTop: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    color: 'blue',
    fontWeight: 'bold'
  },
  nombre: {
    fontSize: 20
  },
  apellidos: {
    fontSize: 20
  },
  titu: {
    fontSize: 25
  },
  apell: {
    fontSize: 25
  },
  corr: {
    fontSize: 25
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 44,
    marginTop: 40,
    backgroundColor: '#8400FF',
    borderRadius: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'white'
  },
  createAccountText: {
    color: 'black',
    textDecorationLine: 'underline'
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 44,
    marginTop: 40,
    backgroundColor: '#8400FF',
    borderRadius: 10
  }
});
export default Usuario;
