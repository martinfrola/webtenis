import React from "react";
import "../background.css";
export default function Cards() {
  return (
    <div className="cards container text-center">
      <h2>¿Queres tomar clases?</h2>
      <p>¡Comunicate con nuestros profes!</p>
      <div className="tarjetero">
        <div className="tarjetero-cuerpo">
          <div className="tarjeta">
            <div className="adelante foto-1">
              <h3>Alberto</h3>
              <h4>Contacto</h4>
            </div>
            <div className="atras">
              <ul>
                <li>
                  <strong>Telefono: </strong>291412312
                </li>
                <li>
                  <strong>Clases a partir de : </strong>5 años
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tarjetero-cuerpo">
          <div className="tarjeta">
            <div className="adelante foto-2">
              <h3>Javier</h3>
              <h4>Contacto</h4>
            </div>
            <div className="atras">
              <ul>
                <li>
                  <strong>Telefono: </strong>291412312
                </li>
                <li>
                  <strong>Clases a partir de : </strong>5 años
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tarjetero-cuerpo">
          <div className="tarjeta">
            <div className="adelante foto-3">
              <h3>Franco</h3>
              <h4>Contacto</h4>
            </div>
            <div className="atras">
              <ul>
                <li>
                  <strong>Telefono: </strong>291412312
                </li>
                <li>
                  <strong>Clases a partir de : </strong>14 años
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tarjetero-cuerpo">
          <div className="tarjeta">
            <div className="adelante foto-4">
              <h3>Juan Pablo</h3>
              <h4>Contacto</h4>
            </div>
            <div className="atras">
              <ul>
                <li>
                  <strong>Telefono: </strong>291412312
                </li>
                <li>
                  <strong>Clases a partir de : </strong>14 años
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
