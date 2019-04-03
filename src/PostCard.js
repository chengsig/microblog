import React, { Component } from "react";
import { Link } from 'react-router-dom';

class PostCard extends Component {
    render() {
        return (
            <div className="PostCard">
                <Link to={`/${this.props.id}`}>{ this.props.title }</Link>
                <p>{ this.props.description }</p>
            </div>
        );
    }
}

export default PostCard;