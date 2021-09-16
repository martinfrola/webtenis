import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

export default function InfoTurno(props) {
  const [turno, setTurno] = useState([]);
  useEffect(() => {
    setTurno(props.data);
  }, []);

  const turnoId = `${turno.deporte}-${turno.fecha}-${turno.hora}`;

  function deleteTurno() {
    Swal.fire({
      text: "¿Está seguro que desea cancelar su turno?",
      showDenyButton: true,
      denyButtonColor: "grey",
      confirmButtonText: `Cancelar Turno`,
      confirmButtonColor: "red",
      denyButtonText: `Salir`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const db = firebase.database();
        const dbRef = db.ref("/turnos");
        const dbRemove = dbRef.child(turnoId);
        dbRemove.remove();
        Swal.fire({
          text: "Su turno fué cancelado",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        //Send email with data
        const data = {
          subject: "Cancelación de turno",
          statusData: "Han cancelado un turno !",
          deporte: turno.deporte,
          fecha: turno.fecha,
          hora: turno.hora,
          nombre: turno.nombre,
          tel: turno.tel,
        };
        emailjs.send("martinfrola", "template_z3fyj7h", data).catch((error) => {
          Swal.fire({
            toast: "true",
            position: "top-end",
            icon: "error",
            text: error.message,
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          text: "Gracias por no cancelar su turno. ¡Te esperamos!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  return (
    <div className="sports info-turno">
      <h2>{turno.deporte}</h2>
      <h3>{turno.fecha}</h3>
      <h3>{turno.hora}</h3>
      <ul>
        <li>
          <strong>Nombre: </strong>
          {turno.nombre}
        </li>
        <li>
          <strong>Telefono: </strong>
          {turno.tel}
        </li>
      </ul>
      <button className="btn" onClick={deleteTurno}>
        Cancelar Turno
      </button>
    </div>
  );
}
