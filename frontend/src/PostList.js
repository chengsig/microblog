import React, { Component } from "react";
import PostCard from "./PostCard";
import { connect } from "react-redux";

import { getTitlesFromAPI } from "./actions";

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }

    async componentDidMount() {
        await this.props.getTitlesFromAPI();
        this.setState({ isLoading: false });
    }

    // renders list of PostCards
    render() {
        
        let titles = this.state.isLoading ? "...loading" : (
            this.props.titles.map(t => (
                <PostCard key={t.id}
                    id={t.id}
                    title={t.title}
                    description={t.description}
                    votes={t.votes}
                />)
            )
        )


        return (
            <div className="PostList">
                {titles}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        titles: state.titles
    }
}

export default connect(
    mapStateToProps,
    { getTitlesFromAPI }
)(PostList);