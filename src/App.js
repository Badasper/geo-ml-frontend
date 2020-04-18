import React from 'react';
import './App.css';
import { Header, Content, Navbar, Footer } from './components';

function App() {
  return (
    <div className="grid">
      <Header />
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
