import { Data } from '../../utils/getProductos';
import { CartContext } from '../context/cart-context';
import './card-medicines.css';
import { useContext, useState } from 'react';

export function CardMedicines() {
  const medicinas = Data();
  const { search, AñadirACarrito } = useContext(CartContext);

  return (
    <>
      {medicinas && medicinas.productos ? (
        medicinas.productos
          .filter((medicamento) => {
            if (search.length > 0) {
              const nombre = medicamento.nombre.toUpperCase();

              return nombre.includes(search.toUpperCase());
            }
          })
          .map((result) => (
            <Card
              key={result.nregistro}
              result={result}
              AñadirACarrito={AñadirACarrito}
            />
          ))
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </>
  );
}

function nombreMedicamento(nombre) {
  const regex = /^(.*?)\s(\d+\s?MG).*$/i;

  const match = nombre.match(regex);

  if (match) {
    return match[1] + ' ' + match[2];
  } else {
    const palabras = nombre.split(/\s+/);
    const palabrasCortadas = palabras.slice(0, 6);

    const palabrasEspecificas = [
      'DURAS',
      'INYECTABLE',
      'DISOLVENTE',
      'RECUBIERTOS',
    ];

    for (const palabra of palabras) {
      if (palabrasEspecificas.includes(palabra.toUpperCase())) {
        break;
      }
    }

    return palabrasCortadas.join(' ');
  }
}

const Card = ({ result, AñadirACarrito }) => {
  const [detalleMedicina, setDetalleMedicina] = useState(false);

  function clickImg(e, result) {
    e.preventDefault();
    AñadirACarrito(result);
  }
  return (
    <article className="card">
      {detalleMedicina && (
        <DetallesMedicamento
          result={result}
          setDetalleMedicina={setDetalleMedicina}
          clickImg={clickImg}
        />
      )}
      <div onClick={() => setDetalleMedicina(true)} className="imagenCard">
        <img
          className="fotoMedicamento"
          src={result.foto}
          alt={result.nombre}
        />
      </div>
      <p className="nombre">{nombreMedicamento(result.nombre)}</p>
      <p className="laboratorio">{result.laboratorio}</p>
      <span className="precio">{result.precio}€</span>
      <button className="addCart" onClick={(e) => clickImg(e, result)}>
        Añadir al carrito
      </button>
    </article>
  );
};

function DetallesMedicamento({ result, setDetalleMedicina, clickImg }) {
  console.log(result);
  return (
    <div
      className="containerDetallesMedicamento"
      onClick={(e) => {
        e.stopPropagation();
        setDetalleMedicina(false);
      }}>
      <div onClick={(e) => e.stopPropagation()} className="detalleMedicamento">
        <div className="detalleGeneral">
          <div className="detalleGeneral-img">
            <span onClick={() => setDetalleMedicina(false)} className="cerrar">
              x
            </span>
            <img
              width={250}
              height={150}
              src={result.foto}
              alt={result.nombre}
            />
          </div>

          <div className="detallesInfo">
            <h3>{nombreMedicamento(result.nombre)}</h3>
            <p className="laboratorio">{result.laboratorio}</p>
            <h4 className="precio detalle">{result.precio} €</h4>
            <span className="addCart info" onClick={(e) => clickImg(e, result)}>
              Añadir al carrito
            </span>
          </div>
        </div>
        <div>
          <ul className="listaDetalles">
            <li>Apto para conducir: {result.conduc == 0 ? 'No' : 'Sí'}</li>
            <li>Necesita receta: {result.receta == 0 ? 'No' : 'Sí'}</li>
            <li>Comerciable: {result.comerciable == 0 ? 'No' : 'Sí'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
