import React from "react";
import "../styles/conectare.scss";

function Conectare() {
  return (
    <div className="cm">
      <div className="form">
        <h1>Conectare</h1>
        <div className="input">
          <span className="eticheta">Email*</span>
          <input type="email"></input>
        </div>
        <div className="input">
          <span className="eticheta">Parolă*</span>
          <input type="password"></input>
        </div>
        <button>Conectare</button>
        <h2>
          Nu ai deja cont ? Fă-ți unul <a href="/inscriere">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Conectare;
