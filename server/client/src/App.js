import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WeGotcha</h1>
        </header>
        <p className="App-intro">
          Tired of wasting time in office hours?  Log in and start having fun!
        </p>
        <a className="button" href="/auth/google"> Log in with Google </a>
        <a className="button" href="/create"> Create office hours </a>
      </div>
    );
  }
}

export default App;
