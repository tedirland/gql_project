import React from 'react';

const AuthForm = ({
  email = '',
  password = '',
  loading,
  setEmail = f => f,
  handleSubmit,
  setPassword,
  showPasswordInput = false,
  hideEmailInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    {!hideEmailInput && (
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter email"
          disabled={loading}
        ></input>
      </div>
    )}
    {showPasswordInput && (
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter password"
          disabled={loading}
        ></input>
      </div>
    )}
    <button className="btn btn-raised btn-primary" disabled={loading}>
      Submit
    </button>
  </form>
);

export default AuthForm;
