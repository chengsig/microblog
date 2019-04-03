import React, { Component } from "react";


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
    }

    // on form input change, updates profile states
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // on form submit, send updated data to backend update user route
    handleSubmit(e) {
        e.preventDefault();
        //this.props.submitMethod();
    }

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
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default NewPostForm;