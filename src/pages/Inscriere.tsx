import React from "react";
import "../styles/inscriere.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../base";
import { getAuth } from "firebase/auth";
import * as firebase from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { addDoc, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
const app = firebase.initializeApp(config);
const auth = getAuth(app);
const regLogo = require("../assets/regLogo.png");

const db = getFirestore(app);

function Inscriere() {
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


  async function addUser() {
    const lo = collection(db, "users");
    const kek = await addDoc(lo, { admin: 0, email: email, points: 0 });
    console.log("New user added to the database with ID " + kek.id);
  }

  async function Register() {
    await createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        addUser();
      })
      .then(() => {
        navigateHome();
      });
  }

  return (
    <div className="cm">
      <div className="form">
        <img src={regLogo} alt="regLogo" id="regLogo" />
        <h1>Înscriere</h1>
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
            Register();
          }}
        >
          Înscriere
        </button>
        <h2>
          Ai deja cont ? Conectează-te <a href="/conectare">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Inscriere;
