import { useContext, useState } from 'react';
import './login.css';
import { CartContext } from '../context/cart-context';
import { LoginDesplegable } from './login-desplegable/login-desplegable';
import { MenuLogout } from './log-out';
import { MenuLogin } from './log-in';
import { DetallesCuenta } from './login-desplegable/log-out/detalles-cuenta';
import { HistorialPedidos } from './login-desplegable/log-out/historial-pedidos';

export function Login() {
  const {
    user,
    setUser,
    login,
    setLogin,
    nombre,
    setNombre,
    setSesionIniciada,
    setVerLogin,
    verLogin,
  } = useContext(CartContext);

  const [cerrarLogin, setCerrarLogin] = useState(false);
  const [iniciarSesion, setIniciarSesion] = useState(true); // menu para iniciar sesion o para crear cuenta
  const [apellido, setApellido] = useState(''); // apellido del usuario
  const [usuario, setUsuario] = useState(''); // correo del usuario
  const [detallesCuenta, setDetallesCuenta] = useState(false); // para mostrar los detalles de la cuenta
  const [historialPedidos, setHistorialPedidos] = useState(false); // para mostrar el historial de pedidos realizados

  function clickLogin() {
    setVerLogin(!verLogin);
    setCerrarLogin(true);
  }

  return (
    <>
      <img
        style={{ cursor: 'pointer' }}
        className="iconos"
        onClick={clickLogin}
        height={30}
        width={30}
        alt="Login"
        src="sesion.png"
      />
      {user && <span className="nombre-usuario">{nombre}</span>}
      {/* al clicar en el icono de sesión se desplegará el menú de login pequeño */}
      {verLogin &&
        // dependiendo si se ha iniciado sesión o no se motrará el menú  para iniciar sesión o para cerrarla
        (user.length < 1 ? (
          <div
            className="cerrar_verlogin"
            onClick={(e) => {
              e.preventDefault();
              setCerrarLogin(false);
              setVerLogin(false);
            }}>
            <MenuLogin
              setLogin={setLogin}
              setVerLogin={setVerLogin}
              nombre={nombre}
            />
          </div>
        ) : (
          <div
            className="cerrar_verlogin"
            onClick={(e) => {
              e.preventDefault();
              setCerrarLogin(false);
              setVerLogin(false);
            }}>
            {cerrarLogin && (
              <MenuLogout
                setVerLogin={setVerLogin}
                setDetallesCuenta={setDetallesCuenta}
                nombre={nombre}
                setUser={setUser}
                apellido={apellido}
                usuario={usuario}
                setHistorialPedidos={setHistorialPedidos}
              />
            )}
          </div>
        ))}
      {/* el código posterior hace referencia a las acciones posibles dentro del menú de login anterior */}

      {/* si se ha clicado en el menú login anterior para iniciar sesión 
      se desplegará el menú que contiene el formulario para iniciar sesión */}
      {login && (
        <LoginDesplegable
          user={user}
          setUser={setUser}
          setLogin={setLogin}
          iniciarSesion={iniciarSesion}
          setIniciarSesion={setIniciarSesion}
          nombre={nombre}
          setNombre={setNombre}
          apellido={apellido}
          setApellido={setApellido}
          usuario={usuario}
          setUsuario={setUsuario}
          setSesionIniciada={setSesionIniciada}
        />
      )}

      {/* si se clica sobre detalles de la cuenta se mostrará la información de la cuenta */}
      {detallesCuenta && (
        <DetallesCuenta
          nombre={nombre}
          apellido={apellido}
          usuario={usuario}
          setDetallesCuenta={setDetallesCuenta}
          setVerLogin={setVerLogin}
        />
      )}

      {/* si se clica sobre el historial de pedidos se mostrarán los pedidos realizados */}
      {historialPedidos && (
        <HistorialPedidos
          usuario={usuario}
          setHistorialPedidos={setHistorialPedidos}
          setVerLogin={setVerLogin}
        />
      )}
    </>
  );
}
