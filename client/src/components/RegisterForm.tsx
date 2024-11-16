import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import useRegisterForm from "../hooks/formHooks/useRegisterForm";
import UserImgInput from "./UserImgInput";
import { useState } from "react";
import { blankUser } from "../data/images";

const RegisterForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    setFormData,
    error,
    loading,
  } = useRegisterForm();
  const { email, confirm_password, fname, lname, password } = formData;
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);

  const passwordInputType = showPassword ? "text" : "password";

  const errorMessage =
    error?.globalMessage || error?.passwordValidation || error?.message;

  return (
    <div className="auth-form">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control-group">
          <UserImgInput
            value={formData.avatar || blankUser}
            onLoading={() => setUploadingAvatar(true)}
            onComplete={(url) =>
              setFormData((prev) => ({ ...prev, avatar: url }))
            }
            onEnd={() => setUploadingAvatar(false)}
            className="mx-auto max-w-52"
          />
          <div className="form-control">
            <label htmlFor="fname">Enter your first name</label>
            <input
              id="fname"
              type="text"
              onChange={handleChange}
              name="fname"
              value={fname}
            />
          </div>
          <div className="form-control">
            <label htmlFor="lname">Enter your last name</label>
            <input
              id="lname"
              type="text"
              name="lname"
              onChange={handleChange}
              value={lname}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="form-control">
            <label htmlFor="birthdate">Enter your birthdate</label>
            <input
              type="date"
              onChange={({ target: { value } }) =>
                setFormData((prev) => ({
                  ...prev,
                  birthdate: new Date(value).toISOString(),
                }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Enter the password</label>
            <input
              id="password"
              type={passwordInputType}
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirm_password">Confirm the password</label>
            <input
              id="confirm_password"
              type={passwordInputType}
              name="confirm_password"
              onChange={handleChange}
              value={confirm_password}
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
          <button type="submit" disabled={loading || uploadingAvatar}>
            Submit
          </button>
        </div>
      </form>
      <div className="redirect-link">
        Already have an account? <Link to={"/login"}>Click here to login.</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
