import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewPostForm from './NewOrEditPostForm';
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
                                <PostList />} />
                    
                    <Route exact path="/new" 
                           render={(rtProps) => 
                                <NewPostForm { ...rtProps } />} />
                    
                    <Route exact path="/:postId" 
                           render={(rtProps) => 
                                <PostDetail { ...rtProps }
                                            postId = { rtProps.match.params.postId }/>} /> 

                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;