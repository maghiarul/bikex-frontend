import React, { useEffect, useState } from "react";
import config from "../base";
import * as firebase from "firebase/app";
import {
  addDoc,
  doc,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import "../styles/dashboard.scss";
import { useGeolocated } from "react-geolocated";
// eslint-disable-next-line
import axios from "axios";
import { getPreciseDistance } from "geolib";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { fromLonLat, transform } from "ol/proj";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

const app = firebase.initializeApp(config);
const db = getFirestore(app);

const bike_img = require("../assets/bike1.png");
const trotineta_img = require("../assets/trotineta.png");

function Dashboard() {
  function signOut() {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000";
  }
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", `${user.email}`));

  const [r, setR] = useState<any[]>([]);
  // const [b, setB] = useState<any[]>([]);

  useEffect(() => {
    const smt = async () => {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs[0].data().email === user.email) {
        const ridesRef = collection(
          db,
          `users/${querySnapshot.docs[0].id}/rides`
        );
        const rides = getDocs(ridesRef);
        (await rides).forEach((ride) => {
          const rd_object = JSON.parse(JSON.stringify(ride.data()));
          setR((prev) => [...prev, rd_object]);
        });
      }
    };
    // eslint-disable-next-line
    const result = smt().catch(console.error);
    // eslint-disable-next-line
  }, []);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 25000,
    });

  async function addNew(latitude: any, longitude: any) {
    const col = collection(db, "garbage");
    const res = await addDoc(col, { longitude: longitude, latitude: latitude });
    console.log("Added succesfully with ID " + res.id);
    // https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}
  }

  // const token = "pk.0e2cc8006f0f362109a7742c0e55d921";
  // eslint-disable-next-line
  const [from_address, setFromAddress] = useState("default values");
  // eslint-disable-next-line
  const [to_address, setToAddress] = useState("default values");

  // async function getFromAddress(latitude: any, longitude: any) {
  //   const res = await axios.get(
  //     `https://eu1.locationiq.com/v1/reverse?key=${token}&lat=${latitude}&lon=${longitude}&format=json`
  //   );
  //   setFromAddress(res.data.display_name);
  // }
  // async function getToAddress(latitude: any, longitude: any) {
  //   const res = await axios.get(
  //     `https://eu1.locationiq.com/v1/reverse?key=${token}&lat=${latitude}&lon=${longitude}&format=json`
  //   );
  //   setToAddress(res.data.display_name);
  // }
  let d: any, p: any;
  async function unrent() {
    const u = await getDocs(q);
    const id = u.docs[0].id;
    const refR = collection(db, `users/${id}/rides`);
    const ref = query(refR, where("price", "==", null));
    const us = await getDocs(ref);
    const bikeID = us.docs[0].id;
    const bikeDATA = us.docs[0].data();
    const anotherRef = doc(db, `users/${id}/rides`, bikeID);
    if (coords !== undefined) {
      if (isGeolocationAvailable) {
        if (isGeolocationEnabled) {
          await updateDoc(anotherRef, {
            // to: { latitude: coords?.latitude, longitude: coords?.longitude },
            to: [coords?.latitude, coords?.longitude],
          })
            .then(() => {
              d = getPreciseDistance(
                {
                  latitude: bikeDATA.from[0],
                  longitude: bikeDATA.from[1],
                },
                {
                  latitude: bikeDATA.to[0],
                  longitude: bikeDATA.to[1],
                }
              );
              // distance in km = distance / 1000
              p = (d / 1000) * 0.5;
            })
            .then(async () => {
              await updateDoc(anotherRef, {
                price: p,
                distance: d,
              });
            });
        } else {
          console.log("enable geolocation");
        }
      } else {
        console.log("geolocation is not available");
      }
    }
  }

  const [btn_msg, setBtnMsg] = useState("");

  useEffect(() => {
    const but = document.getElementById("rent");
    setBtnMsg("Loading...");
    if (coords) {
      but?.removeAttribute("disabled");
      setBtnMsg("Unrent");
    }
  }, [coords]);

  const [garbage, setGarbage] = useState<any[]>([]);

  async function getPoints() {
    const ridesRef = collection(db, `garbage`);
    // eslint-disable-next-line
    const rides = await getDocs(ridesRef).then((rides_idk) => {
      rides_idk.forEach((ride) => {
        const rd_object = JSON.parse(JSON.stringify(ride.data()));
        setGarbage((prev) => [...prev, rd_object]);
      });
    });
  }

  function callMap() {
    const map = new Map({
      target: "map2",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    const layer = new VectorLayer({
      source: new VectorSource({
        features: garbage.map(
          (point) =>
            new Feature({
              geometry: new Point(
                fromLonLat([point.longitude, point.latitude])
              ),
            })
        ),
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://i.ibb.co/qDYcwnv/marker.png",
        }),
      }),
    });
    map.addLayer(layer);
    map
      .getView()
      .setCenter(
        transform(
          [24.944101381179326, 46.072497530954756],
          "EPSG:4326",
          "EPSG:3857"
        )
      );
    map.getView().setZoom(7.5);
  }

  React.useEffect(() => {
    getPoints();
  }, []);

  React.useEffect(() => {
    if (garbage.length > 0) {
      callMap();
      setHeight();
    }
    // eslint-disable-next-line
  }, [garbage]);

  var body = document.body,
    html = document.documentElement;

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  function setHeight() {
    const elm = document.getElementById("side-nav")!;
    elm.style.height = `${height}px`;
    console.log(height);
  }
  const user_pfp = require("../assets/user-pfp-white.png");

  if (user.uid !== undefined) {
    return (
      <div className="bif">
        <div className="side-nav" onLoad={setHeight} id="side-nav">
          <div className="user">
            <img alt="avatar" src={user_pfp} />
            <div>
              <p>{user.providerData[0].email}</p>
              <button
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="ride-history">
            <h1>Ride History</h1>
            <div className="rides">
              {r.map((ride) => {
                // getFromAddress(ride.from.latitude, ride.from.longitude);
                // getToAddress(ride.to.latitude, ride.to.longitude);
                if (ride.price !== null) {
                  if (ride.type === "Bicicleta")
                    return (
                      <div key={ride.price} className="ride">
                        <img className="bicicleta" src={bike_img}></img>
                        <div>
                          <div className="al">
                            <span>Type: {ride.type} </span>
                          </div>
                          <span>Price: {ride.price} lei </span>
                          <span>Distance: {ride.distance / 1000} KM </span>
                        </div>
                      </div>
                    );
                  else if (ride.type === "Trotineta")
                    return (
                      <div key={ride.price} className="ride">
                        <img className="trotineta" src={trotineta_img}></img>
                        <div>
                          <div className="al">
                            <span>Type: {ride.type} </span>
                          </div>
                          <span>Price: {ride.price} lei </span>
                          <span>Distance: {ride.distance / 1000} KM </span>
                        </div>
                      </div>
                    );
                } else if (ride.price === null)
                  if (ride.type === "Trotineta")
                    return (
                      <div key={ride.price} className="ride unrent">
                        <img className="trotineta" src={trotineta_img}></img>
                        <div>
                          <span>Active ride</span>
                          <button
                            id="rent"
                            onClick={() => {
                              unrent().then(() => {
                                window.location.reload();
                              });
                            }}
                          >
                            {btn_msg}
                          </button>
                        </div>
                      </div>
                    );
                  else if (ride.type === "Bicicleta")
                    return (
                      <div key={ride.price} className="ride unrent">
                        <img className="bicicleta" src={bike_img}></img>
                        <div>
                          <span>Active ride</span>
                          <button
                            id="rent"
                            onClick={() => {
                              unrent().then(() => {
                                window.location.reload();
                              });
                            }}
                          >
                            {btn_msg}
                          </button>
                        </div>
                      </div>
                    );
                return "";
              })}
            </div>
          </div>

          <div className="garbages">
            <div className="smtt">
              <h1>Garbage points to be collected</h1>
              <div id="map2"></div>
            </div>
            <button
              className="learn-more"
              onClick={() => {
                if (isGeolocationAvailable) {
                  if (isGeolocationEnabled) {
                    console.log(coords);
                    addNew(coords?.latitude, coords?.longitude);
                  } else {
                    console.log("enable geolocation");
                  }
                } else {
                  console.log("geolocation is not available");
                }
              }}
            >
              Click to add a garbage point.
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Trebuie sa te loghezi mai intai !</h1>
        <button>
          <a href="/conectare">Poftim aici.</a>
        </button>
      </div>
    );
  }
}

export default Dashboard;
