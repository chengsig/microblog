import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './HeaderNav.css';

class HeaderNav extends Component {
    render() {
        const activeStyle = {
            fontWeight: "bold",
            color: "tomato"
        }
        // render full nav bar
        return (
            <nav>
                <div className="jumbotron">
                    <h1 id="Microblog" className="display-4">Microblog</h1><br />
                    <p className="lead">Get in the Rithm of blogging!</p>
                    <p id="blog"><NavLink exact to="/" activeStyle={activeStyle}>Blog</NavLink></p>
                    <p id="add"><NavLink to="/new" activeStyle={activeStyle}>Add a new post</NavLink></p>
                </div>
                <p className="text-center">Welcome to <b>Microblog</b>, our innovative site for communicating on the information superhighway.</p>
            </nav>
        );
    }
}

export default HeaderNav;