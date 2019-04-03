import React, { Component } from 'react';
import uuid from "uuid/v4";
import './App.css';
import HeaderNav from './HeaderNav';
import Routes from './Routes';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [], 
      comments: [] //{postId: id(posts), comment: ""}
    }

    this.addPost = this.addPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
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

  // removes post from App state by id
  deletePost(id) {
    this.setState({
      posts: this.state.posts.filter(p => p.id !== id)
    })
  }
  
  // adds new comment to App state
  addComment(postId, comment){
    let newComment = { ...comment, postId, id: uuid() }

    this.setState(state => ({
      comments: [ ...state.comments, newComment ]
    }));
  }

  //removes comment from App state by comment id
  deleteComment(commentId) {
    this.setState({
      comments: this.state.comments.filter(c => c.id !== commentId)
    })
  }

  // renders HeaderNav and Routes
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Routes posts={ this.state.posts } 
                comments={ this.state.comments }
                handlePostAdd={ this.addPost }
                handlePostEdit={ this.editPost }
                handlePostDelete={ this.deletePost }
                handleCommentDelete={ this.deleteComment }/>
      </div>
    );
  }
}

export default App;
