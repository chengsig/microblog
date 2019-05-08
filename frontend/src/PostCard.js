import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './PostCard.css';

class PostCard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    // async componentDidMount() {
    //     await this.props.
    // }

    // renders link to post & post description
    render() {
        return (
            <div className="PostCard">
                <div className="card">
                    <div className="card-body">
                        <Link to={`/${this.props.id}`}>{ this.props.title }</Link>
                        <p>{ this.props.description }</p>
                        <div id="vote-area" className="class-footer">
                            0 votes
                            <i id="vote-down" class="far fa-thumbs-down"></i>
                            <i id="vote-up" class="far fa-thumbs-up"></i>
                        </div>
                    </div>
                </div>               
            </div>
        );
    }
}

export default PostCard;