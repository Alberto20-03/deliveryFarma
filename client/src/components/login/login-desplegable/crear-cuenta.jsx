import { CrearCuentaBBDD } from './login-bbdd/crear-cuenta-bbdd';

export function CrearCuenta({
  setLogin,
  setNombre,
  correoExis,
  setApellido,
  setUsuario,
  errorUsuario,
  setContraseña,
  errorContraseña,
  nombre,
  apellido,
  usuario,
  contraseña,
  setErrorUsuario,
  setCorreoExis,
  setUser,
  setErrorContraseña,
  setIniciarSesion,
  setSesionIniciada,
}) {
  return (
    <div className="containerLogin" onClick={(e) => e.stopPropagation()}>
      <div className="loginDesplegable crear">
        <span onClick={async () => setLogin(false)} className="cerrar">
          x
        </span>
        <h3>Mi cuenta</h3>
        <form onSubmit={(e) => e.preventDefault()} action="" method="post">
          <div className="CrearSesion">
            <label htmlFor="nombre">Nombre*</label>
            <input
              required
              onChange={async (e) => await setNombre(e.target.value)}
              className="inputForm"
              type="text"
              name="nombre"
              id="nombre"
            />
          </div>
          <div className="CrearSesion">
            <label htmlFor="apellidos">Apellidos*</label>
            <input
              required
              onChange={async (e) => await setApellido(e.target.value)}
              className="inputForm"
              type="text"
              name="apellidos"
              id="apellidos"
            />
          </div>
          <div className="CrearSesion">
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
            {correoExis && (
              <p style={{ color: 'red' }}>*Ya está asociado a una cuenta</p>
            )}
            {errorUsuario && <p style={{ color: 'red' }}>*Correo no válido</p>}
          </div>
          <div className="CrearSesion">
            <label htmlFor="contraseña">Contraseña*</label>
            <input
              required
              onChange={async (e) => await setContraseña(e.target.value)}
              className="inputForm"
              type="password"
              name="contraseña"
              id="contraseña"
            />
            {errorContraseña && (
              <p style={{ color: 'red' }}>*Contraseña no válida</p>
            )}
          </div>
        </form>
        <p>
          <button
            type="submit"
            onClick={async (e) => {
              await CrearCuentaBBDD(
                e,
                nombre,
                apellido,
                usuario,
                contraseña,
                setErrorUsuario,
                setErrorContraseña,
                setCorreoExis,
                setUser,
                setLogin,
                setSesionIniciada
              );
            }}
            className="btnAcceder">
            Crear cuenta
          </button>
        </p>
        <div className="nuevo">
          <span>¿Tienes una cuenta creada?</span>
          <p>
            <button
              onClick={async () => await setIniciarSesion(true)}
              className="crearCuenta">
              Iniciar sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
