import React, { Component } from "react";
import Navbar from "./navbar.jsx";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoJson: { data: 0 },
      content: "content",
    };
  }



  async LoadJson(i) {
    let res = await axios.get("http://127.0.0.1:5000/api/to");
    const data = JSON.stringify(res.data);
    this.setState({
      geoJson: { data: 'loaded' },
    });

    this.setState({ content: data });
  }


  render() {
    const currenState = this.state.geoJson.data;
    return (
      <div className="container">
        <h1>GEO Framework</h1>
        <hr />
        <div>
          <Navbar
            value={currenState}
            onClick={() => this.LoadJson()}
            content={this.state.content}
          />
        </div>
        <div className="box">
          <div id="map"></div>
        </div>
      </div>
    );
  }
}
