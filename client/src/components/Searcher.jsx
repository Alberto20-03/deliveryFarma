import { useContext, useState } from 'react';
import { CartContext } from './context/cart-context';
import './components.css';

export default function Buscador() {
  const { setSearch, search } = useContext(CartContext);
  const [clickLupa, setClickLupa] = useState(false);

  function blurInput() {
    if (search.length < 1) {
      setClickLupa(false);
    }
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <>
      {clickLupa || search.length > 0 ? (
        <input
          onBlur={blurInput}
          className="inputText"
          value={search}
          type="text"
          id="buscador"
          placeholder="Busca el medicamento"
          onChange={(e) => onInputChange(e)}
          autoFocus
        />
      ) : (
        <img
          onClick={() => setClickLupa(true)}
          className="iconos"
          src="lupa.svg"
          alt="Lupa"
          height={30}
          width={30}
        />
      )}
    </>
  );
}
