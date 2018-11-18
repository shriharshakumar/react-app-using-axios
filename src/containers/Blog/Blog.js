import React, { Component } from 'react';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import aSyncComponent from '../../hoc/aSyncComponent';
//import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';

import './Blog.css';

const ASyncNewPost = aSyncComponent(()  => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {

    render () {  
        return (
            <div className="Blog">
                <headers>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts' exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: "#submit",
                                search: "?quick-submit=true"
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </headers>
            
                <Switch>
                    <Route path="/new-post" component={ASyncNewPost} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts" />
                    <Route render={() => <h1>Not found</h1> } />
                </Switch>
            </div>
        );
    }
}

export default Blog;