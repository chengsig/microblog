import React, { Component } from "react";
import PostCard from "./PostCard";

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

export default PostList;