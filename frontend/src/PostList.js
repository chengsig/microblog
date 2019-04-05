import React, { Component } from "react";
import PostCard from "./PostCard";
import { connect } from "react-redux";

import { getTitlesFromAPI } from "./actions";

class PostList extends Component {
    componentDidMount() {
        this.props.getTitlesFromAPI();
    }

    // renders list of PostCards
    render() {
        let titles = this.props.titles.map(t => (
            <PostCard key={t.id}
                id={t.id}
                title={t.title}
                description={t.description}
            />)
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