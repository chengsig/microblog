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
        
        this.props.handleAdd(this.state);
       
        this.setState({
            title: "", 
            description: "",
            body: ""
        });

        this.props.history.push("/");
    }

    // rendres form for adding a new post 
    render() {
        return (
            <div className="AddCommentform">
                <form clasName="AddCommentForm-comment">
                    <input name="comment"
                           value={this.state.comment}
                           onChange={this.handleChange}
                           placeholder="New Comment" />
                    {/* <button onSubmit={} >Add</button> */}
                </form>
            </div>
        );
    }
}

export default AddCommentForm;