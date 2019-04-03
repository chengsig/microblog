import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NewPostForm from './NewPostForm';

class Routes extends Component {

    render() {
        return (
            <div className="Routes">
                <Switch>
                    <Route exact path="/" 
                           render={() => 
                                <Homepage user={this.props.user} />} />
                    
                    <Route exact path="/companies/:handle" 
                           render={(rtProps) => 
                                <Company handle={rtProps.match.params.handle}
                                         user={this.props.user}
                                         handleApply={this.props.handleApply} />} />


                    <Route exact path="/companies" 
                           render={() => 
                                <NewPostForm />} />

                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Routes;