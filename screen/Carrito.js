import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import Axios from '../Axios';
import { userValues } from '../App';

const Carrito = () => {
  const { token } = useContext(userValues);
  const [cartItems, setCartItems] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const deleteItem = async (id) => {
    try {
      await Axios.delete(`/carritos/eliminar/${id}`, {
        headers: { Authorization: token }
      });
      console.log('Elemento eliminado');
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAll = () => {
    cartItems.forEach((element) => {
      deleteItem(element.id);
    });
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get('/carritos/obtener', {
          headers: { Authorization: token }
        });
        //console.log(response);
        setCartItems((prev) => (prev = response.data.response));
      } catch (err) {
        console.log(err);
      }
    };

    fechData();
  }, [actualizar]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => {
          console.log(item, 'desde flat');
          return (
            <View>
              <Text>{item.nombre}</Text>
              <Text>${item.precio}</Text>
              <Button
                title="elimnar del carrito"
                onPress={() => deleteItem(item.id)}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.total}>
        Total: ${cartItems.reduce((a, b) => a + b.precio, 0)}
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Pagar"
          onPress={() => alert('Redirect to payment gateway')}
          disabled={cartItems.length === 0}
        />
        <Button
          title="Vaciar Carrito"
          onPress={deleteAll}
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  }
});

export default Carrito;
