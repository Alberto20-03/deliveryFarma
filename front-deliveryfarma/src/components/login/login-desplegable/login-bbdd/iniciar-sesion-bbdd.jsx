import { URL_APP } from '../../../../constantes/const.js';

export function IniciarSesionBBDD(
  usuario,
  contraseña,
  setUser,
  setLogin,
  setUsuarioNoExiste,
  setNombre,
  setApellido,
  setSesionIniciada
) {
  setUsuarioNoExiste(false);

  const data = {
    usuario: usuario,
    contraseña: contraseña,
  };

  const REGEXPCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const REGEXPContraseña = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  if (!REGEXPCorreo.test(usuario) && usuario.length > 0) {
    setUsuarioNoExiste(true);
  } else if (!REGEXPContraseña.test(contraseña)) {
    setUsuarioNoExiste(true);
  } else {
    fetch(`${URL_APP}/iniciar-sesion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == 'Usuario registrado') {
          setUser(usuario);
          setNombre(data.nombre);
          setApellido(data.apellido);
          setSesionIniciada(true);
          return setTimeout(() => {
            setLogin(false);
          }, 500);
        } else {
          setUsuarioNoExiste(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
