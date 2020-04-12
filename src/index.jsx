import './styles/styles.css'
import React from 'react'
import { render } from 'react-dom'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// react app
const App = () => (
  <div className="container">
    <h1>GEO Framework</h1>
    <hr />
    <div className="box">
      <div id="map"></div>
    </div>
  </div>
);

render(<App/>, document.getElementById('app'));

// prepare leafleft
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// connect to map
const external_map_server_api = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
// const local_map_server = 'http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png'

const defaultCenter = [46.0740,11.1476];
// Группируем слои с geojson
const group = L.layerGroup();

// рисуем карту и события
const map = L.map('map', {
	layers: L.tileLayer(external_map_server_api),
	center: defaultCenter,
	zoom: 13,
}).on('click', function(e) {
	L.circle(e.latlng, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(group).addTo(map)
    .bindPopup(`<b>This is circle coordinates!</b><br>${defaultCenter}.`)
    .openPopup();
  L.polygon([
      [46.0740 + 0.01 * Math.random(), 11.1476 + 0.01 * Math.random()],
      [46.07 + 0.01 * Math.random(),11.1 + 0.01 * Math.random()],
      [46 + 0.01 * Math.random(),11 + 0.01 * Math.random()]
  ]).addTo(group).addTo(map);
  console.log(group.toGeoJSON())
});
