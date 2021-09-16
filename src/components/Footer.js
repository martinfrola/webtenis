import React from "react";

export default function Footer() {
  const date = new Date();
  const actualDate = date.getFullYear();
  return (
    <footer>
      <div className="direccion text-center">
        <p>
          <strong>Dirección:</strong> Jose Hernandez 792
        </p>

        <p>
          Copyright {actualDate} - Master's Tenis - Powered by @
          <a href="https://martinfrola.netlify.app/" target="_blank">
            Martín Frola
          </a>
        </p>
      </div>
    </footer>
  );
}
