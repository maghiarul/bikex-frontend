import React from "react";
import "../styles/conectare.scss";
import { useState } from "react";
import axios from "axios";

function Conectare() {
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

  const Login = async () => {
    // eslint-disable-next-line
    const res = await axios
      .post("http://localhost:4000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      // .then((res) => {
      //   t = res.data.token;
      //   handleCookie();
      //   if (cookies.token) {
      //     navigateDashboard();
      //   }
      // });
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="cm">
      <div className="form">
        <h1>Conectare</h1>
        <div className="input">
          <span className="eticheta">Email*</span>
          <input type="email" required onChange={handleEmail}></input>
        </div>
        <div className="input">
          <span className="eticheta">Parolă*</span>
          <input type="password" required onChange={handlePass}></input>
        </div>
        <button onClick={() => Login()}>Conectare</button>
        <h2>
          Nu ai deja cont ? Fă-ți unul <a href="/inscriere">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Conectare;
