import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

function PasswordUpdate() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    auth.currentUser
      .updatePassword(password)

      .then(() => {
        setLoading(false);

        toast.success('Password successfully updated');
      })
      .catch(error => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Update Password</h4>
      )}
      <AuthForm
        password={password}
        setPassword={setPassword}
        setLoading={setLoading}
        handleSubmit={handleSubmit}
        showPasswordInput={true}
        hideEmailInput="true"
      />
    </div>
  );
}

export default PasswordUpdate;
