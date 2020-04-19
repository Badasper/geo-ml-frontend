import React from 'react';
import './App.css';
import { Navbar, MapLeaflet, context, DropDown } from './components';

function App() {
  return (
    <div className="grid">
      <Navbar context={context} />
      <MapLeaflet />
      <div className="container">
        <DropDown />
      </div>
    </div>
  );
}

export default App;
