import React, { Component } from "react";
import NewPostForm from './NewPostForm';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        }
        
        this.editing = this.editing.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    // changes PostDetail editing state
    editing(e) {
        this.setState({
            isEditing: true
        })
    }

    // calls handleDelete, which removes post from App state and redirects to "/"
    handleRemove(e){
        this.props.handleDelete(this.props.post.id);
        this.props.history.push("/");
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
                <NewPostForm id={ this.props.post.id } 
                             handleEdit={ this.props.handleEdit }
                             history={ this.props.history } />
            )
        }

        return (
            <div className="PostDetail">
                <h2>{ this.props.post.title }</h2>
                <i>{ this.props.post.description }</i>
                <p>{ this.props.post.body }</p>
                <i class="fas fa-edit" onClick={ this.editing }></i>
                <i class="fas fa-trash-alt" onClick={ this.handleRemove }></i>
                {editForm}
            </div>
        );
    }
}

export default PostDetail;