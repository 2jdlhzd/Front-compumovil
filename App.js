import React, { createContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Register from './screen/Register';
import ListaProducto from './screen/ListaProducto';
import Carrito from './screen/Carrito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from './screen/Usuario';

const Stack = createNativeStackNavigator();

export const getLocalStorage = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(true);

  const getItem = async () => {
    const response = await AsyncStorage.getItem('user');
    if (!response) {
      setUser(null);
      setToken(null);
      setError(true);
    } else {
      const { todo: user, token } = JSON.parse(response);
      setUser(user);
      setToken(token);
      setError(false);
    }
  };

  useEffect(() => {
    getItem();

    return () => {
      setUser(null);
      setToken(null);
      setError(true);
    };
  }, []);
  return { user, token, error };
};
export const userValues = createContext(null);

export default function App() {
  const { token, user, error } = getLocalStorage(); //checa si existe la información del usuario

  return (
    <userValues.Provider value={{ token, user }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {error && <Stack.Screen name="Login" component={Login} />}
          {!error && (
            <>
              <Stack.Screen name="ListaProducto" component={ListaProducto} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Carrito" component={Carrito} />
              <Stack.Screen name="usuario" component={Usuario} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </userValues.Provider>
  );
}
