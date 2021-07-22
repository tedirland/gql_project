import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const CompleteRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');

  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error('You must enter a valid email and password.');
      setLoading(false);
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user.updatePassword(password);

        //dispatch user with token and email

        //redirect to anothe page
      }
      console.log(result);
      toast.success('User successfully registered!');
    } catch (error) {
      console.log('registration failed', error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="container p-5">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Register</h4>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
              disabled={loading}
            />
          </div>
          <button
            className="btn btn-raised btn-primary"
            disabled={!email || loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistration;
