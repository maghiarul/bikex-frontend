import React, { useEffect, useState } from "react";
import "../styles/inchiriaza.scss";
import {
  collection,
  getDocs,
  query,
  addDoc,
  where,
  updateDoc,
  doc,
  documentId,
  setDoc,
} from "firebase/firestore";
import config from "../base";
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp(config);
const db = getFirestore(app);

const bike_img = require("../assets/bike1.png");
const trotineta_img = require("../assets/trotineta.png");
const shop = require("../assets/shopping.png");
const login = require("../assets/login.png");

function Inchiriaza() {
  const [b, setB] = useState<any[]>([]);
  const [checked, setChecked] = useState("");
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const here = async () => {
      const bikesRef = collection(db, "bikes");
      const bikes = getDocs(bikesRef);
      (await bikes).forEach((bike) => {
        const bk_object = JSON.parse(JSON.stringify(bike.data()));
        setB((prev) => [...prev, bk_object]);
      });
    };
    // eslint-disable-next-line
    const alt = here().catch(console.error);
  }, []);

  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", `${user.email}`));
  let lat: number, long: number;
  async function inchiriaza(type: string, price: number) {
    const u = await getDocs(q);
    const id = u.docs[0].id;
    const rideRef = collection(db, `users/${id}/rides`);
    const pointss = u.docs[0].data().points;
    await addDoc(rideRef, {
      type: type,
      price: null,
      from: { latitude: lat, longitude: long },
      to: { latitude: null, longitude: null },
      distance: null,
    }).then((res) => {
      console.log("Bike added successfully with id" + res.id);
    });

    const userref = doc(db, "users", id);
    await updateDoc(userref, { points: pointss + 1 }).then(() => {
      console.log("points added");
    });
  }

  async function updateRides(bike_id: number) {
    const rideRef = collection(db, "bikes");
    const rideQ = query(rideRef, where("id", "==", bike_id));
    const us = await getDocs(rideQ);
    const id = us.docs[0].id;
    const anotherRef = doc(db, "bikes", id);
    const anotherCol = collection(db, "bikes");
    const aCol = query(anotherCol, where(documentId(), "==", id));
    await getDocs(aCol).then((rides) => {
      const loc = rides.docs[0].data().location;
      lat = loc._lat;
      long = loc._long;
    });
    await updateDoc(anotherRef, {
      available: 0,
    });
  }

  if (user.uid !== undefined) {
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
          {b.map((bike) => {
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
                          updateRides(bike.id).then(() => {
                            inchiriaza(bike.type, bike.price).then(() => {
                              window.location.reload();
                            });
                          });
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
                          updateRides(bike.id).then(() => {
                            inchiriaza(bike.type, bike.price).then(() => {
                              window.location.reload();
                            });
                          });
                        }}
                      />
                    </div>
                  );
                }
              }
            }
            return "";
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
