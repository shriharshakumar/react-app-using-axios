import React,{ Component } from 'react';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import axios from '../../../axios';
//import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Harsha'
                    }
                })
                this.setState({ posts: updatedPosts })
                //console.log(response);
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    selectedPostHandler = (id) => {
        //this.setState({ selectedPostId: id });
        this.props.history.push('/posts/' + id);
    }
    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something's wrong !</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.selectedPostHandler(post.id)} />
                
            })
        }
        return (
            <div>
                <section className = "Posts">
                    { posts }
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
            // <section>
            //     <FullPost id={this.state.selectedPostId} />
            // </section>
            // <section>
            //     <NewPost />
            // </section>
        );
    }
}

export default Posts;