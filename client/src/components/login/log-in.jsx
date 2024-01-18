export function MenuLogin({ setVerLogin, setLogin }) {
  function clickMenuLogin() {
    setLogin(true);
    setVerLogin(false);
  }

  return (
    <div className="menuLogin" onClick={(e) => e.stopPropagation()}>
      <p className="txtLogin">Identifícate para una mejor experiencia</p>
      <button onClick={clickMenuLogin} className="btnIniciarSesion">
        Iniciar sesión
      </button>
    </div>
  );
}
