import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';
import { useMutation, gql } from '@apollo/client';
import AuthForm from '../../components/forms/AuthForm';

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('irlandth@gmail.com');
  const [password, setPassword] = useState('Test12345');
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const [userCreate] = useMutation(USER_CREATE);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async result => {
          const { user } = result;
          const idTokenResult = await user.getIdTokenResult();

          dispatch({
            type: 'LOGGED_IN_USER',
            payload: { email: user.email, token: idTokenResult.token },
          });

          //send user info to our server mongodb to either update/create
          userCreate();
          history.push('/profile');
        });
    } catch (error) {
      console.log('Login failed', error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async result => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: { email: user.email, token: idTokenResult.token },
      });
      userCreate();
      history.push('/profile');
    });
  };

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
      <button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">
        Login With Google
      </button>
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
      />
      <Link className="text-danger float-right" to="password/forgot">
        Forgot Password?
      </Link>
    </div>
  );
};

export default Login;
