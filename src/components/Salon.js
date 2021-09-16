import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import capacidad from "../img/icono-capacidad.svg";
import musica from "../img/icono-musica.svg";
import vajilla from "../img/icono-vajilla.svg";
import baños from "../img/icono-baños.svg";
import salon1 from "../img/salon-1.webp";
import salon2 from "../img/salon-2.webp";
import salon3 from "../img/salon-3.webp";
import salon4 from "../img/salon-4.webp";
import "../background.css";

export default function Salon() {
  return (
    <React.Fragment>
      <Nav />
      <div className="salon">
        <div className="salon-header">
          <h1>Master's Eventos</h1>
        </div>
        <div className="salon-content container">
          <div className="content-info">
            <div className="info text-center">
              <h4>Capacidad</h4>
              <img src={capacidad} alt="logo-capacidad" />
              <p>
                ¡El salón consta con una capacidad máxima de 200 personas!
                Adaptablea grandes eventos ó a reuniones más reducidas.
              </p>
            </div>

            <div className="info text-center">
              <h4>Vajilla</h4>
              <img src={vajilla} alt="icono" />
              <p>
                Consta con una vajilla para 150 personas con plato, cubiertos,
                vaso y copa!
              </p>
            </div>

            <div className="info text-center">
              <h4>Baños</h4>
              <img src={baños} alt="icono" />
              <p>
                El establecimiento cuenta con baños separados para mujeres y
                hombres.
              </p>
            </div>

            <div className="info text-center">
              <h4>Musica</h4>
              <img src={musica} alt="icono" />
              <p>
                ¡El salón posee un sistema de parlantes y luces para que tu
                fiesta sea inolvidable!
              </p>
            </div>
          </div>
          <h2 className="text-center">Fotos del Salón</h2>
          <div className="galeria-salon">
            <img src={salon1} alt="ejemplo salon" />
            <img src={salon2} alt="ejemplo salon" />
            <img src={salon3} alt="ejemplo salon" />
            <img src={salon4} alt="ejemplo salon" />
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
