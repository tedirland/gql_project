import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router';

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  //access context
  const { state, dispatch } = useContext(AuthContext);

  //react router
  let history = useHistory();

  console.log(history);

  const updateName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'Ted Irland',
    });
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map(post => (
            <div className="col-md-4" key={post.id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{post.title}</h4>
                  </div>
                  <p className="card-text">{post.description}</p>
                  <hr />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn-btn-raised btn-primary"
        >
          Fetch Posts
        </button>
        <hr />
        {JSON.stringify(state.user)}
      </div>
    </div>
  );
};

export default Home;
