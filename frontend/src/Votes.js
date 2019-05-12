import React, { Component } from "react";

class Votes extends Component {
    constructor (props) {
        super(props);

        this.handleVotesUp = this.handleVotesUp.bind(this);
        this.handleVotesDown = this.handleVotesDown.bind(this);
    }

    // calls API to update votes for a post by +1
    async handleVotesUp(e) {
        await this.props.updateVoteToAPI(this.props.id, "up");
    }

    // calls API to update votes for a post by -1
    async handleVotesDown(e) {
        await this.props.updateVoteToAPI(this.props.id, "down");
    }

    // renders link to post & post description
    render() {
        return (
            <div className="Votes">
                <div id="vote-area" className="class-footer">
                    {this.props.votes} votes
                    <i id="vote-down" class="far fa-thumbs-down" onClick={this.handleVotesDown}></i>
                    <i id="vote-up" class="far fa-thumbs-up" onClick={this.handleVotesUp}></i>
                </div>             
            </div>
        );
    }
}


export default Votes;