import React, { Component } from "react";
import NewOrEditPostForm from './NewOrEditPostForm';
import AddCommentForm from './AddCommentForm';
import { connect } from "react-redux";
import { addComment, deleteComment, getPostFromAPI, deletePostFromAPI } from "./actions";
import './PostDetail.css';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            isLoading: true
        }

        this.toggleEditState = this.toggleEditState.bind(this);
        this.handlePostRemove = this.handlePostRemove.bind(this);
        this.handleCommentRemove = this.handleCommentRemove.bind(this);
    }

    async componentDidMount() {
        if (this.props.post === undefined){
            await this.props.getPostFromAPI(this.props.postId);
            this.setState({
                isLoading: false
            });
            
        }
    }

    // changes PostDetail editing state
    toggleEditState(e) {
        this.setState({
            isEditing: true
        })
    }

    // calls handleDelete, which removes post from App state and redirects to "/"
    handlePostRemove(e) {
        this.props.deletePostFromAPI(this.props.postId);
        this.props.history.push("/");
        //return <Redirect to="/"/>
    }

    // calls handleCommentDelete, removes comment from App state by comment id
    handleCommentRemove(e) {
        this.props.deleteComment(this.props.postId, e.target.id);
    }

    // renders post detail
    // title, description, and body
    render() {
    
        if (this.state.isLoading) {
            return <p>"...loading"</p>;
        } 

        let editForm = null;
        if (this.state.isEditing) {
            editForm = (
                <NewOrEditPostForm id={this.props.postId}
                    isEditing={this.state.isEditing}
                    history={this.props.history} />
            )
        }

        let comments = null;
        if (this.props.post !== undefined){
            comments = this.props.post.comments.map(c => (
                <div className="Comment" key={c.id}>
                    <p>{c.text}</p>
                    <i id={c.id} className="fas fa-trash-alt" onClick={this.handleCommentRemove}></i>
                </div>
            ))
        }

        return (
            <div className="PostDetail">
                <div className="PostDetail-post">
                    <h1 id="title">{this.props.post.title}</h1>
                    <i id="edit" className="fas fa-edit" onClick={this.toggleEditState}></i>
                    <i id="trash" className="fas fa-trash-alt" onClick={this.handlePostRemove}></i>
                    <br />
                    
                    <p id="description"><i>{this.props.post.description}</i></p>
                    <p id="body"><h4>{this.props.post.body}</h4></p>
                    
                    {editForm}
                </div>
                <br />
                <div className="Pcomments">
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
    { addComment, deleteComment, getPostFromAPI, deletePostFromAPI }
)(PostDetail);