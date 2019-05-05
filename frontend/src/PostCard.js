import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './PostCard.css';

class PostCard extends Component {
    // renders link to post & post description
    render() {
        return (
            <div className="PostCard">
                <div className="card">
                    <div className="card-body">
                        <Link to={`/${this.props.id}`}>{ this.props.title }</Link>
                        <p>{ this.props.description }</p>
                    </div>
                </div>               
            </div>
        );
    }
}

export default PostCard;