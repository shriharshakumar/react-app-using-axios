import React,{ Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

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
        this.setState({ selectedPostId: id });
    }
    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something's wrong !</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Link to={ '/posts/' + post.id }>
                    <Post
                        //key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.selectedPostHandler(post.id)} />
                </Link>;
            })
        }
        return (
            <section className = "Posts">
                { posts }
            </section>
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