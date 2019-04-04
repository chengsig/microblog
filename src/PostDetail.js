import React, { Component } from "react";
import NewPostForm from './NewPostForm';
import AddCommentForm from './AddCommentForm';
import { connect } from "react-redux";
import { editPost, deletePost, addComment, deleteComment } from "./actions";

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        }

        this.editing = this.editing.bind(this);
        this.handlePostRemove = this.handlePostRemove.bind(this);
        this.handleCommentRemove = this.handleCommentRemove.bind(this);

    }

    // changes PostDetail editing state
    editing(e) {
        this.setState({
            isEditing: true
        })
    }

    // calls handleDelete, which removes post from App state and redirects to "/"
    handlePostRemove(e) {
        this.props.deletePost(this.props.postId);
        this.props.history.push("/");
    }

    // calls handleCommentDelete, removes comment from App state by comment id
    handleCommentRemove(e) {
        console.log("POSTID", this.props.postId, "COMMENT", e.target.id)
        this.props.deleteComment(this.props.postId, e.target.id);
    }

    // renders post detail
    // title, description, and body
    render() {
        console.log("postdetail render", this.props.post)
        if (this.props.post === undefined) {
            this.props.history.push("/");
            return null;
        }

        let editForm = null;
        if (this.state.isEditing) {
            editForm = (
                <NewPostForm id={this.props.post.id}
                    handlePostEdit={this.props.editPost}
                    history={this.props.history} />
            )
        }

        let comments = [];

        if (this.props.post.comments !== undefined) {
            for (let key in this.props.post.comments) {
                comments.push(
                    <div className="Comment" key={ key }>
                        <p>{this.props.post.comments[key]}</p>
                        <i id={ key } className="fas fa-trash-alt" onClick={ this.handleCommentRemove }></i>
                    </div>
                )   
            }
        }

        return (
            <div className="PostDetail">
                <div className="PostDetail-post">
                    <h2>{this.props.post.title}</h2>
                    <i>{this.props.post.description}</i>
                    <p>{this.props.post.body}</p>
                    <i className="fas fa-edit" onClick={this.editing}></i>
                    <i className="fas fa-trash-alt" onClick={this.handlePostRemove}></i>
                    {editForm}
                </div>
                <div className="PostDetail-comments">
                    <h3>Comments</h3>
                    {comments}
                    <AddCommentForm postId={this.props.postId}
                        handleCommentAdd={this.props.addComment} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

export default connect(
    mapStateToProps,
    { editPost, deletePost, addComment, deleteComment }
)(PostDetail);