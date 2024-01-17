export async function peticionMensajeChatGPT(mensaje) {
  const peticion = await fetch('http://localhost:3100/dialogo-chat', {
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
