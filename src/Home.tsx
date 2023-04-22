import React from "react";

function Home() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo nav-item"></div>
        <div className="nav-items">
          <div className="nav-item black-bg">
            <a href="#">Inchiriaza</a>
          </div>
          <div className="nav-item">
            <a href="#">Descopera</a>
          </div>
          <hr></hr>
          <div className="nav-item">
            <a href="#">Conectare</a>
          </div>
          <div className="nav-item black-bg">
            <a href="#">Inscriere</a>
          </div>
        </div>
      </div>
      <div className="heading">
        <div className="left">
          <div className="title">
            <h1>BikeX</h1>
          </div>
          <div className="subtitle">
            <h3>
              Protejeaza mediul ! Inchiriaza o bicicleta sau trotineta
              electrica.
            </h3>
          </div>
        </div>
        <div className="right">
          <div className="desen">
            <img src="" alt="desenu" />
          </div>
        </div>
      </div>

      <div className="container_2">
        <div className="why_us">
          <div className="text_img">
            <div className="img">
              <img src="" alt="image" />
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
            <div className="perks">
              <div className="perk">
                <img src="" alt="perk" />
                <h2>Rapid</h2>
              </div>
              <hr></hr>
              <div className="perk">
                <img src="" alt="perk" />
                <h2>De incredere</h2>
              </div>
              <hr></hr>
              <div className="perk">
                <img src="" alt="perk" />
                <h2>Sigur</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="how">
          <div className="text_p">
            <div className="text">
              <h2>Cum functioneaza ?</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
                quas quisquam aspernatur maiores delectus facere dicta nihil
                nobis? Deserunt ratione modi atque impedit assumenda
                consequuntur eum tempore ex odit libero!
              </p>
            </div>
          </div>
          <div className="how_img">
            <img  src="" alt="img"/>
          </div>
        </div>
      </div>

      <div className="quote">
        <h1>"Daca o cale e mai buna decat alta, atunci fii sigur ca e calea naturii." - Aristotel</h1>
      </div>
    </div>
  );
}

export default Home;
