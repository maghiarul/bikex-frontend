import React from "react";
const logo = require("./assets/logo.png");
const desen = require("./assets/desen.png");
const placeholder = require("./assets/team.png");
const rapid = require("./assets/rapid.png");
const sigur = require("./assets/sigur.png");
const incredere = require("./assets/de_incredere.png");
const how = require("./assets/how.png");
const user_pfp = require("./assets/user.png");

function Home() {
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);
  if (user === null || user === undefined) {
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
              <hr className="" id="one"></hr>
              <div className="nav-item" id="two">
                <a href="/conectare">Conectare</a>
              </div>
              <div className="nav-item" id="three">
                <a href="/inscriere" className="black-bg">
                  Înscriere
                </a>
              </div>
              <div className="nav-item disabled " id="four">
                <img src={user_pfp} id="user_pfp" alt="userpfp" />
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50" fill="#FD0000" />
                </svg>
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
                  Scopul nostru, cei din spatele proiectului BikeX, este să
                  micșorăm poluarea din orașe dar și din afara lor. Diminuând
                  emisiile autovehiculelor și încurajând folosirea biciletelor
                  sau trotinetelor încărcate cu energie verde putem aspira la o
                  Românie mai curată și modernă. Acesta fiind scopul nostru, nu
                  am vrut să neglijăm celelalte aspecte cheie care ne determină
                  proiectul, acelea fiind : rapiditatea, încrederea și sigurața.
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
                  Site-ul nostru a fost conceput pentru a fi utilizat de useri
                  de orice vârstă. Cu ajutorul interfeței ușoare de utilizat ,
                  userii noștri iși pot face treaba in două momente si catevă
                  click-uri.
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
            “Dacă o cale e mai bună decăt alta, atunci fii sigur că e calea{" "}
            <span className="green">naturii</span> .” - Aristotel
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      // LOGGED IN PAGE
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
              <hr className="disabled" id="one"></hr>
              <div className="nav-item disabled" id="two">
                <a href="/conectare">Conectare</a>
              </div>
              <div className="nav-item disabled" id="three">
                <a href="/inscriere" className="black-bg">
                  Înscriere
                </a>
              </div>
              <div className="nav-item" id="four">
                <img
                  src={user_pfp}
                  id="user_pfp"
                  alt="userpfp"
                  onClick={() => {
                    // signOut();
                  }}
                />
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="00af54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50" fill="#00af54" />
                </svg>
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
                  Scopul nostru, cei din spatele proiectului BikeX, este să
                  micșorăm poluarea din orașe dar și din afara lor. Diminuând
                  emisiile autovehiculelor și încurajând folosirea biciletelor
                  sau trotinetelor încărcate cu energie verde putem aspira la o
                  Românie mai curată și modernă. Acesta fiind scopul nostru, nu
                  am vrut să neglijăm celelalte aspecte cheie care ne determină
                  proiectul, acelea fiind : rapiditatea, încrederea și sigurața.
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
                  Site-ul nostru a fost conceput pentru a fi utilizat de useri
                  de orice vârstă. Cu ajutorul interfeței ușoare de utilizat ,
                  userii noștri iși pot face treaba in două momente si catevă
                  click-uri.
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
            “Dacă o cale e mai bună decăt alta, atunci fii sigur că e calea{" "}
            <span className="green">naturii</span> .” - Aristotel
          </h1>
        </div>
      </div>
    );
  }
}

export default Home;
