import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import Foto1 from "../img/1.webp";
import Foto2 from "../img/2.webp";
import Foto3 from "../img/3.webp";
import Foto4 from "../img/4.webp";
import Foto5 from "../img/5.webp";
import Foto6 from "../img/6.webp";
import Foto7 from "../img/7.webp";
import Foto8 from "../img/8.webp";
import Foto9 from "../img/9.webp";
import Foto10 from "../img/10.webp";
import Foto11 from "../img/11.webp";
import Foto12 from "../img/12.webp";

export default function Galeria() {
  function handleClick(e) {
    //Creando el fondo oscuro
    const overlay = document.createElement("DIV");
    const body = document.querySelector("body");
    body.appendChild(overlay);
    overlay.classList.add("overlay");
    overlay.onclick = function () {
      overlay.remove();
    };

    //Creando la imagen
    const imgActual = document.createElement("IMG");
    imgActual.src = e.target.src;
    overlay.appendChild(imgActual);
    imgActual.classList.add("mostrar");

    //Boton para cerrar la imagen
    const btnClose = document.createElement("P");
    overlay.appendChild(btnClose);
    btnClose.classList.add("btn-close");
    btnClose.textContent = "X";
    btnClose.onclick = function () {
      overlay.remove();
    };
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="galeria container">
        <div className="fotos">
          <img
            className="Foto1"
            src={Foto1}
            alt="Foto 1"
            onClick={handleClick}
          />
          <img
            className="Foto2"
            src={Foto2}
            alt="Foto 2"
            onClick={handleClick}
          />
          <img
            className="Foto3"
            src={Foto3}
            alt="Foto 3"
            onClick={handleClick}
          />
          <img
            className="Foto4"
            src={Foto4}
            alt="Foto 4"
            onClick={handleClick}
          />
          <img
            className="Foto5"
            src={Foto5}
            alt="Foto 5"
            onClick={handleClick}
          />
          <img
            className="Foto6"
            src={Foto6}
            alt="Foto 6"
            onClick={handleClick}
          />
          <img
            className="Foto7"
            src={Foto7}
            alt="Foto 7"
            onClick={handleClick}
          />
          <img
            className="Foto8"
            src={Foto8}
            alt="Foto 9"
            onClick={handleClick}
          />
          <img
            className="Foto9"
            src={Foto9}
            alt="Foto 9"
            onClick={handleClick}
          />
          <img
            className="Foto10"
            src={Foto10}
            alt="Foto 10"
            onClick={handleClick}
          />
          <img
            className="Foto11"
            src={Foto12}
            alt="Foto 11"
            onClick={handleClick}
          />
          <img
            className="Foto12"
            src={Foto11}
            alt="Foto 12"
            onClick={handleClick}
          />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
