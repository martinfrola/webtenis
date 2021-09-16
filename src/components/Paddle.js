import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Paddle() {
  const [usuario, setUsuario] = useState({
    user: "",
    deporte: "Paddle",
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
    "9:00",
    "10:30",
    "12:00",
    "13:30",
    "15:00",
    "16:30",
    "18:00",
    "19:30",
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

          <h1>PADDLE</h1>
          <Form usuario={usuario} data={dataTurnos} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
