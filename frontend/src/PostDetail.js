import React, { Component } from "react";
import NewOrEditPostForm from './NewOrEditPostForm';
import AddCommentForm from './AddCommentForm';
import { connect } from "react-redux";
import { deleteCommentFromAPI, getPostFromAPI, deletePostFromAPI } from "./actions";
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
    async handleCommentRemove(e) {
        await this.props.deleteCommentFromAPI(this.props.postId, e.target.id);
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
            comments = this.props.post.comments.map(c => 
                    <div className="Comment" key={c.id}>
                        <p>{c.text}</p>
                        <i id={c.id} className="far fa-trash-alt" onClick={this.handleCommentRemove}></i>
                    </div>
                )
        }

        return (
            <div className="PostDetail">
                <div className="PostDetail-post">
                    <button id="votes" type="button" className="btn btn-light">
                        Votes: <span className="badge badge-light">{this.props.post.votes}</span>
                    </button>
                    <h1 id="title">{this.props.post.title}</h1>
                    <i id="trash" className="fas fa-trash-alt" onClick={this.handlePostRemove}></i>
                    <i id="edit" className="fas fa-edit" onClick={this.toggleEditState}></i>
                    <i id="vote-down" class="far fa-thumbs-down"></i>
                    <i id="vote-up" class="far fa-thumbs-up"></i>
                    <br />
                    <p id="description"><i>{this.props.post.description}</i></p>
                    <h4 id="body">{this.props.post.body}</h4>
                    {editForm}
                </div>
                <br />
                <div className="Pcomments">
                    <h3>Comments</h3>
                    {comments}
                    <AddCommentForm postId={this.props.postId}/>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        post: state.posts[ownProps.postId],
        title: state.title
    }
}

export default connect(
    mapStateToProps,
    { deleteCommentFromAPI, getPostFromAPI, deletePostFromAPI }
)(PostDetail);