import React, { useEffect, useState } from "react";
import Facebook from "../img/facebook.svg";
import Google from "../img/google.svg";
import instagram from "../img/instagram-logo.svg";
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Auth(props) {
  const [user, setUser] = useState({
    userData: {},
    email: "",
    psw: "",
  });
  //Verifica si ya hay una cuenta con ese usuario
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      setUser({
        userData: userId,
      });
      if (userId) {
        props.history.push("/");
      }
    });
  }, []);

  //Inicia sesión con Google
  function loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser({
          user: result.user,
        });
        props.history.push("/");
      })
      .catch((error) => {
        Swal.fire({
          toast: "true",
          position: "top-end",
          icon: "warning",
          iconColor: "red",
          text: error.message,
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  }
  //Inicia sesión con facebook
  function loginFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser({
          userData: result.user,
        });
        props.history.push("/");
      })
      .catch((error) => {
        Swal.fire({
          toast: "true",
          position: "top-end",
          icon: "warning",
          iconColor: "red",
          text: error.message,
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  }
  //Inicia sesión con una cuenta ya creada
  function loginMail() {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.psw)
      .catch((error) => {
        if (!error) {
          props.history.push("/");
        } else {
          Swal.fire({
            toast: "true",
            iconColor: "red",
            position: "top-end",
            icon: "warning",
            text: "El email o la contraseña no es el correcto, en caso de que no poseas una cuenta, creala con el botón de abajo!",
            timer: 7000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
  }
  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  //Crea una nueva cuenta
  const [nuevaCuenta, setNuevaCuenta] = useState({
    newEmail: "",
    newPsw: "",
    displayNC: "none",
    displayOC: "block",
  });
  function handleNewAcount(e) {
    setNuevaCuenta({
      ...nuevaCuenta,
      [e.target.name]: e.target.value,
    });
  }

  function showForm() {
    setNuevaCuenta({
      ...nuevaCuenta,
      displayNC: "block",
      displayOC: "none",
    });
  }
  function createAcount(e) {
    e.preventDefault();
    console.log(nuevaCuenta.newEmail, nuevaCuenta.newPsw);
    firebase
      .auth()
      .createUserWithEmailAndPassword(nuevaCuenta.newEmail, nuevaCuenta.newPsw)
      .catch((error) => {
        Swal.fire({
          toast: "true",
          position: "top-end",
          icon: "warning",
          iconColor: "red",
          html:
            "<b>Ups, hubo un error! los posibles problemas son:</b> <br>" +
            "1. Ya existe un cuenta con este email. <br>" +
            "2. La contraseña debe tener mas de 6 caracteres. <br>" +
            "3. El email está mal formateado. <br>",
          confirmButtonColor: "red",
        });
      });
  }

  let styleNC = {
    display: nuevaCuenta.displayNC,
  };
  let styleOC = {
    display: nuevaCuenta.displayOC,
  };
  return (
    <React.Fragment>
      <Nav />
      <div className="auth">
        <div className="login text-center">
          <div className="login-btn" onClick={loginFacebook}>
            <img src={Facebook} alt="Logo de Facebook" />
            <p>Iniciá sesión con Facebook</p>
          </div>
          <div className="login-btn" onClick={loginGoogle}>
            <img src={Google} alt="Logo de Google" />
            <p>Iniciá sesión con Google</p>
          </div>

          <h3 style={styleOC}>Ingresá con tu cuenta</h3>
          <form style={styleOC} className="login-email">
            <div className="inputs">
              <input
                type="email"
                name="email"
                placeholder="Tu Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="psw"
                placeholder="Tu Contraseña"
                onChange={handleChange}
              />
            </div>
          </form>
          <div className="btns" style={styleOC}>
            <button className="btn" onClick={loginMail}>
              Iniciar Sesión
            </button>
            <p>¿Todavía no tenés cuenta?</p>
            <button className="btn crear-cuenta" onClick={showForm}>
              Crear Cuenta
            </button>
          </div>
          <form className="new-acount" onSubmit={createAcount} style={styleNC}>
            <h3>Creá tu cuenta</h3>
            <div className="inputs">
              <input
                type="email"
                name="newEmail"
                placeholder="Nuevo Email"
                onChange={handleNewAcount}
              />
              <input
                type="password"
                name="newPsw"
                placeholder="Contraseña"
                onChange={handleNewAcount}
              />
            </div>
            <button type="submit" className="btn">
              Crear Nueva cuenta
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
