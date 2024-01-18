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
  const [iniciarSesion, setIniciarSesion] = useState(true); //Menu para iniciarSesion o para crearCuenta
  const [apellido, setApellido] = useState(''); //Apellido del usuario
  const [usuario, setUsuario] = useState(''); // Correo del usuario
  const [detallesCuenta, setDetallesCuenta] = useState(false);
  const [historialPedidos, setHistorialPedidos] = useState(false);

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

      {verLogin &&
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
      {detallesCuenta && (
        <DetallesCuenta
          nombre={nombre}
          apellido={apellido}
          usuario={usuario}
          setDetallesCuenta={setDetallesCuenta}
          setVerLogin={setVerLogin}
        />
      )}

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
