import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';

import Header from './Header';

import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import ShowStream from './streams/ShowStream';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';

import history from '../History';

const App = () => {
    return (  
        <div className="ui container">
            <Router history={history}>
                <Header />
                <div>
                    <Route exact path="/">
                        <Redirect to="/streams" />
                    </Route>
                    <Route path="/streams" exact component = {StreamList} />
                    <Route path="/streams/edit/:id" exact component = {StreamEdit} />
                    <Route path="/streams/show/:id" exact component = {ShowStream} />
                    <Route path="/streams/delete/:id" exact component = {StreamDelete} />
                    <Route path="/streams/new" exact component = {StreamCreate} />
                </div>
            </Router>
        </div>
    );
}
 
export default App;