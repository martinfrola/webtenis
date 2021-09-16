import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import firebase from "firebase";
import "firebase/auth";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Tenis() {
  const [usuario, setUsuario] = useState({
    user: "",
    deporte: "Tenis",
  });
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      if (userId) {
        setUsuario({
          ...usuario,
          user: userId.email,
        });
      }
    });
  }, []);
  const dataTurnos = [
    "9:00 Cancha 1",
    "9:00 Cancha 2",
    "10:30 Cancha 1",
    "10:30 Cancha 2",
    "12:00 Cancha 1",
    "12:00 Cancha 2",
    "13:30 Cancha 1",
    "13:30 Cancha 2",
    "15:00 Cancha 1",
    "15:00 Cancha 2",
    "16:30 Cancha 1",
    "16:30 Cancha 2",
    "18:00 Cancha 1",
    "18:00 Cancha 2",
    "19:30 Cancha 1",
    "19:30 Cancha 2",
  ];

  return (
    <React.Fragment>
      <Nav />
      <div className="form-page">
        <div className="conteiner sports tenis text-center">
          <div className="btn-volver">
            <Link to="/deportes">
              <button className="btn">Volver</button>
            </Link>
          </div>

          <h1>TENIS</h1>
          <Form usuario={usuario} data={dataTurnos} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
