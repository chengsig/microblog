import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes />
      </div>
    );
  }
}

export default App;
