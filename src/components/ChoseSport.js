import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

import firebase from "firebase";
import "firebase/auth";

export default function ChoseSport(props) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      if (!userId) {
        props.history.push("/auth");
      }
    });
  }, []);
  return (
    <React.Fragment>
      <Nav />
      <div className="sport-page">
        <div className="container sports text-center">
          <div className="chose-sport">
            <Link to="/tenis" className="sport-btn btn text-center">
              Tenis
            </Link>
            <Link to="/paddle" className="sport-btn btn text-center">
              Paddle
            </Link>
          </div>

          <p className="costo-turno">
            El valor del alquiler es de $300 por persona!
          </p>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
