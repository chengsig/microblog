import React, { Component } from 'react';
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';

class App extends Component {
// renders HeaderNav and Routes
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes/>
      </div>
    );
  }
}

export default App;