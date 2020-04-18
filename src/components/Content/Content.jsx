import s from './Content.module.css';

import React, { Component } from 'react';
import { Map, TileLayer, Rectangle } from 'react-leaflet';

const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
];
const inner = [
  [49.505, -2.09],
  [53.505, 2.09],
];

export default class BoundsExample extends Component {
  state = {
    bounds: outer,
  };

  onClickInner = () => {
    this.setState({ bounds: inner });
  };

  onClickOuter = () => {
    this.setState({ bounds: outer });
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

  render() {
    return (
      <Map
        bounds={this.state.bounds}
        ref={(c) => {
          this.map = c;
        }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Rectangle
          bounds={outer}
          color={this.state.bounds === outer ? 'red' : 'white'}
          onClick={this.onClickOuter}
        />
        <Rectangle
          bounds={inner}
          color={this.state.bounds === inner ? 'red' : 'white'}
          onClick={this.onClickInner}
        />
      </Map>
    );
  }
}
