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
        // multiple markers like this.
        // new Feature({
        //   geometry: new Point(
        //     fromLonLat([28.049817017663444, 45.440741163831625])
        //   ),
        // }),
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ea
          eaque nisi fuga necessitatibus adipisci. Dolore ad aliquid obcaecati,
          magnam molestiae laborum, ea id provident modi possimus alias
          voluptates hic?
        </p>
        <img alt="qr" src={qr} />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
          doloribus nostrum reprehenderit similique temporibus iusto quibusdam
          nam modi, suscipit maxime perspiciatis dicta magni nobis commodi
          harum, repudiandae qui, illo quis!
        </p>
      </div>
    </div>
  );
}

export default Descopera;
