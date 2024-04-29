import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Axios from "../Axios";

const ListaProducto = ({ navigation }) => {
  const [productos, setProductos] = useState([]);

  const addCarrito = async (datos) => {
    console.log(datos);
    try {
      await Axios.post("/carritos/crear", datos);
      console.log("Añadido correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get("/productos/obtener");
        //console.log(response);
        setProductos((prev) => (prev = response.data.response));
      } catch (err) {
        console.log("error");
        console.dir(err);
      }
    };

    fechData();
  }, []);

  return (
    <View style={styles.contenedor}>
      <View style={styles.barra}>
        <Ionicons
          name="cart"
          size={50}
          style={styles.icons}
          color="white"
          onPress={() => {
            navigation.navigate("Carrito");
          }}
        />
      </View>

      <ScrollView>
        {productos.length > 1 &&
          productos.map((producto) => (
            <View style={styles.caja} key={producto.id}>
              <View style={styles.producto}>
                <Image
                  source={require("../assets/pc.jpg")}
                  style={styles.img}
                />
                <Text style={styles.text}>{producto.descripcion}</Text>
                <Text style={styles.text}>{producto.nombre}</Text>
              </View>
              <View>
                <Text style={styles.precio}>${producto.nombre}</Text>
              </View>
              <View style={styles.botones}>
                <TouchableOpacity style={styles.btn1}>
                  <Text style={styles.textoboton}>Comprar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn2}
                  onPress={() => {
                    addCarrito({
                      nombre: producto.nombre,
                      precio: producto.precio,
                      productos_id: producto.id,
                      usuario_id: 2,
                    });
                  }}
                >
                  <Text style={styles.textoboton}>AL CARRITO</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  barra: {
    height: 100,
    backgroundColor: "#6741E0",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  caja: {
    marginTop: 5,
    height: 300,
    backgroundColor: "white",
  },
  producto: {
    margin: 10,
    flexDirection: "row",
  },
  img: {
    width: 150,
    height: 150,
  },
  botones: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  btn1: {
    width: 150,
    height: 40,
    backgroundColor: "#098F18",
    borderRadius: 10,
  },
  btn2: {
    width: 160,
    height: 40,
    backgroundColor: "#008DB9",
    borderRadius: 10,
  },

  text: {
    marginLeft: 20,
    width: 225,
  },
  textoboton: {
    padding: 10,
    color: "white",
    textAlign: "center",
  },
  precio: {
    fontSize: 30,
    marginLeft: 40,
  },
});

export default ListaProducto;
