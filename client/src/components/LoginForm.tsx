import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import useLoginForm from "../hooks/formHooks/useLoginForm";

const LoginForm = () => {
  const {
    error,
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useLoginForm();

  const passwordInputType = showPassword ? "text" : "password";

  const errorMessage = error?.globalMessage || error?.message;

  return (
    <div className="auth-form">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control-group">
          <div className="form-control">
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Enter the password</label>
            <input
              id="password"
              name="password"
              type={passwordInputType}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
        </div>
        {errorMessage ? (
          <div className="error">
            <Info />
            <span>{errorMessage}</span>
          </div>
        ) : null}
        <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="showPassword">Show password</label>
        </div>
        <div className="mt-10">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="redirect-link">
        Don't have an account? <Link to={"/register"}>Register here.</Link>
      </div>
    </div>
  );
};

export default LoginForm;
