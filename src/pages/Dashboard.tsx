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

const app = firebase.initializeApp(config);
const db = getFirestore(app);

function Dashboard() {
  function signOut() {
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000";
  }
  let user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", `${user.email}`));
  // const smt = async () => {
  //   const querySnapshot = await getDocs(q);
  //   console.log(querySnapshot.docs[0].id);
  //   if (querySnapshot.docs[0].data().email === user.email) {
  //     const ridesRef = collection(
  //       db,
  //       `users/${querySnapshot.docs[0].id}/rides`
  //     );
  //     const rides = getDocs(ridesRef);
  //     (await rides).forEach((ride) => {
  //       // ca sa poti vedea objectul
  //       const rd = JSON.stringify(ride.data());
  //       console.log(`${ride.id} => ${rd}`);
  //       // ca sa poti folosi variabilele din object
  //       // const rd = JSON.parse(JSON.stringify(ride.data()));
  //       // console.log(rd.bike);
  //     });
  //   }
  // };

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

  // useEffect(() => {
  //   const here = async () => {
  //     const bikesRef = collection(db, "bikes");
  //     const bikes = getDocs(bikesRef);
  //     (await bikes).forEach((bike) => {
  //       const bk_object = JSON.parse(JSON.stringify(bike.data()));
  //       setB((prev) => [...prev, bk_object]);
  //     });
  //   };
  //   // eslint-disable-next-line
  //   const alt = here().catch(console.error);
  // }, []);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 25000,
    });

  // const addNewPoint = async () => {
  //   const col = collection(db, "garbage");
  //   const res = await addDoc(col, { location: [40.002134, 23.1238904781] });
  //   console.log("Added succesfully with ID " + res.id);
  // };

  async function addNew(latitude: any, longitude: any) {
    const col = collection(db, "garbage");
    const res = await addDoc(col, { location: [latitude, longitude] });
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
            to: { latitude: coords?.latitude, longitude: coords?.longitude },
          })
            .then(() => {
              d = getPreciseDistance(
                {
                  latitude: bikeDATA.from.latitude,
                  longitude: bikeDATA.from.longitude,
                },
                {
                  latitude: bikeDATA.to.latitude,
                  longitude: bikeDATA.to.longitude,
                }
              );
              // distance in km = distance / 1000
              p = (d / 1000) * 5;
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

  if (user.uid !== undefined) {
    return (
      <div>
        <img alt="avatar" src={user.providerData[0].photoURL} />
        <p>Logged in as: {user.providerData[0].email}</p>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
        <h1>RIDE HISTORY</h1>
        <div className="rides">
          {r.map((ride) => {
            // getFromAddress(ride.from.latitude, ride.from.longitude);
            // getToAddress(ride.to.latitude, ride.to.longitude);
            if (ride.price !== null)
              return (
                <div key={ride.price} className="ride">
                  <span>Type: {ride.type} </span>
                  <span>Price: {ride.price} lei </span>
                  <span>Distance: {ride.distance / 1000} KM </span>
                  <span>From: {from_address}</span>
                  <span>To: {to_address}</span>
                </div>
              );
            else if (ride.price === null)
              return (
                <div key={ride.price} className="ride">
                  <span>Active ride</span>
                  <span>Type: {ride.type} </span>
                  <span>Price: {ride.price} lei </span>
                  <span>Distance: {ride.distance} KM </span>
                  <span>From: {from_address}</span>
                  <span>To: {to_address}</span>
                  <button
                    onClick={() => {
                      unrent().then(() => {
                        window.location.reload();
                      });
                    }}
                  >
                    unrent
                  </button>
                </div>
              );
            return "";
          })}
        </div>
        {/* <h1>AVAILABLE BIKES</h1>
        <div className="rides">
        , , 
          {b.map((bike) => {
            return (
              <div key={bike.id} className="ride">
                <span>ID: {bike.id} </span>
                <span>Type: {bike.type} </span>
                <span>City: {bike.city} </span>
                <span>
                  Location: {bike.location.latitude} - {bike.location.longitude}
                </span>
                <span>Available: {bike.available}</span>
              </div>
            );
          })}
        </div> */}

        <div>
          <button
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
            GPS
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>DU-TE SI LOGHEAZA-TE</h1>
        <button>
          <a href="/conectare">IA DE AICI</a>
        </button>
      </div>
    );
  }
}

export default Dashboard;
