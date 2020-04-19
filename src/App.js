import React from 'react';
import './App.css';
import { Navbar, Map, context } from './components';

function App() {
  return (
    <div className="grid">
      <Navbar context={context} />
      <Map />
    </div>
  );
}

export default App;
