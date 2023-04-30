import "../styles/conectare.scss";
import { useNavigate } from "react-router-dom";
import config from "../base";
import { getAuth } from "firebase/auth";
import * as firebase from "firebase/app";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
const app = firebase.initializeApp(config);
const auth = getAuth(app);
const authLogo = require("../assets/auth.png");

function Conectare() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [pass, setPass] = useState("");

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  async function LogIn() {
    await signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const userC = userCredential.user;
        localStorage.setItem("user", JSON.stringify(userC));
      })
      .then(() => {
        navigateHome();
      });
  }
  return (
    <div className="cm">
      <div className="form">
        <img src={authLogo} alt="logo" id="authLogo" />
        <h1>Conectare</h1>
        <div className="input">
          <span className="eticheta">Email*</span>
          <input type="email" required onChange={handleEmail}></input>
        </div>
        <div className="input">
          <span className="eticheta">Parolă*</span>
          <input type="password" required onChange={handlePass}></input>
        </div>
        <button
          onClick={() => {
            LogIn();
          }}
        >
          Conectare
        </button>
        <h2>
          Nu ai deja cont ? Fă-ți unul <a href="/inscriere">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Conectare;
