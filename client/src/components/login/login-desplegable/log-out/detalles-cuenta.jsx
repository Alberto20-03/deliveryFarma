import './log-out.css';

export function DetallesCuenta({
  nombre,
  apellido,
  usuario,
  setDetallesCuenta,
  setVerLogin,
}) {
  return (
    <div className="log-out-detalles">
      <h2>Hola, {nombre}</h2>
      <p className="tituloApartado">Información personal</p>
      <div>
        <p>
          Nombre: <strong>{`${nombre}  ${apellido}`}</strong>
        </p>
        <p>
          Correo: <strong>{usuario}</strong>
        </p>
      </div>
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setDetallesCuenta(false);
          setVerLogin(true);
        }}
        className="volver">
        <img width={15} height={15} src="/flecha-izq.png" alt="Volver" />
      </span>
    </div>
  );
}
