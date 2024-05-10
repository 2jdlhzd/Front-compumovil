function sumar(lista, callback) {
  const propiedad = lista.map(callback);
  const suma = propiedad.reduce((a, b) => a + b, 0);
  return suma;
}

export default sumar;
