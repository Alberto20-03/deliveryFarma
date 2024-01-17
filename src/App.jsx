import { BurguerMenu } from './components/burguermenu/burguer-menu';
import Searcher from './components/Searcher';
import './App.css';
import { Login } from './components/login/login';
import { Carrito } from './components/carrito/carrito';
import { CardMedicines } from './components/card-medicines/card-medicines';
import CartProvider from './components/context/cart-context';
import { Home } from './components/Home/home';
import Dialogo from './components/bocadillo-dialogo/bocadillo-dialogo';

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
