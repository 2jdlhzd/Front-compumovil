import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
  };

  const handleCreateAccount = () => {
    // Aquí puedes agregar la lógica para navegar a la pantalla de registro
  };

  return (
    <View style={styles.container}>
      <Ionicons name="laptop" size={100} color="white" />
      <Text style={styles.title}>CompuMóvil</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("ListaProducto");
          }}
        >
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
            navigation.navigate("Register");
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    marginBottom: 20,
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "grey",
    fontWeight: "bold",
  },
  socialLoginContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  socialButtonText: {
    color: "grey",
    marginLeft: 10,
    fontWeight: "bold",
  },
  createAccountText: {
    color: "white",
    textDecorationLine: "underline",
  },
});

export default Login;
