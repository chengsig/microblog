import React, { Component } from "react";
import { addCommentToAPI } from "./actions";
import { connect } from "react-redux";

class AddCommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "" 
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
    async handleSubmit(e) {
        e.preventDefault();
        await this.props.addCommentToAPI(this.props.postId, this.state);
        this.setState({
            text: "", 
        });
    }

    // renders form for adding a new post 
    render() {
        return (
            <div className="AddCommentform">
                <form className="AddCommentForm-comment" onSubmit={ this.handleSubmit }>
                    <input name="text"
                           value={this.state.comment}
                           onChange={this.handleChange}
                           placeholder="New Comment" />
                    <button>Add</button>
                </form>
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
    { addCommentToAPI }
)(AddCommentForm);