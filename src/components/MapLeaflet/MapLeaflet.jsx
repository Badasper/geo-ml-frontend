import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

export default class BoundsExample extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,

    data: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-0.09, 51.53],
            [-0.09, 51.5],
          ],
        },
        properties: {
          popupContent: 'This is free bus that will take you across downtown.',
        },
        id: 1,
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-0.08, 51.53],
            [-0.09, 51.5],
          ],
        },
        properties: {
          popupContent: 'This is free bus that will take you across downtown.',
        },
        id: 2,
      },
    ],
  };

  componentDidMount() {
    if (typeof L !== 'undefined') {
      const map = this.map.leafletElement;
      map.pm.addControls({
        position: 'topleft',
        drawCircle: false,
      });
    }
  }

  handleClick = (e) => {
    const layers = this.map.leafletElement._layers;
    const keys = Object.keys(layers)
      .filter((x) => layers[x].defaultOptions)
      .map((x) => layers[x].defaultOptions.data);

    console.log(layers);
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        ref={(c) => {
          this.map = c;
        }}
        onClick={this.handleClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={this.state.data} />
      </Map>
    );
  }
}
