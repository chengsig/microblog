import React, { Component } from "react";
import NewPostForm from './NewPostForm';
import AddCommentForm from './AddCommentForm';

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
        this.props.handlePostDelete(this.props.post.id);
        this.props.history.push("/");
    }

    handleCommentRemove(e) {
        this.props.handleCommentDelete(e.target.id);
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
                <NewPostForm id={this.props.post.id}
                    handleEdit={this.props.handleEdit}
                    history={this.props.history} />
            )
        }
        let comments = null;
        if (this.props.comments.length !== 0) {
            comments = (this.props.comments.map(c => (
                <div className="PostDetail-commentList">
                    <i id={c.id} class="fas fa-trash-alt" onClick={this.handleCommentRemove}></i>
                    <p>{c.comment}</p>
                </div>
            )))
        }

        return (
            <div className="PostDetail">
                <div className="PostDetail-post">
                    <h2>{this.props.post.title}</h2>
                    <i>{this.props.post.description}</i>
                    <p>{this.props.post.body}</p>
                    <i class="fas fa-edit" onClick={this.editing}></i>
                    <i class="fas fa-trash-alt" onClick={this.handlePostRemove}></i>
                    {editForm}
                </div>
                <div className="PostDetail-comments">
                    <h3>Comments</h3>
                    {comments}
                    <AddCommentForm postId={this.props.post.id}
                        handleCommentAdd={this.props.handleCommentAdd} />
                </div>
            </div>
        );
    }
}

export default PostDetail;