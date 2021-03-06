import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';

import './NewPost.css';

import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Harsha',
        isSubmitted: false
    }
 
    updatehandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }

        axios.post('/posts/',data)
            .then(response => {
                console.log(response);
                this.props.history.replace('/posts');
                //this.setState({isSubmitted: true});
            })
    }

    render () {
        /*let redirect = null;
        if(this.state.isSubmitted){
            redirect = <Redirect to="/posts" />
        }*/
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Harsha">Harsha</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.updatehandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;