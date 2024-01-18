import { IniciarSesionBBDD } from './login-bbdd/iniciar-sesion-bbdd';

export function IniciarSesion({
  usuario,
  contraseña,
  setLogin,
  setUser,
  setUsuario,
  setIniciarSesion,
  setContraseña,
  setUsuarioNoExiste,
  usuarioNoExis,
  setNombre,
  setApellido,
  setSesionIniciada,
}) {
  return (
    <div className="containerLogin" onClick={(e) => e.stopPropagation()}>
      <div className="loginDesplegable iniciar">
        <span onClick={async () => setLogin(false)} className="cerrar">
          x
        </span>
        <h3>Mi cuenta</h3>
        <form action="" method="post">
          <div className="IniciarSesion">
            <label htmlFor="correo">Email*</label>
            <input
              required
              onChange={async (e) => await setUsuario(e.target.value)}
              className="inputForm"
              type="email"
              name="correo"
              id="correo"
              autoFocus
            />
          </div>
          <div className="IniciarSesion">
            <label htmlFor="contraseña">Contraseña*</label>
            <input
              required
              onChange={async (e) => await setContraseña(e.target.value)}
              className="inputForm"
              type="password"
              name="contraseña"
              id="contraseña"
            />
          </div>
          {usuarioNoExis && (
            <p style={{ color: 'red' }}>Las credeenciales no son correctas</p>
          )}
        </form>
        <p>
          <button
            type="submit"
            className="btnAcceder"
            onClick={async () =>
              IniciarSesionBBDD(
                usuario,
                contraseña,
                setUser,
                setLogin,
                setUsuarioNoExiste,
                setNombre,
                setApellido,
                setSesionIniciada
              )
            }>
            Iniciar sesión
          </button>
        </p>
        <div className="nuevo">
          <span>¿Eres nuevo?</span>
          <p>
            <button
              onClick={async () => await setIniciarSesion(false)}
              className="crearCuenta">
              Crear Cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
