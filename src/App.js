import React, { Component } from 'react';
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';
import { connect } from "react-redux";

// making sure everything still works 

class App extends Component {
// renders HeaderNav and Routes
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes posts={ this.props.posts }/>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
        posts: state.posts
    }
}

export default connect(
    mapStateToProps
)(App);