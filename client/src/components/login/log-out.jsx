import { useContext } from 'react';
import { DetallesCuenta } from './login-desplegable/log-out/detalles-cuenta';
import { HistorialPedidos } from './login-desplegable/log-out/historial-pedidos';
import { CartContext } from '../context/cart-context';

export function MenuLogout({
  setVerLogin,
  nombre,
  setUser,
  apellido,
  usuario,
  setDetallesCuenta,
  setHistorialPedidos,
}) {
  const { setSesionIniciada } = useContext(CartContext);

  return (
    <div className="menuLogout" onClick={(e) => e.stopPropagation()}>
      <p className="txtLogout">Hola, {nombre}</p>
      <p
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setVerLogin(false);
          setDetallesCuenta(true);
        }}>
        <img src="/detalles-cuenta.png" alt="Detalles de cuenta" />
        <span>Detalles de la cuenta</span>
      </p>
      <p
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setVerLogin(false);
          setHistorialPedidos(true);
        }}>
        <img src="/historial-pedidos.png" alt="Historial pedidos" />
        <span>Historial de pedidos</span>
      </p>

      <button
        className="btnCerrarSesion"
        onClick={(e) => {
          e.preventDefault();
          setUser('');
          setSesionIniciada(false);
        }}>
        Cerrar sesión
      </button>
    </div>
  );
}
