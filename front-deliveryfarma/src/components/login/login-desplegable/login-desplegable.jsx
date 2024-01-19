import { useState } from 'react';
import { IniciarSesion } from './iniciar-sesion';
import { CrearCuenta } from './crear-cuenta';

export function LoginDesplegable({
  iniciarSesion,
  setIniciarSesion,
  setLogin,
  user,
  setUser,
  nombre,
  setNombre,
  apellido,
  setApellido,
  usuario,
  setUsuario,
  setSesionIniciada,
}) {
  const [contraseña, setContraseña] = useState('');

  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState(false);
  const [correoExis, setCorreoExis] = useState(false);
  const [usuarioNoExis, setUsuarioNoExiste] = useState(false);

  return iniciarSesion ? (
    // Iniciar Sesion

    <IniciarSesion
      usuario={usuario}
      contraseña={contraseña}
      setLogin={setLogin}
      setUsuario={setUsuario}
      setUser={setUser}
      setIniciarSesion={setIniciarSesion}
      setContraseña={setContraseña}
      setUsuarioNoExiste={setUsuarioNoExiste}
      usuarioNoExis={usuarioNoExis}
      setNombre={setNombre}
      setApellido={setApellido}
      setSesionIniciada={setSesionIniciada}
    />
  ) : (
    // Crear Cuenta
    <CrearCuenta
      setLogin={setLogin}
      setNombre={setNombre}
      correoExis={correoExis}
      setApellido={setApellido}
      setUsuario={setUsuario}
      errorUsuario={errorUsuario}
      setContraseña={setContraseña}
      errorContraseña={errorContraseña}
      nombre={nombre}
      apellido={apellido}
      usuario={usuario}
      contraseña={contraseña}
      setErrorUsuario={setErrorUsuario}
      setCorreoExis={setCorreoExis}
      setUser={setUser}
      setErrorContraseña={setErrorContraseña}
      setIniciarSesion={setIniciarSesion}
      setSesionIniciada={setSesionIniciada}
    />
  );
}
