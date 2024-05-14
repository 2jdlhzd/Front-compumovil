import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Axios from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [datos, setDatos] = useState({});

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
  };

  const handleCreateAccount = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de registro
  };

  const handle = (text, name) => {
    setDatos((prev) => ({ ...prev, [name]: text }));
  };

  const login = async () => {
    try {
      const res = await Axios.post('/usuarios/login', datos);

      await AsyncStorage.setItem('user', JSON.stringify(res.data.response));
      console.log('correctamente logeado');
      navigation.navigate('ListaProducto');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}></View>
      <Ionicons name="laptop" size={100} color="white" />
      <Text style={styles.title}>CompuMóvil</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => handle(text, 'correo')}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => handle(text, 'password')}
        />
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="blue" />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text
          style={styles.createAccountText}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          ¿No tienes una cuenta? Crea una aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  formContainer: {
    width: '80%',
    marginBottom: 20,
    margin: 10
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 2,
    height: 50
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2
  },
  loginButtonText: {
    color: 'grey',
    fontWeight: 'bold'
  },
  socialLoginContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 2
  },
  socialButtonText: {
    color: 'grey',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  createAccountText: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    height: 240,
    borderBottomRightRadius: 400,
    backgroundColor: '#8400FF'
  }
});

export default Login;
