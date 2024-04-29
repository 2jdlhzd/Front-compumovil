import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import Axios from "../Axios";

const Carrito = () => {
  const [cartItems, setCartItems] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 30 },
    // Agrega más productos según tus necesidades
  ];

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const deleteItem = async (id) => {
    try {
      await Axios.delete(`/carritos/eliminar/${id}`);
      console.log("Elemento eliminado");
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get("/carritos/obtener");
        //console.log(response);
        setCartItems((prev) => (prev = response.data.response));
      } catch (err) {
        console.log(err);
      }
    };

    fechData();
  }, [actualizar]);

  console.log(cartItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => {
          console.log(item, "desde flat");
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
      <Text style={styles.total}>Total: ${calculateTotalPrice()}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Pagar"
          onPress={() => alert("Redirect to payment gateway")}
          disabled={cartItems.length === 0}
        />
        <Button
          title="Vaciar Carrito"
          onPress={() => setCartItems([])}
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default Carrito;
