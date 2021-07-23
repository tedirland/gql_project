import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { AuthContext } from '../context/authContext';

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const { user } = state;

  const logout = () => {
    auth.signOut();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: null,
    });

    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {!user && (
            <>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <li className="nav-item">
              <a onClick={logout} className="nav-link nav-item" href="/login">
                Logout
              </a>
            </li>
          )}
        </ul>
        <div className="ml-auto"></div>
      </div>
    </nav>
  );
};

export default Nav;
