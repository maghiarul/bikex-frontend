import React, { useEffect, useState } from "react";
import "../styles/inchiriaza.scss";
import axios from "axios";
import { useCookies } from "react-cookie";

const bike_img = require("../assets/bike1.png");
const trotineta_img = require("../assets/trotineta.png");
const shop = require("../assets/shopping.png");
const login = require("../assets/login.png");

function Inchiriaza() {
  const [bikes, setBikes] = useState<any[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    const res = axios.get("http://localhost:4000/bikes").then((res) => {
      setBikes(res.data);
      console.log(res.data);
    });
  }, []);

  const [checked, setChecked] = useState("");
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies();
  if (cookies.token!) {
    return (
      <div className="nush">
        <div className="dropdown">
          <h1>Selectează unul dintre orașele de mai jos:</h1>
          <div className="dropdown-items">
            <div className="dropdown-item">
              <input
                type="radio"
                id="galati"
                name="galati"
                value="Galati"
                onClick={() => {
                  setChecked("Galati");
                }}
              />
              <label htmlFor="galati">Galați</label>
            </div>
            <div className="dropdown-item">
              <input
                type="radio"
                id="iasi"
                name="galati"
                value="Iasi"
                onClick={() => {
                  setChecked("Iasi");
                }}
              />
              <label htmlFor="iasi">Iași</label>
            </div>
            <div className="dropdown-item">
              <input
                type="radio"
                id="bucuresti"
                name="galati"
                value="Bucuresti"
                onClick={() => {
                  setChecked("Bucuresti");
                }}
              />
              <label htmlFor="bucuresti">București</label>
            </div>
            <div className="dropdown-item">
              <input
                type="radio"
                id="brasov"
                name="galati"
                value="Brasov"
                onClick={() => {
                  setChecked("Brasov");
                }}
              />
              <label htmlFor="brasov">Brașov</label>
            </div>
            <div className="dropdown-item">
              <input
                type="radio"
                id="cluj"
                name="galati"
                value="Cluj"
                onClick={() => {
                  setChecked("Cluj");
                }}
              />
              <label htmlFor="cluj">Cluj</label>
            </div>
          </div>
          <div className="echipament">
            <h2>Dorești echipament de protecție ?</h2>
            <div className="smt">
              <div className="echipament-item">
                <input type="radio" id="da" name="echipament"></input>
                <label htmlFor="da">Da</label>
              </div>
              <div className="echipament-item">
                <input type="radio" id="nu" name="echipament"></input>
                <label htmlFor="nu">Nu</label>
              </div>
            </div>
          </div>
        </div>
        <div className="list">
          {bikes.map((bike) => {
            if (bike.city === checked) {
              if (bike.type === "Bicicleta") {
                if (bike.available !== 0) {
                  return (
                    <div className="list-item" key={bike.id}>
                      <img src={bike_img} alt="type of" className="bike" />
                      <div className="details">
                        <span>
                          {bike.type}#{bike.id}
                        </span>
                        <span className="gray">Oras: {bike.city}</span>
                      </div>
                      <img
                        src={shop}
                        alt="inchiriaza"
                        className="shop"
                        onClick={() => {
                          const data = JSON.stringify({
                            a: bike.available,
                            id: bike.id,
                          });
                          // eslint-disable-next-line
                          const res = axios.post(
                            "http://localhost:4000/update",
                            data,
                            {
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          window.alert(
                            `${bike.type} a fost inchiriata cu succes.`
                          );
                          window.location.reload();
                        }}
                      />
                    </div>
                  );
                }
              }
              if (bike.type === "Trotineta") {
                if (bike.available !== 0) {
                  return (
                    <div className="list-item" key={bike.id} id={bike.id}>
                      <img src={trotineta_img} alt="type of" className="bike" />
                      <div className="details">
                        <span>
                          {bike.type}#{bike.id}
                        </span>
                        <span className="gray">Oras: {bike.city}</span>
                      </div>
                      <img
                        src={shop}
                        alt="inchiriaza"
                        className="shop"
                        onClick={() => {
                          const data = JSON.stringify({
                            a: bike.available,
                            id: bike.id,
                          });
                          // eslint-disable-next-line
                          const res = axios.post(
                            "http://localhost:4000/update",
                            data,
                            {
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          );
                          window.alert(
                            `${bike.type} a fost inchiriata cu succes.`
                          );
                          window.location.reload();
                        }}
                      />
                    </div>
                  );
                }
              }
            }
            return 0;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="lo">
        <img src={login} alt="login first" />
        <a href="/conectare">Trebuie să te conectezi mai întâi !</a>
      </div>
    );
  }
}

export default Inchiriaza;
