import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import './HeaderNav.css';

class HeaderNav extends Component {
    render() {
        const activeStyle = {
            fontWeight: "bold",
            color: "tomato"
        }
        // render full nav bar
        return (
            <nav>
                <h1>Microblog</h1>
                <p><NavLink exact to="/" activeStyle={activeStyle}>Blog</NavLink></p>
                <p><NavLink to="/new" activeStyle={activeStyle}>Add a new post</NavLink></p>
            </nav>
        );
    }
}

export default HeaderNav;