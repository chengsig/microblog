import React, { Component } from 'react';
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';
import { connect } from "react-redux";
import { addPost, editPost, deletePost, addComment, deleteComment } from "./actions";

// making sure everything still works 

class App extends Component {
// renders HeaderNav and Routes
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes posts={ this.props.posts } 
                handlePostAdd={ this.props.addPost }
                handlePostEdit={ this.props.editPost }
                handlePostDelete={ this.props.deletePost }
                handleCommentAdd={ this.props.addComment }
                handleCommentDelete={ this.props.deleteComment }/>
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
    mapStateToProps,
    { addPost, editPost, deletePost, addComment, deleteComment }
)(App);