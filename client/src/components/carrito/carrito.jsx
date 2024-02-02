import { useContext, useState } from 'react';
import './carrito.css';
import { CartContext } from '../context/cart-context';
import { PagoStripe } from '../pagos-stripe/pagos';

export function Carrito() {
  const [verCarrito, setVerCarrito] = useState(false); // gestiona el clic sobre el icono del carrito para mostrarlo
  const [verPagos, setVerPagos] = useState(false); // gestiona cuándo se debe mostrar el formulario para pagar
  const [cerrarCarrito, setCerrarCarrito] = useState(false); // gestiona cuando se debe cerrar el carrito

  const { cart, EliminarDeCarrito, user, setLogin } = useContext(CartContext);

  // al clicar en el icono actualiza los estados
  function clickCarrito(e) {
    e.preventDefault();
    setVerCarrito(true);
    setCerrarCarrito(true);
  }

  return (
    <div className="carrito">
      <img
        style={{ cursor: 'pointer' }}
        className="iconos"
        onClick={(e) => clickCarrito(e)}
        height={45}
        width={45}
        alt="Carrito"
        src="carrito.png"></img>

      {/* renderizado condicional para mostrar el carrito */}
      {verCarrito && (
        <div
          className="cerrar_carrito"
          onClick={(e) => {
            e.preventDefault();
            setCerrarCarrito(false);
            setVerCarrito(false);
          }}>
          {/* renderizado condicional para cerrar o abrir el carrito */}
          {cerrarCarrito && (
            <VerCarrito
              EliminarDeCarrito={EliminarDeCarrito}
              cart={cart}
              user={user}
              setLogin={setLogin}
              setVerCarrito={setVerCarrito}
              verPagos={verPagos}
              setVerPagos={setVerPagos}
            />
          )}
        </div>
      )}
    </div>
  );
}

// componente encargado de renderizar el carrito
function VerCarrito({
  cart,
  EliminarDeCarrito,
  user,
  setVerCarrito,
  setLogin,
  verPagos,
  setVerPagos,
}) {
  const envio = 3.99;

  return (
    <div className="containerCarrito" onClick={(e) => e.stopPropagation()}>
      <p className="titulo">RESUMEN DE COMPRA</p>
      <div className="containerProductos">
        {cart &&
          cart.map((el) => (
            <article key={Math.random()} className="productos">
              <div>
                <img className="fotoProducto" src={el.foto} alt={el.nombre} />
              </div>
              <div className="producto">
                <p className="nombreProducto">{el.nombre}</p>
                <div className="cantPrecioElim">
                  <div>
                    <span>{el.quantity} x </span>
                    <span>{el.precio}€</span>
                  </div>

                  <div>
                    <span>
                      <img
                        onClick={async () => await EliminarDeCarrito(el)}
                        style={{ cursor: 'pointer' }}
                        width={15}
                        height={15}
                        src="/papelera.png"
                        alt="papelera"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>
      <footer>
        <div>
          <span>Subtotal:</span>
          <span>{precioSubtotal(cart)}€</span>
        </div>
        <div>
          <span>Envío:</span>
          <span>{envio}€</span>
        </div>
        <span className="total">
          <span>Total</span>
          <span>{Number((precioSubtotal(cart) + envio).toFixed(2))}€</span>
        </span>
        {cart.length > 0 ? (
          <button
            onClick={() =>
              clickComprar(user, setVerCarrito, setLogin, setVerPagos)
            }
            className="btnComprar">
            Continuar
          </button>
        ) : (
          <button className="btnComprar">Continuar</button>
        )}
      </footer>
      {verPagos && (
        <div className="containerForm">
          <PagoStripe
            total={Number((precioSubtotal(cart) + envio).toFixed(2))}
            setVerPagos={setVerPagos}
            cart={cart}
          />
        </div>
      )}
    </div>
  );
}

// maneja el clic para mostrar el formulario de pago
function clickComprar(user, setLogin, setVerPagos) {
  if (user === '') {
    return setLogin(true);
  } else {
    setVerPagos(true);
  }
}

// asegurá que el precio mantenga el formato numérico correcto
function precioSubtotal(cart) {
  let precioSubT = 0;
  cart && cart.map((prod) => (precioSubT += prod.precio * prod.quantity));

  return Number(precioSubT.toFixed(2));
}
