import React from "react";
import "../styles/inscriere.scss";
import { useState } from "react";
import axios from "axios";

function Inscriere() {
  const [email, setEmail] = useState("");
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [pass, setPass] = useState("");

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const data = JSON.stringify({
    email: email,
    password: pass,
  });

  const Register = async () => {
    // eslint-disable-next-line
    const res = await axios.post("http://localhost:4000/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div className="cm">
      <div className="form">
        <h1>Înscriere</h1>
        <div className="input">
          <span className="eticheta">Email*</span>
          <input type="email" required onChange={handleEmail}></input>
        </div>
        <div className="input">
          <span className="eticheta">Parolă*</span>
          <input type="password" required onChange={handlePass}></input>
        </div>
        <button onClick={() => Register()}>Înscriere</button>
        <h2>
          Ai deja cont ? Conectează-te <a href="/conectare">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Inscriere;
