import React, { useEffect, useState } from "react";
import config from "../base";
import * as firebase from "firebase/app";
import { addDoc, getFirestore, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import "../styles/dashboard.scss";
import { useGeolocated } from "react-geolocated";

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
      userDecisionTimeout: 5000,
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
            return (
              <div key={ride.from.latitude} className="ride">
                <span>Type: {ride.bike} </span>
                <span>Price: {ride.price} lei </span>
                <span>
                  From: {ride.from.latitude} - {ride.from.longitude}
                </span>
                <span>
                  To: {ride.to.latitude} - {ride.to.longitude}
                </span>
              </div>
            );
          })}
        </div>
        {/* <h1>AVAILABLE BIKES</h1>
        <div className="rides">
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
