import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Logo from "../img/logo-master.jpg";

export default function Nav(props) {
  const [user, setUser] = useState({
    displayUserExist: "none",
    displayUserNoExist: "block",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userId) => {
      if (userId) {
        setUser({
          displayUserExist: "block",
          displayUserNoExist: "none",
        });
      }
    });
    const logo = document.querySelector(".nav-logo");
    const navContent = document.querySelector(".nav-content");
    if (props.noLogo === "no logo") {
      logo.classList.add("ocultar-logo");
      navContent.classList.add("right-menu");
    } else {
      logo.classList.remove("ocultar-logo");
      navContent.classList.remove("right-menu");
    }
  }, []);
  const styleUserExist = {
    display: user.displayUserExist,
  };
  const styleUserNoExist = {
    display: user.displayUserNoExist,
  };

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(error));
  }

  function openMenu() {
    const menu = document.querySelector(".menu-btn");
    const list = document.querySelector(".menu");
    list.classList.toggle("hide");
    setTimeout(() => {
      menu.classList.toggle("open");
      list.classList.toggle("view");
    }, 100);
  }

  window.addEventListener("resize", () => {
    const menu = document.querySelector(".menu-btn");
    const list = document.querySelector(".menu");

    if (window.innerWidth > 1024) {
      list.classList.remove("view");
      menu.classList.remove("open");
      list.classList.add("hide");
    }
  });

  return (
    <div className="nav-bg">
      <div className="nav-content">
        <img src={Logo} alt="logo" className="nav-logo" />
        <div className="mobile-menu">
          <button className="menu-btn" onClick={openMenu}>
            <span className="top-line"></span>
            <span className="middle-line"></span>
            <span className="bottom-line"></span>
          </button>
          <div className="menu hide">
            <Link to="/">Inicio</Link>
            <Link to="/deportes">Rerva un turno</Link>
            <Link to="/tusturnos">Tus turnos</Link>
            <Link to="/galeria">Galería</Link>
            <Link to="/salon">Salón de fiestas</Link>
            <Link style={styleUserNoExist} to="/auth" onClick={handleLogout}>
              Iniciar Sesión
            </Link>
            <Link style={styleUserExist} to="/" onClick={handleLogout}>
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
