import AuthFormWrapper from "../../components/AuthFormWrapper";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <AuthFormWrapper includeLogo={true}>
      <LoginForm />
    </AuthFormWrapper>
  );
};

export default Login;
