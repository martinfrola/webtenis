import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/database";
import "firebase/auth";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

export default function Form(props) {
  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    nombre: "",
    tel: "",
    deporte: props.usuario.deporte,
  });

  //To delete old dates in input calendar
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1; //beacause it starts from 0
  const dia = fechaActual.getDate();
  const fechaMinima = `${año}-${mes < 10 ? `0${mes}` : mes}-${
    dia < 10 ? `0${dia}` : dia
  }`;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      if (!userId) {
        props.history.push("/auth");
      }
    });
    //Delete the time options when state update!
    const db = firebase.database();
    const dbRef = db.ref("turnos/");
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        //obtengo un arreglo que contiene todos los turnos
        const turnos = Object.values(snapshot.val());
        turnos.map((datosTurno) => {
          //obtengo un arreglo para cada turno
          const infoTurno = Object.values(datosTurno);
          infoTurno.map((data) => {
            //obtengo un arreglo por cada turno con sus datos
            if (data.fecha === turno.fecha) {
              const horarioOcupado = document.querySelectorAll(".horario");
              //Elimino la opción del horario que ya está ocupado
              horarioOcupado.forEach((horario) => {
                if (horario.value === data.hora) {
                  horario.setAttribute("disabled", "");
                }
              });
            }
          });
        });
      }
    });
  });
  function handleChangeFecha(e) {
    //Recover the time options on change!
    const diaSemana = new Date(e.target.value).getUTCDay();
    const horarioOcupado = document.querySelectorAll(".horario");
    horarioOcupado.forEach((horario) => {
      horario.removeAttribute("disabled", "");
    });

    if ([0, 6].includes(diaSemana)) {
      setTurno({
        ...turno,
        [e.target.name]: e.target.value,
      });
    } else {
      Swal.fire({
        toast: "true",
        position: "top-end",
        icon: "error",
        text: "¡Las canchas de tenis solo están disponibles los días de semana!",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      const cleaner = document.querySelector(".fecha-cleaner");
      cleaner.value = "";
    }
  }

  function handleChange(e) {
    //Adding the information to de Hook
    setTurno({
      ...turno,
      [e.target.name]: e.target.value,
    });
  }
  //Funtion for reset the form
  function cleaner() {
    const cleaner = document.querySelectorAll(".input-cleaner");
    cleaner.forEach((clear) => {
      clear.value = "";
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //Pushing the data to the db
    if (
      turno.fecha !== "" &&
      turno.hora !== "" &&
      turno.nombre !== "" &&
      turno.tel !== ""
    ) {
      const turnoId = `${turno.deporte}-${turno.fecha}-${turno.hora}`;
      uploadData(
        turnoId,
        turno.deporte,
        turno.fecha,
        turno.hora,
        turno.nombre,
        turno.tel
      );
    } else {
      Swal.fire({
        toast: "true",
        position: "top-end",
        icon: "error",
        text: "¡Algún campo no está completo!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }

    //Sending email with the data
    const data = {
      subject: "Reservación de turno",
      statusData: "Tienes una nueva reserva en tus canchas!",
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
  }
  function uploadData(
    turnoId,
    turnoDeporte,
    turnoFecha,
    turnoHora,
    turnoNombre,
    turnoTel
  ) {
    const db = firebase.database();
    const dbRef = db.ref("turnos/" + turnoId);
    dbRef
      .push()
      .set({
        deporte: turnoDeporte,
        fecha: turnoFecha,
        hora: turnoHora,
        nombre: turnoNombre,
        tel: turnoTel,
        user: props.usuario.user,
      })
      .catch((error) => {
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
    cleaner();
    Swal.fire({
      icon: "success",
      text: `Reservado Correctamente! Puedes ver los datos del turno o cancelarlo en "Tus turnos".`,
      showConfirmButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "green",
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="form-turno">
        <h3>Elegí un día y horario!</h3>
        <div className="fecha-hora">
          <div className="campo">
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              onChange={handleChangeFecha}
              className="fecha-cleaner input-cleaner"
              min={fechaMinima}
            />
          </div>

          <div className="campo">
            <label htmlFor="hora">Hora</label>
            <select
              id="hora"
              name="hora"
              onChange={handleChange}
              className="input-cleaner"
              autoComplete="off"
            >
              <option disabled selected>
                ---
              </option>
              {props.data.map((horario, i) => {
                return (
                  <option key={i} className="horario">
                    {horario}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {props.usuario.deporte === "Tenis" && (
          <p>Las canchas de Tenis solo se alquilan los fines de semana</p>
        )}
        <h3>Dejanos algunos datos</h3>
        <div className="datos">
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={handleChange}
              className="input-cleaner"
            />
          </div>

          <div className="campo">
            <label htmlFor="tel">Telefono</label>
            <input
              type="phone"
              id="tel"
              name="tel"
              onChange={handleChange}
              className="input-cleaner"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-submit">
          Reservar
        </button>
      </form>
    </React.Fragment>
  );
}
