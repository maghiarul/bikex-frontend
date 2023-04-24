import React from "react";
import "../styles/inchiriaza.scss";

const bike = require("../assets/bike1.png");
const shop = require("../assets/shopping.png");

function Inchiriaza() {
  return (
    <div className="nush">
      <div className="dropdown">
        <h1>Selecteaza unul dintre orasele de mai jos:</h1>
        <div className="dropdown-items">
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
          <div className="dropdown-item">
            <input type="radio" id="galati" name="galati" />
            <label htmlFor="galati">Galati</label>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
        <div className="list-item">
          <img src={bike} alt="type of"  className="bike"/>
          <div className="details">
            <span>Bicicleta#1234</span>
            <span className="gray">Oras: Galati</span>
          </div>
          <img src={shop} alt="inchiriaza" className="shop" />
        </div>
      </div>
    </div>
  );
}

export default Inchiriaza;
