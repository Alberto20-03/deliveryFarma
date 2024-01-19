import { BurguerMenu } from './client/src/components/burguermenu/burguer-menu';
import Searcher from './client/src/components/Searcher';
import './App.css';
import { Login } from './client/src/components/login/login';
import { Carrito } from './client/src/components/carrito/carrito';
import { CardMedicines } from './client/src/components/card-medicines/card-medicines';
import CartProvider from './client/src/components/context/cart-context';
import { Home } from './client/src/components/home/home';
import Dialogo from './client/src/components/bocadillo-dialogo/bocadillo-dialogo';

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
