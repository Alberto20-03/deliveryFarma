import { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // almacena los productos añadidos al carrito
  const [search, setSearch] = useState(''); // guarda los caracteres introducidos para la búsqueda
  const [user, setUser] = useState(''); // guarda el usuario registrado (correo)
  const [login, setLogin] = useState(false); // gestiona si se debe ver el menu desplegable más grande del login
  const [nombre, setNombre] = useState(''); // guarda el nombre del usuario
  const [sesionIniciada, setSesionIniciada] = useState(false); // indica si se ha iniciado sesión
  const [verLogin, setVerLogin] = useState(false); // gestiona si se debe ver el menu desplegable pequeño del login

  // se encarga de añadir los productos seleccionados al carrito
  const AñadirACarrito = (product) => {
    //busca si el producto añadido ya está en el carrito
    const productInCart = cart.findIndex(
      (item) => item.nregistro == product.nregistro
    );

    //si está suma 1 a la cantidad
    if (productInCart >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCart].quantity += 1;
      return setCart(newCart);
    }

    //actualiza el estado
    return setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  //elimina un producto por completo del carrito
  const EliminarMontonCarrito = (product) => {
    const productInCart = cart.findIndex(
      (item) => item.nregistro == product.nregistro && product.quantity > 1
    );

    if (productInCart >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCart].quantity -= 1;
      return setCart(newCart);
    }
  };

  const EliminarDeCarrito = (product) => {
    setCart((prevState) =>
      prevState.filter((item) => item.nregistro != product.nregistro)
    );
  };

  //elimina todos los productos del carrito
  const LimpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        AñadirACarrito,
        EliminarDeCarrito,
        LimpiarCarrito,
        EliminarMontonCarrito,
        search,
        setSearch,
        user,
        setUser,
        login,
        setLogin,
        nombre,
        setNombre,
        sesionIniciada,
        setSesionIniciada,
        verLogin,
        setVerLogin,
      }}>
      {children}
    </CartContext.Provider>
  );
}
