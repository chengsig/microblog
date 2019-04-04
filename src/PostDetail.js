import React, { Component } from "react";
import NewOrEditPostForm from './NewOrEditPostForm';
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
        this.props.deleteComment(this.props.postId, e.target.id);
    }

    // renders post detail
    // title, description, and body
    render() {
        if (this.props.post === undefined) {
            this.props.history.push("/");
            return null;
        }

        let editForm = null;
        if (this.state.isEditing) {
            editForm = (
                <NewOrEditPostForm id={this.props.postId}
                    handlePostEdit={this.props.editPost}
                    isEditing={this.state.isEditing}
                    history={this.props.history} />
            )
        }

    
        let entries = Object.entries(this.props.post.comments);
        let comments = entries.map(c => (
            console.log('what is c?', c[1]),
            <div className="Comment" key={c[0]}>
                <p>{c[1]}</p>
                <i id={c[0]} className="fas fa-trash-alt" onClick={this.handleCommentRemove}></i>
            </div>
        ))

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

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts[ownProps.postId]
    }
}

export default connect(
    mapStateToProps,
    { editPost, deletePost, addComment, deleteComment }
)(PostDetail);