import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { userValues } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Usuario = () => {
  const navigation = useNavigation();
  const { user } = useContext(userValues);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.push('Login');
  };

  console.log(user);
  return (
    <View>
      <Text>{user.nombre}</Text>
      <Text>{user.apellidos}</Text>
      <Text>{user.correo}</Text>
      <Button title="Cerrar sesion" onPress={logout} />
    </View>
  );
};
export default Usuario;
