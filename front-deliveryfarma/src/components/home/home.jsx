import { useState } from 'react';
import { Carrusel } from '../carrusel-info/carrusel-info.jsx';
import { CarruselLabs } from '../carrusel-labs/carrusel-labs.jsx';
import './home.css';

export function Home() {
  const [correo, setCorreo] = useState('');
  return (
    <>
      <Carrusel />
      <div className="containerHome">
        <img
          className="promo"
          src="https://www.pmfarma.com/articulos/contenido/2540/image/33.jpg"
          alt="Promo"
        />
        <img
          className="promocion"
          src="https://www.farmaelglobo.com/img/cms/octubre22/banner-2-movil-octubre.png"
          alt="Promociones"
        />
      </div>
      <CarruselLabs />
      <footer className="footer">
        <div className="newsletter">
          <footer>
            <span>
              <p>
                <img
                  width={20}
                  height={20}
                  src="/check-verde.png"
                  alt="check"
                />
                {'   '}Promociones exclusivas
              </p>
              <p>
                <img
                  width={20}
                  height={20}
                  src="/check-verde.png"
                  alt="check"
                />
                {'   '}Recomendaciones individuales
              </p>
              <p>
                <img
                  width={20}
                  height={20}
                  src="/check-verde.png"
                  alt="check"
                />
                {'   '}Consejos útiles para la salud
              </p>
            </span>
            <div>
              <h3>NEWSLETTER</h3>
              <p>
                Suscríbete para estar al día de nuestras novedades y ofertas
              </p>
              <form onSubmit={(e) => submitNewsletter(e, setCorreo)}>
                <input
                  onChange={(e) => setCorreo(e.target.value)}
                  className="input"
                  type="email"
                  name="newsletter"
                  id="newsletter"
                  placeholder="Correo electrónico"
                  value={correo}
                />
                <p>
                  <button className="btn-suscrib">Suscribirse</button>
                </p>
              </form>
            </div>
          </footer>
        </div>

        <div className="contacto">
          <h2>FarmaDelivery</h2>

          <p>Envíos gratuitos a partir de 60€</p>
          <p className="entrega">Entregas en 24h - 48h</p>
          <p className="empresas-reparto">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Correos_logo.svg/1200px-Correos_logo.svg.png"
              alt="Correos"
              height={20}
              width={70}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/SEUR_logo.svg/2560px-SEUR_logo.svg.png"
              alt="Seur"
              height={13}
              width={70}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MRW_logo.svg/2560px-MRW_logo.svg.png"
              alt="MRW"
              height={13}
              width={65}
            />
            <img
              src="https://www.logweb.com.br/wp-content/uploads/2021/01/DHL-LOGO.jpg"
              alt="DHL"
              height={17}
              width={50}
            />
          </p>
          <p className="pago-seguro">
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747305.png"
                alt="candado"
                height={20}
                width={20}
              />
              Pago seguro
            </span>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png"
              alt="Stripe"
              height={25}
              width={60}
            />
          </p>
        </div>
      </footer>
    </>
  );
}

function submitNewsletter(e, setCorreo) {
  e.preventDefault();
  setCorreo('');

  return (e.target.value = '');
}
