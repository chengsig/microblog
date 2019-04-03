import React, { Component } from "react";

class PostDetail extends Component {
    // renders post detail
    // title, description, and body
    render() {
        if (this.props.post === undefined) {
            this.props.history.push("/");
            return null;
        }

        return (
            <div className="PostDetail">
                <h2>{this.props.post.title}</h2>
                {this.props.post.description}
                {this.props.post.body}
                <button></button>
                <button></button>
            </div>
        );
    }
}

export default PostDetail;