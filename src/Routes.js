import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';

class Routes extends Component {
    // routes to "/", "/new", "/:postId"
    // either renders PostList, NewPostForm, or PostDetail
    render() {
        return (
            <div className="Routes">
                <Switch>
                    <Route exact path="/" 
                           render={() => 
                                <PostList posts={ this.props.posts }/>} />
                    
                    <Route exact path="/new" 
                           render={(rtProps) => 
                                <NewPostForm { ...rtProps } 
                                             handleAdd={ this.props.handleAdd }/>} />

                    <Route exact path="/:postId" 
                           render={(rtProps) => 
                                <PostDetail { ...rtProps }
                                            post={ this.props.posts.filter(p => p.id === rtProps.match.params.postId)[0] }/>} />

                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;