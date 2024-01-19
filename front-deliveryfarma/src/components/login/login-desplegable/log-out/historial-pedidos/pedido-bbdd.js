import { URL_APP } from "../../../../../constantes/const.js";

export async function PedidoBBDD (usuario) {

    const response = await fetch(`${URL_APP}/historial-pedidos`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: usuario 
    })

    if(!response.ok) console.error('HTTP Error')
    
    const data = await response.json();

      if (data.message == 'Este usuario tiene más de un pedido') {
        return data.data;
      } else if (data.message == 'Este usuario tiene un pedido') {
        return data.data;
      }
}
