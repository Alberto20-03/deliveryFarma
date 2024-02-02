import './carrusel-labs.css';

// componente que renderiza las imagenes de los laboratorios
export function CarruselLabs() {
  return (
    <div className="slider">
      <div className="CarruselLabs">
        <div className="lab">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5e92232525a0ae61d83285c1/1588362595519-ICTK3FJN0E1NNNQS5UAS/Bristol+Myers+Squibb+updated+web+5.1.png"
            alt="Bristol-Myers Squibb"
          />
        </div>

        <div className="lab">
          <img
            src="https://media.aubi-plus.com/uploads/institutionen/large/13132b9-cslbehring_cmyk_highres.jpg"
            alt="Behring Gmbh"
          />
        </div>

        <div className="lab">
          <img
            src="data:image/png;base64,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"
            alt="Sandoz"
          />
        </div>

        <div className="lab">
          <img
            src="https://www.uma.es/media/tinyimages/img/image_9520.jpeg"
            alt="GP Pharm"
          />
        </div>

        <div className="lab">
          <img
            src="https://dstzx1oir7p7j.cloudfront.net/media/5840/stada_spain_logo_new.jpeg"
            alt="Stada"
          />
        </div>

        <div className="lab">
          <img
            src="https://cdn.accord-healthcare.com/es-d9/public/asset/Accord_Logo_-_02--at.jpg"
            alt="Accord"
          />
        </div>

        <div className="lab">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Biogen_logo.svg/2560px-Biogen_logo.svg.png"
            alt="Biogen"
          />
        </div>

        <div className="lab">
          <img
            src="https://www.easp.es/wp-content/uploads/2023/07/novavax-logo-300x147.png"
            alt="Novavax"
          />
        </div>

        <div className="lab">
          <img
            src="https://www.novartis.com/sites/novartis_com/files/styles/webp/public/2021-10/novartis-logo-transparent.png.webp?itok=-VFFv5qx"
            alt="Novartis"
          />
        </div>

        <div className="lab">
          <img
            src="https://www.cinfa.com/uploads/Logotipo-Cinfa.jpg"
            alt="cinfa"
          />
        </div>

        <div className="lab">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Astellas_logo.svg/2560px-Astellas_logo.svg.png "
            alt="Astellas"
          />
        </div>

        <div className="lab">
          <img
            src="https://ecomercioagrario.com/wp-content/uploads/2020/07/bayerlogo-vp.jpg"
            alt="Bayer"
          />
        </div>

        <div className="lab">
          <img
            src="https://www.cnic.es/sites/default/files/ferrer.png"
            alt="Ferrer Internacional"
          />
        </div>

        <div className="lab">
          <img
            src="https://menarini.es/wp-content/uploads/2022/04/cropped-grupo-menarini-logo-1.png"
            alt="Menarini"
          />
        </div>
      </div>
    </div>
  );
}
