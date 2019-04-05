import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, editPost } from "./actions";

class NewOrEditPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            description: this.props.post.description,
            body: this.props.post.body
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // on form input change, updates NewOrEditPostForm states
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // on form submit, calls handleAdd which will add new post to 
    // App state. resets NewOrEditPostForm state and redirects to "/"
    handleSubmit(e) {
        e.preventDefault();
        //if id exist in props => editsubmit
        //if id is undefined => addsubmit
        if (this.props.id === undefined) {
            this.props.addPost(this.state);
        } else {
            this.props.editPost(this.props.id, this.state);
        }

        this.setState({
            title: "", 
            description: "",
            body: ""
        });

        this.props.history.push("/");
    }

    // redirects to "/"
    handleCancel() {
        this.props.history.push("/");
    }

    // renders form for adding a new post 
    render() {
        let formName = this.props.isEditing ? "Edit Post" : "New Post";
        return (
            <div className="NewOrEditPostForm">
                <p>{formName}</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="NewOrEditPostForm-title">
                        <label htmlFor="title">Title: </label>
                        <input name="title"
                            id="title"
                            onChange={this.handleChange}
                            value={this.state.title} 
                            // placeholder={placeholderTitle}
                            />
                    </div>
                    <div className="NewOrEditPostForm-description">
                        <label htmlFor="description">Description: </label>
                        <input name="description"
                            id="description"
                            onChange={this.handleChange}
                            value={this.state.description} 
                            // placeholder={placeholderDescription}
                            />
                    </div>
                    <div className="NewOrEditPostForm-body">
                        <label htmlFor="body">Body: </label>
                        <input name="body"
                            id="body"
                            onChange={this.handleChange}
                            value={this.state.body} 
                            // placeholder={placeholderBody}
                            />
                    </div>
                    <button>Save</button>
                    <button onClick={ this.handleCancel }>Cancel</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        post: state.posts[ownProps.id] || {title: "", description: "", body: ""}
    }
}

export default connect(
    mapStateToProps,
    { addPost, editPost }
)(NewOrEditPostForm);
