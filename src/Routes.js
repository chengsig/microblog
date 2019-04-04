import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewPostForm from './NewPostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';

class Routes extends Component {
    // routes to "/", "/new", "/:postId"
    // either renders PostList, NewPostForm, or PostDetail

    // might want to refactor
    render() {
        return (
            <div className="Routes">
                <Switch>
                    <Route exact path="/" 
                           render={() => 
                                <PostList />} />
                    
                    <Route exact path="/new" 
                           render={(rtProps) => 
                                <NewPostForm { ...rtProps } 
                                             handlePostAdd={ this.props.handlePostAdd }
                                             handlePostEdit={ this.props.handlePostEdit } />} />
                    
                    <Route exact path="/:postId" 
                           render={(rtProps) => 
                                <PostDetail { ...rtProps }
                                            handlePostEdit={ this.props.handlePostEdit }
                                            handlePostDelete={ this.props.handlePostDelete }
                                            handleCommentAdd={ this.props.handleCommentAdd }
                                            handleCommentDelete={ this.props.handleCommentDelete }
                                            post={ this.props.posts[rtProps.match.params.postId] }
                                            postId = { rtProps.match.params.postId }/>} />

                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;