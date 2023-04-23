import React from "react";

const logo = require("./assets/logo.png");
const desen = require("./assets/desen.png");
const placeholder = require("./assets/700x500.png");
const rapid = require("./assets/rapid.png");
const sigur = require("./assets/sigur.png");
const incredere = require("./assets/de_incredere.png");
const how = require("./assets/how.png");

function Home() {
  return (
    <div className="container">
      <div className="container1">
        <div className="navbar">
          <div className="logo nav-item">
            <img src={logo} alt="logo" />
          </div>
          <span></span>
          <span></span>
          <span></span>

          <div className="nav-items">
            <div className="nav-item ">
              <a href="/inchiriaza" className="black-bg">
                Închiriază
              </a>
            </div>
            <div className="nav-item">
              <a href="/descopera">Descoperă</a>
            </div>
            <hr></hr>
            <div className="nav-item">
              <a href="/conectare">Conectare</a>
            </div>
            <div className="nav-item ">
              <a href="/inscriere" className="black-bg">
                Înscriere
              </a>
            </div>
          </div>
        </div>
        <div className="heading">
          <div className="left">
            <div className="title">
              <h1>
                Bike<span className="green">X</span>
              </h1>
            </div>
            <div className="subtitle">
              <h3>
                Protejează mediul ! Închiriază o bicicletă sau trotinetă
                electrică.
              </h3>
            </div>
          </div>
          <div className="right">
            <div className="desen">
              <img src={desen} alt="desenu" />
            </div>
          </div>
        </div>
      </div>

      <div className="container_2">
        <div className="why_us">
          <div className="text_img">
            <div className="img">
              <img src={placeholder} alt="image1" />
            </div>
            <div className="text">
              <h2>De ce noi ?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
                quas quisquam aspernatur maiores delectus facere dicta nihil
                nobis? Deserunt ratione modi atque impedit assumenda
                consequuntur eum tempore ex odit libero!
              </p>
            </div>
          </div>
          <div className="perks">
            <div className="perk">
              <img src={rapid} alt="perk" className="perk" />
              <h2>Rapid</h2>
            </div>
            <hr></hr>
            <div className="perk">
              <img src={incredere} alt="perk" className="perk" />
              <h2>De încredere</h2>
            </div>
            <hr></hr>
            <div className="perk">
              <img src={sigur} alt="perk" className="perk" />
              <h2>Sigur</h2>
            </div>
          </div>
        </div>

        <div className="how">
          <div className="text_p">
            <div className="text">
              <h2>Cum funcționează ?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
                quas quisquam aspernatur maiores delectus facere dicta nihil
                nobis? Deserunt ratione modi atque impedit assumenda
                consequuntur eum tempore ex odit libero!
              </p>
            </div>
          </div>
          <div className="how_img">
            <img src={how} alt="how" />
          </div>
        </div>
      </div>

      <div className="quote">
        <h1>
        “Dacă o cale e mai bună decăt alta, atunci fii sigur că e calea <span className="green">naturii</span> .” - Aristotel
        </h1>
      </div>
    </div>
  );
}

export default Home;
