import { Pedidos } from './historial-pedidos/pedido';

export function HistorialPedidos({
  usuario,
  setHistorialPedidos,
  setVerLogin,
}) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="containerHistorial">
      <div className="log-out-historial">
        <h2>Mis pedidos</h2>
        <div className="pedidos">
          <Pedidos usuario={usuario} />
        </div>
        <span onClick={() => setHistorialPedidos(false)} className="cerrar">
          x
        </span>
        <span
          onClick={() => {
            setHistorialPedidos(false);
            setVerLogin(true);
          }}
          style={{ cursor: 'pointer' }}
          className="volver">
          <img height={15} width={20} src="/flecha-izq.png" alt="Volver" />
        </span>
      </div>
    </div>
  );
}
