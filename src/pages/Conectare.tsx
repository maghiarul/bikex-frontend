import React from "react";
import "../styles/conectare.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const authLogo = require("../assets/auth.png");

function Conectare() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  var t = "";

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
  const [cookies, setCookie] = useCookies(["token", "email"]);

  const handleCookie = () => {
    setCookie("token", t, {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "none",
    });
    setCookie("email", email, {
      path: "/",
      maxAge: 3600,
      secure: true,
      sameSite: "none",
    });
  };

  const Login = async () => {
    // eslint-disable-next-line
    const res = await axios
      .post("http://localhost:4000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        t = res.data.token;
        handleCookie();
        navigateHome();
      });
  };

  return (
    <div className="cm">
      <div className="form">
        <img src={authLogo} alt="logo" id="authLogo"/>
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
