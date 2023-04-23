import React from "react";
import "../styles/inscriere.scss";

function Inscriere() {
  return (
    <div className="cm">
      <div className="form">
        <h1>Înscriere</h1>
        <div className="input">
          <span className="eticheta">Email*</span>
          <input type="email"></input>
        </div>
        <div className="input">
          <span className="eticheta">Parolă*</span>
          <input type="password"></input>
        </div>
        <button>Înscriere</button>
        <h2>
          Ai deja cont ? Conectează-te <a href="/conectare">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Inscriere;
