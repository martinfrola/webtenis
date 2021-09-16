import React, { useEffect, useState, lazy, Suspense } from "react";
// import Auth from "./components/Auth";
// import ChoseSport from "./components/ChoseSport";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Tenis from "./components/Tenis";
// import Paddle from "./components/Paddle";
// import Home from "./components/Home";
// import Galeria from "./components/Galeria";
// import Salon from "./components/Salon";
import tenisBall from "./img/tenis-ball.svg";
import "./app.css";

import UserTurnos from "./components/UserTurnos";
function App() {
  const Tenis = lazy(() => import("./components/Tenis"));
  const Paddle = lazy(() => import("./components/Paddle"));
  const Home = lazy(() => import("./components/Home"));
  const Galeria = lazy(() => import("./components/Galeria"));
  const Salon = lazy(() => import("./components/Salon"));
  const Auth = lazy(() => import("./components/Auth"));
  const ChoseSport = lazy(() => import("./components/ChoseSport"));

  // const [style, setStyle] = useState({
  //   display: "block",
  // });

  // const Tenis = (window.onload = function () {
  //   setStyle({
  //     display: "none",
  //   });
  // });

  // const styleLoading = {
  //   display: style.display,
  // };
  const returnFallback = () => (
    <div className="contenedor-carga">
      <div className="icono-carga">
        <img src={tenisBall} alt="icono pelota de tenis" />
      </div>
    </div>
  );

  return (
    <Suspense fallback={returnFallback()}>
      <BrowserRouter>
        <Switch>
          <Route path="/galeria" component={Galeria} />
          <Route path="/deportes" component={ChoseSport} />
          <Route path="/tenis" component={Tenis} />
          <Route path="/paddle" component={Paddle} />
          <Route path="/tusturnos" component={UserTurnos} />
          <Route path="/salon" component={Salon} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
