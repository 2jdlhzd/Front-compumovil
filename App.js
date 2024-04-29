import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import Register from './screen/Register';
import ListaProducto from './screen/ListaProducto';
import Carrito from './screen/Carrito';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ListaProducto' component={ListaProducto} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Carrito' component={Carrito} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};