import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserValues } from '../providers/UserValues';

const Usuario = ({ navigation }) => {
  const { user } = useContext(UserValues);

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

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
