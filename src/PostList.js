import React, { Component } from "react";

import PostCard from "./PostCard";

class PostList extends Component {
    render() {
        // const posts = this.props.posts.map(p => (
        //     <postCard />
        // ));

        return (
            <div className="PostList">
                {/* {posts} */}
                posts!
            </div>
        );
    }
}

export default PostList;