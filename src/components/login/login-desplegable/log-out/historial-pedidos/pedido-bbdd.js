export async function PedidoBBDD (usuario) {

    const response = await fetch('http://localhost:3100/historial-pedidos', {
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
