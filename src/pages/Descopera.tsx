import React, { useState } from "react";
import "../styles/descopera.scss";
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
import config from "../base";
import * as firebase from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const app = firebase.initializeApp(config);
const db = getFirestore(app);
const qr = require("../assets/qr.png");

function Descopera() {
  const [ridess, setRides] = useState<any[]>([]);
  async function getPoints() {
    const ridesRef = collection(db, `bikes`);
    // eslint-disable-next-line
    const rides = await getDocs(ridesRef).then((rides_idk) => {
      rides_idk.forEach((ride) => {
        const rd_object = JSON.parse(JSON.stringify(ride.data()));
        setRides((prev) => [...prev, rd_object.location]);
      });
    });
  }
  function callMap() {
    const map = new Map({
      target: "map",
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
        features: ridess.map(
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
    if (ridess.length > 0) {
      callMap();
    }
    // eslint-disable-next-line
  }, [ridess]);

  return (
    <div className="cont">
      <div className="harta">
        <div id="map"></div>
      </div>
      <div className="bl">
        <p>
          Ați ghicit bine ! Acum avem și aplicație de telefon ! Dacă scanați
          codul QR de mai jos ve-ți fi redirecționati către Play Store unde
          ve-ți putea instala aplicația.
        </p>
        <img alt="qr" src={qr} />
        <p>
          În urma feedback-ului , am văzut ca mulți useri își planifică ieșirile
          în momentul când ies afară, si noi ne-am gândit se le ușurăm planurile
          lansând aplicația. Acum te poți duce la orice punct de staționare a
          bicicletelor/trotinetelor electrice și cu o singură scanare te poți
          pune în mișcare !
        </p>
      </div>
    </div>
  );
}

export default Descopera;
