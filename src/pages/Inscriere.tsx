import React from "react";
import "../styles/inscriere.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as lol from "firebase/app";

const regLogo = require("../assets/regLogo.png");

lol.initializeApp(config);
const auth = getAuth();

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

  // const data = JSON.stringify({
  //   email: email,
  //   password: pass,
  // });

  // const Register = async () => {
  //   // eslint-disable-next-line
  //   const res = await axios.post("http://localhost:4000/register", data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   navigateHome();
  // };
  const Register = () => {
    createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
      navigateHome();
    });
  };
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
        <button onClick={() => Register()}>Înscriere</button>
        <h2>
          Ai deja cont ? Conectează-te <a href="/conectare">aici.</a>
        </h2>
      </div>
    </div>
  );
}

export default Inscriere;
