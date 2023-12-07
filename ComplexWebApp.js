/* 
Filename: ComplexWebApp.js
Content: A complex web application that utilizes multiple modules and libraries to create a sophisticated and interactive user experience.
*/

// Importing necessary libraries and modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Main application component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      comments: []
    };
  }

  componentDidMount() {
    // Fetching user data from external API
    axios.get('https://api.example.com/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetching posts data from external API
    axios.get('https://api.example.com/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    // Fetching comments data from external API
    axios.get('https://api.example.com/comments')
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/comments">Comments</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/users" render={() => <UsersPage users={this.state.users} />} />
            <Route path="/posts" render={() => <PostsPage posts={this.state.posts} />} />
            <Route path="/comments" render={() => <CommentsPage comments={this.state.comments} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// Home page component
const HomePage = () => (
  <div>
    <h1>Welcome to our Complex Web App!</h1>
    <p>Feel free to navigate through various pages using the above links.</p>
  </div>
);

// Users page component
const UsersPage = ({ users }) => (
  <div>
    <h2>Users</h2>
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

// Posts page component
const PostsPage = ({ posts }) => (
  <div>
    <h2>Posts</h2>
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  </div>
);

// Comments page component
const CommentsPage = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  </div>
);

// Render the main app component to the DOM
ReactDOM.render(<App />, document.getElementById('root'));