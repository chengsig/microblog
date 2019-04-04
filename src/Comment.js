import React, { Component } from "react";

class Comment extends Component {
    // renders link to post & post description
    constructor(props){
        super(props);
        
        this.handleCommentRemove = this.handleCommentRemove.bind(this);
    }
    // calls handleCommentDelete, removes comment from App state by comment id
    handleCommentRemove(e) {
        console.log("POSTID", this.props.postId, "COMMENT", e.target.id)
        this.props.handleSubmit(this.props.postId, e.target.id);
    }

    render() {
        return (
            <div className="Comment">
                <p>{ this.props.comment }</p>
                <i id={this.props.id} className="fas fa-trash-alt" onClick={this.handleCommentRemove}></i>
            </div>
        );
    }
}

export default Comment;