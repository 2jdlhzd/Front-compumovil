import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Axios from '../Axios';
import { UserValues } from '../providers/UserValues';

const ListaProducto = ({ navigation }) => {
  const { token, user } = useContext(UserValues);
  const [productos, setProductos] = useState([]);

  const addCarrito = async (datos) => {
    try {
      await Axios.post('/carritos/crear', datos, {
        headers: { Authorization: token }
      });
      console.log('Añadido correctamente');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await Axios.get('/productos/obtener', {
          headers: { Authorization: token }
        });

        setProductos((prev) => (prev = response.data.response));
      } catch (err) {
        console.log('error');
      }
    };

    fechData();
  }, []);

  return (
    <View style={styles.contenedor}>
      <View style={styles.barra}>
        <TouchableOpacity
          style={styles.btn2}
          onPress={() => {
            navigation.navigate('usuario');
          }}
        >
          <Text>Usuario</Text>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.btn2 }}
          onPress={() => {
            navigation.navigate('Carrito');
          }}
        >
          <Text>Carrito</Text>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
        {/* <Button
          onPress={() => {
            navigation.navigate('Carrito');
          }}
          title="Carrito"
        >
          Carrito
        </Button> */}
        {/* <Ionicons
          name="cart"
          size={50}
          style={styles.icons}
          color="white"
          onPress={() => {
            navigation.navigate('Carrito');
          }}
        /> */}
      </View>

      <ScrollView>
        {productos.length > 0 &&
          productos.map((producto) => (
            <View style={styles.caja} key={producto.id}>
              <Text style={styles.nomb}>{producto.nombre}</Text>
              <View style={styles.producto}>
                <Image
                  source={require('../assets/pc.jpg')}
                  style={styles.img}
                />
                <Text style={styles.text}>{producto.descripcion}</Text>
              </View>
              <View>
                <Text style={styles.precio}>${producto.precio}</Text>
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
                      descripcion: producto.descripcion,
                      productos_id: producto.id,
                      usuario_id: user.id
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
    flex: 1
  },
  barra: {
    height: 100,
    backgroundColor: '#6741E0',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  caja: {
    marginTop: 5,
    height: 300,
    backgroundColor: 'white'
  },
  producto: {
    margin: 10,
    flexDirection: 'row'
  },
  img: {
    width: 150,
    height: 150
  },
  botones: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btn1: {
    width: 150,
    height: 40,
    backgroundColor: '#098F18',
    borderRadius: 10
  },
  btn2: {
    width: 160,
    height: 40,
    backgroundColor: '#008DB9',
    borderRadius: 10
  },

  text: {
    marginLeft: 20,
    width: 225
  },
  nomb: {
    marginLeft: 20,
    width: 225,
    fontWeight: 'bold',
    fontSize: 20
  },
  textoboton: {
    padding: 10,
    color: 'white',
    textAlign: 'center'
  },
  precio: {
    fontSize: 30,
    marginLeft: 40
  },
  descripcion: {
    marginLeft: 'auto'
  }
});

export default ListaProducto;
