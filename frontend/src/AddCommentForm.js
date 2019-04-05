import React, { Component } from "react";

class AddCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "" 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // on form input change, updates AddCommentForm states
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // on form submit, calls handleAdd which will add new comment to 
    // App state. resets AddCommentForm state
    handleSubmit(e) {
        e.preventDefault();
        
        this.props.handleCommentAdd(this.props.postId, this.state);
       
        this.setState({
            comment: "", 
        });
    }

    // renders form for adding a new post 
    render() {
        return (
            <div className="AddCommentform">
                <form className="AddCommentForm-comment" onSubmit={ this.handleSubmit }>
                    <input name="comment"
                           value={this.state.comment}
                           onChange={this.handleChange}
                           placeholder="New Comment" />
                           
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddCommentForm;