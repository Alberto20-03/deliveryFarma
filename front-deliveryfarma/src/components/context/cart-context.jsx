import { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [login, setLogin] = useState(false); //Menu desplegable grande
  const [nombre, setNombre] = useState('');
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [verLogin, setVerLogin] = useState(false); //Menu pequeño de login

  const AñadirACarrito = (product) => {
    const productInCart = cart.findIndex(
      (item) => item.nregistro == product.nregistro
    );

    if (productInCart >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCart].quantity += 1;
      return setCart(newCart);
    }

    return setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

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
