import mysql from 'mysql';
import http from 'http';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.API_KEY_CHATGPT });

async function chatGPT(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'Responde en un maximo de 3 lineas como si fueras un farmaceutico: ' +
          message,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return completion.choices[0];
}

const conexion = mysql.createConnection({
  host: process.env.URL_BD,
  user: process.env.USUARIO_BD,
  password: process.env.PWD_BD,
  database: process.env.DB,
  port: process.env.PUERTO_BD,
});
const PORT = process.env.PORT || process.env.PUERTO_BD;

conexion.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    throw err;
  }


  http
    .createServer((req, res) => {
      // res.setHeader(
      //   'Access-Control-Allow-Origin',
      //   'https://delivery-farma.vercel.app'
      // );
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      cors()(req, res);

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (req.method == 'GET' && req.url == '/productos') {
        conexion.query('SELECT * FROM productos', (error, results) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error al obtener datos' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ productos: results }));
          }
        });
      } else if (req.method == 'POST' && req.url == '/crear-usuario') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const userData = JSON.parse(body);

          conexion.query(
            `SELECT * from usuarios WHERE correo = "${userData.usuario}"`,
            (error, results) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({ message: 'Error en la base de datos' })
                );
              } else {
                if (results.length === 0) {
                  conexion.query(
                    `INSERT INTO usuarios (correo, nombre, apellidos, contraseña) VALUES("${userData.usuario}", "${userData.nombre}", "${userData.apellido}", "${userData.contraseña}")`,
                    (error, results) => {
                      if (error) {
                        res.writeHead(404, {
                          'Content-Type': 'application/json',
                        });
                        res.end(
                          JSON.stringify({
                            message: 'Error al crear el usuario',
                          })
                        );
                      } else {
                        res.writeHead(201, {
                          'Content-Type': 'application/json',
                        });
                        res.end(
                          JSON.stringify({
                            message: 'Usuario creado exitosamente',
                          })
                        );
                      }
                    }
                  );
                } else {
                  res.writeHead(404, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'El usuario ya existe' }));
                }
              }
            }
          );
        });
      } else if (req.method == 'POST' && req.url == '/iniciar-sesion') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const userData = JSON.parse(body);

          conexion.query(
            `SELECT * from usuarios WHERE correo = "${userData.usuario}" AND contraseña = "${userData.contraseña}"`,
            (error, results) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({ message: 'Error en la base de datos' })
                );
              } else {
                if (results.length === 0) {
                  res.writeHead(404, {
                    'Content-Type': 'application/json',
                  });

                  res.end(
                    JSON.stringify({
                      message: 'No se encontró ningún usuario',
                    })
                  );
                } else {
                  res.writeHead(201, {
                    'Content-Type': 'application/json',
                  });
                  res.end(
                    JSON.stringify({
                      nombre: results[0].nombre,
                      apellido: results[0].apellidos,
                      message: 'Usuario registrado',
                    })
                  );
                }
              }
            }
          );
        });
      } else if (req.method == 'POST' && req.url == '/historial-pedidos') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const userData = body;

          conexion.query(
            `SELECT pedidos.id, pedidos.productos_json, pedidos.precio_total, pedidos.fecha_pedido FROM pedidos WHERE pedidos.usuario_correo = "${userData}" ORDER BY pedidos.fecha_pedido DESC`,
            (error, results) => {
              if (error) {
                console.log(error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(
                  JSON.stringify({ message: 'Error en la base de datos' })
                );
              } else {
                if (results.length === 0) {
                  setTimeout(() => {
                    if (results.length === 0) {
                      res.writeHead(404, {
                        'Content-Type': 'application/json',
                      });
                      res.end(
                        JSON.stringify({
                          message: 'Este usuario no tiene pedidos',
                        })
                      );
                    }
                  }, 100);
                } else {
                  if (results.length > 1) {
                    const data = {
                      id: [],
                      productos_json: [],
                      precio_total: [],
                      fecha_pedido: [],
                    };
                    let pos = 0;
                    results.map((el) => {
                      data.id[pos] = el.id;
                      data.productos_json[pos] = el.productos_json;
                      data.precio_total[pos] = el.precio_total;
                      data.fecha_pedido[pos] = el.fecha_pedido;
                      pos++;
                    });

                    res.writeHead(201, {
                      'Content-Type': 'application/json',
                    });

                    res.end(
                      JSON.stringify({
                        data: data,
                        message: 'Este usuario tiene más de un pedido',
                      })
                    );
                  } else {
                    res.writeHead(201, {
                      'Content-Type': 'application/json',
                    });

                    res.end(
                      JSON.stringify({
                        data: {
                          id: results[0].id,
                          productos_json: results[0].productos_json,
                          precio_total: results[0].precio_total,
                          fecha_pedido: results[0].fecha_pedido,
                        },
                        message: 'Este usuario tiene un pedido',
                      })
                    );
                  }
                }
              }
            }
          );
        });
      } else if (req.method == 'POST' && req.url == '/dialogo-chat') {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const userData = body;

          async function respuesta() {
            let respuestaIA = await chatGPT(userData);

            return res.end(
              JSON.stringify({
                respuesta: respuestaIA,
              })
            );
          }
          respuesta();
        });
      } else if (req.method == 'POST' && req.url == '/pago') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const { token, amount } = querystring.parse(body);
          pasarelaPago(res, token, amount);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    })
    .listen(PORT, () => {
      console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
    });
});

async function pasarelaPago(res, token, amount) {
  const paymentIntent = await Stripe.paymentIntents.create({
    amount: amount,
    currency: 'eur',
    payment_method: token,
    confirm: true,
  });

  // Retorna el cliente secreto del intento de pago
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ client_secret: paymentIntent.client_secret }));
}
