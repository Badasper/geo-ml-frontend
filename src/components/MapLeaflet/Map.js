import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';

const context = [];
let count = 1;

class MapLeaflet extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };

  componentDidMount() {
    const map = this.map.leafletElement;
    map.pm.addControls({
      position: 'topleft',
      drawCircleMarker: false,
      drawCircle: false,
    });

    map.on('pm:create', (e) => {
      const layer = e.layer;
      if (e.shape === 'Circle') {
        const info = [layer._latlng, layer.options];
        context.push({
          type: e.shape,
          coordinates: info,
        });
      } else {
        const geoJson = {
          type: 'Feature',
          geometry: {
            type: e.shape,
            coordinates: layer._latlngs,
          },
          properties: {
            popupContent: '',
          },
          id: count++,
        };
        context.push(geoJson);
      }
      // layer.on('pm:edit', (ev) => {
      //   console.log(ev);
      // });
    });
  }

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
        {/* <GeoJSON data={this.state.data} /> */}
      </Map>
    );
  }
}

export { MapLeaflet, context };
