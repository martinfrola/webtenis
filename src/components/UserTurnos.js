import React, { useState, useEffect } from "react";
import InfoTurno from "./InfoTurno";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Footer from "./Footer";
import Nav from "./Nav";

export default function UserTurnos(props) {
  //Capture user info
  const [usuario, setUsuario] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      if (userId) {
        setUsuario(userId.email);
      } else {
        props.history.push("/auth");
      }
    });
  }, []);

  //Capture info from all turnos
  const [turnos, setTurnos] = useState([]);
  useEffect(() => {
    const db = firebase.database();
    const dbRef = db.ref("turnos/");
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        setTurnos(data);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <div className="container user-page">
        <Link to="/deportes" className=" conteiner">
          <button className="btn volver-deportes">Volver</button>
        </Link>

        <div className="user-turnos">
          {turnos.map((data) => {
            const dataObject = Object.values(data);
            return dataObject.map((info, i) => {
              if (info.user === usuario) {
                return <InfoTurno data={info} key={i} />;
              }
            });
          })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
