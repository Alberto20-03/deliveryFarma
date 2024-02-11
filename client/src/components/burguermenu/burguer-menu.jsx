import { useContext, useState } from 'react';
import './burguer-menu.css';
import { CartContext } from '../context/cart-context';

export function BurguerMenu() {
  // estos 3 estados cambian la clase del menú hamburguesa
  const [burguerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const { setSearch, setVerLogin } = useContext(CartContext);

  // gestiona los cambios que debe adoptar el menu hamburguesa
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked');
      setMenuClass('menu visible');
    } else {
      setBurgerClass('burger-bar unclicked');
      setMenuClass('menu hidden');
    }
    setIsMenuClicked(!isMenuClicked);
  };

  // despliega el menú de login
  function clickCuenta() {
    setBurgerClass('burger-bar unclicked');
    setMenuClass('menu hidden');
    setIsMenuClicked(!isMenuClicked);
    setVerLogin(true);
  }

  // realiza la búsqueda en función de la categoría clicada (en este caso al ser una demostración
  // busca productos generales, sin tener la categoría en cuenta)
  function clickCategoria() {
    setBurgerClass('burger-bar unclicked');
    setMenuClass('menu hidden');
    setIsMenuClicked(!isMenuClicked);
    setSearch('a');
  }

  return (
    <div className="containerMenu">
      <nav>
        <div
          className="burger-menu"
          test-id="burguer-menu-app"
          onClick={updateMenu}>
          <div className={burguerClass} />
          <div className={burguerClass} />
          <div className={burguerClass} />
        </div>
      </nav>

      <div className={menuClass}>
        <header className="menu_header">Menú</header>
        <div className="menu_cuenta" onClick={clickCuenta}>
          Cuenta
        </div>
        <main className="menu_main">
          <div onClick={clickCategoria}>
            Bebé y Mamá
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Cosmética y Belleza
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Dietética y Nutrición
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Higiene
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Salud
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Veterinaria
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Óptica
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
          <div onClick={clickCategoria}>
            Hogar
            <img src="/icon-right.svg" alt="right" width={20} height={20}></img>
          </div>
        </main>
      </div>
    </div>
  );
}
