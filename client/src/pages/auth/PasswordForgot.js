import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRMATION_PASSWORD_RESET_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success(
          `Pasword reset email successfully sent to ${email}! Click on the link to reset your password.`
        );
      })
      .catch(error => {
        setLoading(false);
        console.log('could not send password reset email', error);
      });
  };

  return (
    <div className="conrainer p-5">
      {loading ? (
        <h4 className="text-danger">Loading ...</h4>
      ) : (
        <h4>Reset Password</h4>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default PasswordReset;
