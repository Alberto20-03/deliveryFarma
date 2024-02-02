import { useContext, useEffect, useRef, useState } from 'react';
import './bocadillo-dialogo.css';
import { CartContext } from '../context/cart-context';
import { peticionMensajeChatGPT } from './mensaje-chatgpt';

// componente que renderiza el chatbot de la aplicación
export default function Dialogo() {
  const [verDialogo, setVerDialogo] = useState(false); // gestiona si se debe visualizar el dialogo
  const [mensaje, setMensaje] = useState(''); // almacena el mensaje para añadirlo al dialogo
  const [historial, setHistorial] = useState([]); // Almacena el historial de mensajes
  const [enviandoRespuesta, setEnviandoRespuesta] = useState(false); // mientras se esta procesando la respuesta de chatGPT será true

  const { nombre, sesionIniciada } = useContext(CartContext);

  // gestiona los mensajes del usuario y de la API
  async function submitMensajeUsuario(e) {
    e.preventDefault();
    if (mensaje.length > 1) {
      // añade el mensaje del usuario al historial
      setHistorial((prevHistorial) => [
        ...prevHistorial,
        { mensaje: mensaje, autor: 'usuario' },
      ]);
      setEnviandoRespuesta(true);

      // envía el mensaje del usuario a la API de ChatGPT para obtener una respuesta
      const respuesta = await peticionMensajeChatGPT(mensaje);
      setEnviandoRespuesta(false);
      setHistorial((prevHistorial) => [
        ...prevHistorial,
        { mensaje: respuesta, autor: 'chatgpt' },
      ]);
      setMensaje('');
    }
  }

  return verDialogo ? (
    <div className="cerrar-modal" onClick={() => setVerDialogo(false)}>
      <div className="modal-dialogo" onClick={(e) => e.stopPropagation()}>
        <h3>¿Necesitas ayuda?</h3>
        <main className="container-dialogo">
          {/* para utilizar esta funcionalidad se debe haber iniciad sesión previamente */}
          {sesionIniciada ? (
            <>
              <DialogoChat
                historial={historial}
                nombre={nombre}
                enviandoRespuesta={enviandoRespuesta}
              />

              <div className="container-entrada-usuario">
                {/* renderizado condicional para indicar al usuario que se está procesando la respuesta  */}
                {enviandoRespuesta ? (
                  <textarea
                    onChange={(e) => setMensaje(e.target.value)}
                    className="entrada-usuario"
                    type="text"
                    name="entrada-usuario"
                    id="entrada-usuario"
                    placeholder="Escribenos"
                    autoFocus
                    value={'Escribiendo respuesta...'}
                    readOnly
                  />
                ) : (
                  <textarea
                    onChange={(e) => setMensaje(e.target.value)}
                    className="entrada-usuario"
                    type="text"
                    name="entrada-usuario"
                    id="entrada-usuario"
                    placeholder="Escribenos"
                    autoFocus
                    value={mensaje}
                  />
                )}

                <img
                  onClick={(e) => submitMensajeUsuario(e)}
                  className="avion-enviar"
                  height={20}
                  width={20}
                  src="avion-enviar.png"
                  alt="Enviar"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="texto-usuario-no-registrado">
                  Debes iniciar sesión para poder hablar con nuestro equipo
                </p>
              </div>

              <div className="container-entrada-usuario">
                <textarea
                  className="entrada-usuario"
                  type="text"
                  name="entrada-usuario"
                  id="entrada-usuario"
                  placeholder="Escribenos"
                  readOnly
                />

                <img
                  className="avion-enviar"
                  height={20}
                  width={20}
                  src="avion-enviar.png"
                  alt="Enviar"
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  ) : (
    <div className="Dialogo-emergente">
      <img
        onClick={() => setVerDialogo(true)}
        height={70}
        width={70}
        src="bocadillo_dialogo.png"
        alt="Preguntas"
      />
    </div>
  );
}

// componente qie renderiza el chat
function DialogoChat({ historial, nombre, enviandoRespuesta }) {
  const dialogoRef = useRef(null);

  useEffect(() => {
    // mantiene el scroll del chat siempre en la parte de abajo
    if (dialogoRef.current) {
      dialogoRef.current.scrollTop = dialogoRef.current.scrollHeight;
    }
  }, [historial]);

  return (
    <div className="dialogo" ref={dialogoRef}>
      {historial.map((ms) => (
        <div key={Math.random()}>
          {ms.autor == 'usuario' ? (
            <p className="Usuario">
              <span>{nombre.charAt(0).toUpperCase()}</span> {nombre}
            </p>
          ) : (
            <p className="chatGpt">
              <img height={27} width={27} src="logo.png" /> Asistente
            </p>
          )}

          <p key={Math.random()} className="texto-usuario">
            {ms.mensaje}
          </p>
        </div>
      ))}
      {enviandoRespuesta && (
        <p className="cargando">Escribiendo respuesta...</p>
      )}
    </div>
  );
}
