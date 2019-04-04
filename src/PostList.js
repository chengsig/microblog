import React, { Component } from "react";
import PostCard from "./PostCard";
import { connect } from "react-redux";

class PostList extends Component {
    // renders list of PostCards
    render() {
        let posts = [];
        for (let id in this.props.posts) {
            posts.push(
            <PostCard key={id}
                id={id}
                title={ this.props.posts[id].title }
                description={ this.props.posts[id].description }
                body={ this.props.posts[id].body }/>
            )
        }

        return (
            <div className="PostList">
                {posts}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts
    }
}

export default connect(
    mapStateToProps,
)(PostList);