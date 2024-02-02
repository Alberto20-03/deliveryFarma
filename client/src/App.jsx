import './App.css';
import CartProvider from './components/context/cart-context'; // contexto global de la aplicación
import { BurguerMenu } from './components/burguermenu/burguer-menu'; // menu hamburguesa desplegable
import Searcher from './components/Searcher'; // buscador
import { Login } from './components/login/login'; // componente para gestionar la sesión del usuario
import { Carrito } from './components/carrito/carrito'; // carrito de compra
import { CardMedicines } from './components/card-medicines/card-medicines'; // las tarjetas que muestran a los productos
import { Home } from './components/home/home'; // el cuerpo de la aplicación
import Dialogo from './components/bocadillo-dialogo/bocadillo-dialogo'; // el chatbot

function App() {
  return (
    <CartProvider>
      <div className="App">
        <header className="header_Contenedor">
          <div className="header_Izquierda">
            <BurguerMenu />
            <img src="logo.png" alt="Logo" />
          </div>
          <div className="header_Derecha">
            <Searcher />
            <Login />
            <img className="iconos" src="corazon.png" alt="Corazon" />
            <Carrito />
          </div>
        </header>
        <main className="body">
          <div className="container">
            <CardMedicines />
          </div>
          <Home />
        </main>
      </div>
      <Dialogo />
    </CartProvider>
  );
}

export default App;
