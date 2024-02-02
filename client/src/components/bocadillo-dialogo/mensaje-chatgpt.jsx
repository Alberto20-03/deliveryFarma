import { URL_APP } from '../../constantes';

// componente que realiza una petición a la API con el mensaje del usuario
export async function peticionMensajeChatGPT(mensaje) {
  const peticion = await fetch(`${URL_APP}/dialogo-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(mensaje),
  });
  const json = await peticion.json();
  return await json.respuesta.message.content;
}
