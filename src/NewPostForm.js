import React, { Component } from "react";
//import { Redirect } from 'react-router-dom';


class NewPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            body: "",
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // on form input change, updates NewPostForm states
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // on form submit, calls handleAdd which will add new post to 
    // App state. resets NewPostForm state and redirects to "/"
    handleSubmit(e) {
        e.preventDefault();
        //if id exist in props => editsubmit
        //if id is undefined => addsubmit
        if (this.props.id === undefined) {
            this.props.handlePostAdd(this.state);
        } else {
            this.props.handlePostEdit(this.props.id, this.state);
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

    // rendres form for adding a new post 
    render() {
        return (
            <div className="NewPostForm">
                <p>New Post</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="NewPostForm-title">
                        <label htmlFor="title">Title: </label>
                        <input name="title"
                            id="title"
                            onChange={this.handleChange}
                            value={this.state.title} />
                    </div>
                    <div className="NewPostForm-description">
                        <label htmlFor="description">Description: </label>
                        <input name="description"
                            id="description"
                            onChange={this.handleChange}
                            value={this.state.description} />
                    </div>
                    <div className="NewPostForm-body">
                        <label htmlFor="body">Body: </label>
                        <input name="body"
                            id="body"
                            onChange={this.handleChange}
                            value={this.state.body} />
                    </div>
                    <button>Save</button>
                    <button onClick={ this.handleCancel }>Cancel</button>
                </form>
            </div>
        );
    }
}

export default NewPostForm;