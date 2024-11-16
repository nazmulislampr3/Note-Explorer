import AuthFormWrapper from "../../components/AuthFormWrapper";
import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  return (
    <AuthFormWrapper includeLogo={true}>
      <RegisterForm />
    </AuthFormWrapper>
  );
};

export default Register;
