import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './pagos-stripe.css';

export default function CheckoutForm({ setVerPagos, total, cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [abrirDireccion, setAbrirDireccion] = useState(true);
  console.log(cart);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError(null);

    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      setError(error.message);
    } else {
      console.log(token);
    }
  };

  return (
    <div className="containerStripe">
      <form
        method="post"
        className="formPagar"
        autoComplete="false"
        onSubmit={handleSubmit}>
        <span
          onClick={() => setVerPagos(false)}
          className="cerrarContainerCheckout">
          x
        </span>

        <div className="productosCheckout">
          {cart.length > 0 &&
            cart.map((productos) => (
              <div className="containerProductoPagar" key={Math.random()}>
                <img
                  className="imgPagar"
                  src={productos.foto}
                  alt={productos.nombre}
                />
                <p className="nombrePrecio">
                  <span className="nombrePagar">{productos.nombre}</span>
                  <span>
                    {productos.quantity} x {productos.precio}€ ={' '}
                    {productos.precio * productos.quantity}€
                  </span>
                </p>
              </div>
            ))}
        </div>
        <div className="formCheckout">
          <div>
            <div className="contImg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png"
                alt="Visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                alt="Mastercard"
              />
              <img
                src="https://business.ticketmaster.es/wp-content/uploads/2022/07/klarna-logo-1.png"
                alt="Klarna"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/527px-PayPal_logo.svg.png"
                alt="Paypal"
              />
            </div>
            <div className="titularTarjeta">
              <input
                autoComplete="false"
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Titular de la tarjeta"
                required
              />
            </div>
            <div className="contCard">
              <CardElement />
            </div>

            {error && <div className="errorTarjeta">{error}</div>}
          </div>

          {/* Formulario direccion entrega */}
          <div>
            {abrirDireccion ? (
              <form className="formDireccionEntrega">
                <h3
                  className="tituloEntrega"
                  onClick={() => setAbrirDireccion(false)}>
                  Dirección de entrega{' '}
                  <img
                    className="abrirDesplegar"
                    src="flecha-abajo.png"
                    alt="Desplegable"
                    width={12}
                    height={13}
                  />
                </h3>
                <label htmlFor="nombreApellidos">Nombre y apellidos</label>
                <input
                  type="text"
                  name="nombreApellidos"
                  id="nombreApellidos"
                  required
                />
                <div className="correoMovil">
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '80%',
                    }}>
                    <label htmlFor="correoE">Correo electrónico</label>
                    <input
                      style={{ width: '90%' }}
                      type="text"
                      name="correoE"
                      id="correoE"
                      required
                    />
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <label htmlFor="tlf">Móvil</label>{' '}
                    <input
                      style={{ width: '100px' }}
                      type="tel"
                      name="tlf"
                      id="tlf"
                      required
                      maxLength={9}
                    />
                  </span>
                </div>

                <div className="ciudadCp">
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '80%',
                    }}>
                    <label htmlFor="Ciudad">Ciudad</label>
                    <input
                      style={{ width: '90%' }}
                      type="text"
                      name="Ciudad"
                      id="Ciudad"
                      required
                    />
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="CP">Código postal</label>
                    <input
                      style={{ width: '100px' }}
                      type="tel"
                      name="CP"
                      id="CP"
                      maxLength={5}
                      required
                    />
                  </span>
                </div>
                <label htmlFor="Direccion">Dirección</label>
                <input type="text" name="Direccion" id="Direccion" required />
              </form>
            ) : (
              <>
                <h3
                  className="tituloEntrega"
                  onClick={() => setAbrirDireccion(true)}>
                  Dirección de entrega{' '}
                  <img
                    className="abrirDesplegar"
                    src="flecha-abajo.png"
                    alt="Desplegable"
                    width={12}
                    height={13}
                  />
                </h3>
              </>
            )}
          </div>

          <div className="conTotalBtn">
            <p className="subtotalPagar">
              <span>Subtotal:</span>
              <span>{Number(total - 3.99).toFixed(2)}€</span>
            </p>
            <p className="subtotalPagar">
              <span>Envío:</span>
              <span>3.99€</span>
            </p>
            <p className="totalPagar">
              <span className="totalPrecio">
                <span>Total: </span> <span>{total}€</span>
              </span>
            </p>
            <button className="btnPagar" type="submit" disabled={!stripe}>
              Finalizar compra
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
