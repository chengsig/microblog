import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Votes from "./Votes";
import './PostCard.css';

class PostCard extends Component {
    
    shouldComponentUpdate(nextProps) {
        console.log(nextProps, "please what is this")
        return nextProps.votes !== this.props.votes;
    }

    // renders link to post & post description
    render() {
        return (
            <div className="PostCard">
                <div className="card">
                    <div className="card-body">
                        <Link to={`/${this.props.id}`}>{ this.props.title }</Link>
                        <p>{ this.props.description } </p>
                        <Votes id={this.props.id} 
                               votes={this.props.votes}
                               updateVoteToAPI={this.props.updateVoteToAPI}/>
                    </div>
                </div>               
            </div>
        );
    }
}

export default PostCard;