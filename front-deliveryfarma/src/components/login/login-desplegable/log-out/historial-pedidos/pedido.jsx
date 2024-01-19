import { useEffect, useState } from 'react';
import { PedidoBBDD } from './pedido-bbdd';

export function Pedidos({ usuario }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    PedidoBBDD(usuario)
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetch:', error));
  }, [usuario]);

  if (!data) {
    return <div>No tienes pedidos</div>;
  }

  return (
    <div>
      {data.length > 1 ? (
        data.map((pedido) => {
          return pedido.productos_json.length > 1 ? (
            pedido.productos_json.map((producto) => (
              <div key={Math.random()}>
                <TarjetaPedidos data={producto} />
              </div>
            ))
          ) : (
            <TarjetaPedidos data={pedido.productos_json} />
          );
        })
      ) : data.productos_json.length > 1 ? (
        <div key={Math.random()}>
          {data.productos_json.map((producto) => (
            <TarjetaPedidos key={Math.random()} data={producto} />
          ))}
        </div>
      ) : (
        <div>
          <TarjetaPedidos data={data.productos_json} />
        </div>
      )}
    </div>
  );
}

function TarjetaPedidos({ data }) {
  const pedido = JSON.parse(data);

  return pedido.length > 1 ? (
    <div className="containerPedido">
      <h3>Pedido deliveryFarma</h3>
      {pedido.map((producto) => (
        <div key={Math.random()} className="Pedido">
          <div className="containerProducto">
            <p>
              <span>Nº Registro</span>
              {/* escribir bien producto */}
              <span>{producto.poducto_nregistro}</span>
            </p>
            <p>
              <span>Precio</span>
              <span>{producto.precio_unid}</span>
            </p>
            <p>
              <span>Cantidad</span>
              <span>{producto.cantidad}</span>
            </p>
            <p>
              <span>Precio total</span>
              <span>
                {Number(producto.cantidad * producto.precio_unid).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="containerPedido">
      <h3>Pedido deliveryFarma</h3>
      <div className="Pedido">
        <div className="containerProducto">
          <p>
            <span>Nº Registro</span>
            {/* escribir bien producto */}
            <span>{pedido[0].poducto_nregistro}</span>
          </p>
          <p>
            <span>Precio</span>
            <span>{pedido[0].precio_unid}</span>
          </p>
          <p>
            <span>Cantidad</span>
            <span>{pedido[0].cantidad}</span>
          </p>
          <p>
            <span>Precio total</span>
            <span>
              {Number(pedido[0].cantidad * pedido[0].precio_unid).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
