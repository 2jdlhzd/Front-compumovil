import React, { createContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Register from './screen/Register';
import ListaProducto from './screen/ListaProducto';
import Carrito from './screen/Carrito';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Usuario from './screen/Usuario';
import { UserValues } from './providers/UserValues';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './screen/CheckoutScreen';

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

export default function App() {
  const { token, user, error } = getLocalStorage(); //checa si existe la información del usuario

  return (
    <StripeProvider
      publishableKey="pk_test_51PEN7rGSroiVvTtuUY1aLdrx1vhK6vz77NJcXzCygX9HWXAMsPpzCyPj5kG4S9R4X97CAx9O1xjwKZgexMukppSr00u05qMNZ4"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <UserValues.Provider value={{ token, user }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* {error && <Stack.Screen name="Login" component={Login} />} */}
            {/* {!error && ( */}
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ListaProducto" component={ListaProducto} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Carrito" component={Carrito} />
              <Stack.Screen name="usuario" component={Usuario} />
            </>
            {/* )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </UserValues.Provider>
    </StripeProvider>
  );
}
