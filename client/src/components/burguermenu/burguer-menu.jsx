import { useContext, useState } from 'react';
import './burguer-menu.css';
import { CartContext } from '../context/cart-context';

export function BurguerMenu() {
  // to change burger classes
  const [burguerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { setSearch, setVerLogin } = useContext(CartContext);

  // toggle burger menu change
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

  function clickCuenta() {
    setBurgerClass('burger-bar unclicked');
    setMenuClass('menu hidden');
    setIsMenuClicked(!isMenuClicked);
    setVerLogin(true);
  }

  function clickCategoria() {
    setBurgerClass('burger-bar unclicked');
    setMenuClass('menu hidden');
    setIsMenuClicked(!isMenuClicked);
    setSearch('a');
  }

  return (
    <div className="containerMenu">
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
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
