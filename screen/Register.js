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

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullApellidos, setFullApellidos] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post('usuarios/crear', {
        nombre: fullName,
        apellidos: fullApellidos,
        correo: email,
        password: password
      });
      navigation.navigate('Login');
    } catch (err) {
      console.log('error de registro');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}></View>
      <Ionicons name="laptop" size={100} color="white" />
      <Text style={styles.logoText}>Compumovil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos completos"
        value={fullApellidos}
        onChangeText={setFullApellidos}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.createAccountText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    height: 240,
    borderBottomRightRadius: 400,
    backgroundColor: '#8400FF'
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderColor: 'black',
    borderWidth: 2
  },
  button: {
    backgroundColor: 'white',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  createAccountText: {
    color: 'black',
    textDecorationLine: 'underline'
  }
});

export default Register;
