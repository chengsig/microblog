import React, { Component } from "react";
import PostCard from "./PostCard";

class PostList extends Component {
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
                posts!
            </div>
        );
    }
}

export default PostList;