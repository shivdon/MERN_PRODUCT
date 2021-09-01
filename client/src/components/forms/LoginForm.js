import React from "react";
import "./login-form.css";
import icon from "../../images/icon.png";
const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  buttonText,
}) => {
  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <img className="mb-4" src={icon} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      </form>
    </main>
  );
};

export default LoginForm;
