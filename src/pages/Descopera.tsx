import React from "react";
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

const qr = require("../assets/qr.png");

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
  var layer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(
            fromLonLat([28.035817017663444, 45.440741163831625])
          ),
        }),
        new Feature({
          geometry: new Point(
            fromLonLat([27.603447293283057, 47.1547069796327])
          ),
        }),
        new Feature({
          geometry: new Point(
            fromLonLat([26.102531257911046, 44.43534472004674])
          ),
        }),
        new Feature({
          geometry: new Point(
            fromLonLat([25.609849723159783, 45.652208499224734])
          ),
        }),
        new Feature({
          geometry: new Point(
            fromLonLat([23.596253795307078, 46.77183528160379])
          ),
        }),
      ],
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

// 45.440741163831625, 28.035817017663444 - galati

// 46.072497530954756, 24.944101381179326 - center

window.onload = callMap;

function Descopera() {
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
