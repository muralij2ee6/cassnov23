import React from 'react';
import logo from './logo.svg';
import './App.css';
import AutomobileForm from './AutomobileForm';
import CarDisplay from './CarDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to Our Automobile Showcase</h1>
      </header>
      <main>
        <section className="form-section">
          <AutomobileForm />
        </section>
        <section className="display-section">
          <CarDisplay />
        </section>
      </main>
    </div>
  );
}

export default App;
