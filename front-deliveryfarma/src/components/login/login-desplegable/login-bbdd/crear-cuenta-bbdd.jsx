import { URL_APP } from '../../../../constantes/const.js';

export function CrearCuentaBBDD(
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
) {
  e.preventDefault();
  setErrorContraseña(false);
  setErrorUsuario(false);
  setCorreoExis(false);

  const REGEXPCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const REGEXPContraseña = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if (!REGEXPCorreo.test(usuario) && usuario.length > 0) {
    setErrorUsuario(true);
  } else if (!REGEXPContraseña.test(contraseña)) {
    setErrorContraseña(true);
  } else {
    const data = {
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      contraseña: contraseña,
    };

    fetch(`${URL_APP}/crear-usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'El usuario ya existe') {
          return setCorreoExis(true);
        } else {
          setUser(usuario);
          setSesionIniciada(true);
          setTimeout(() => {
            setLogin(false);
          }, 500);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
