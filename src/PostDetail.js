import React, { Component } from "react";
import NewPostForm from './NewPostForm';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
        this.editing = this.editing.bind(this);
    }

    editing(e) {
        this.setState({
            isEditing: true
        })
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
        // do we need button?
        return (
            <div className="PostDetail">
                <h2>{this.props.post.title}</h2>
                <i>{this.props.post.description}</i>
                <p>{this.props.post.body}</p>
                <button onClick={this.editing}><i class="fas fa-edit"></i></button>
                <button><i class="fas fa-trash-alt"></i></button>
                {editForm}
            </div>
        );
    }
}

export default PostDetail;