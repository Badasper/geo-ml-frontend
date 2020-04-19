import React from 'react';
import './App.css';
import { Navbar, MapLeaflet, context } from './components';

function App() {
  return (
    <div className="grid">
      <Navbar context={context} />
      <MapLeaflet />
    </div>
  );
}

export default App;
