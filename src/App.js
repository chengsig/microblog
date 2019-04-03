import React, { Component } from 'react';
import uuid from "uuid/v4";
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.addPost = this.addPost.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  // adds new post to App state
  addPost(post){
    let newPost = { ...post, id: uuid() }

    this.setState(state => ({
      posts: [ ...state.posts, newPost ]
    }));
  }

  //edit an existing post from PostDetail page
  editPost(id, post) {
    let otherPosts = this.state.posts.filter(p => p.id !== id);
    this.setState({
      posts: [...otherPosts, {...post, id: id}]
    });
  }

  // renders HeaderNav and Routes
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes posts={ this.state.posts } 
                handleAdd={ this.addPost }
                handleEdit={ this.editPost }/>
      </div>
    );
  }
}

export default App;
