import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";
import instagram from "../img/instagram-logo.svg";
import Facebook from "../img/facebook-logo.svg";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import "../background.css";

export default function Home(props) {
  return (
    <React.Fragment>
      <Nav noLogo="no logo" />
      <Header />
      <div className="home">
        <Cards />
        <div className="home-salon text-center">
          <h2>¿Necesitas un salón para tu evento?</h2>
          <div className="salon-info container">
            <Link to="/salon">
              <button className="btn">Más Información</button>
            </Link>
          </div>
        </div>
        <div className="info-master container text-center ">
          <h3>¡Seguinos en las redes!</h3>
          <div className="redes">
            <div className="ig">
              <h4>Instagram</h4>
              <a
                href="https://www.instagram.com/masterstenisbb/"
                className="img-redes"
                target="_blank"
              >
                <img src={instagram} alt="Logo instagram" />
              </a>
            </div>
            <div className="fb">
              <h4>Facebook</h4>
              <a
                href="https://www.facebook.com/masterstenisbb"
                className="img-redes"
                target="_blank"
              >
                <img src={Facebook} alt="Logo facebook" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
