import React, { Component } from "react";

class PostDetail extends Component {
    // renders post detail
    // title, description, and body
    render() {
        if (this.props.post === undefined) {
            this.props.history.push("/");
            return null;
        }
        // do we need button?
        return (
            <div className="PostDetail">
                <h2>{this.props.post.title}</h2>
                <i>{this.props.post.description}</i>
                <p>{this.props.post.body}</p>
                <button><i class="fas fa-edit"></i></button>
                <button><i class="fas fa-trash-alt"></i></button>
            </div>
        );
    }
}

export default PostDetail;