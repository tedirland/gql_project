import { useState } from 'react';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [posts, setPosts] = useState([]);

  client
    .query({
      query: gql`
        {
          allPosts {
            id
            title
            description
          }
        }
      `,
    })
    .then(result => setPosts(result.data.allPosts));
  return (
    <div className="container">
      <div className="row p-5">
        {posts.map(post => (
          <div className="col-md-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>{post.title}</h4>
                </div>
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
