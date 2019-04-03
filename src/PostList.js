import React, { Component } from "react";
import PostCard from "./PostCard";

class PostList extends Component {
    // renders list of PostCards
    render() {
        const posts = this.props.posts.map(p => (
            <PostCard id={ p.id }
                      title={ p.title }
                      description={ p.description }
                      body={ p.body }/>
        ));

        return (
            <div className="PostList">
                {posts}
            </div>
        );
    }
}

export default PostList;