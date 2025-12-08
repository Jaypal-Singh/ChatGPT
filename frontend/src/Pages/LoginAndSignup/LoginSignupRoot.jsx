import { useNavigate } from "react-router-dom";

const LoginSignupRoot = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    navigate("/login");
  };
  const handleSignup = async (event) => {
    event.preventDefault();

    navigate("/signup");
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <button type="submit">loginbtn</button>
      </form>
      <form onSubmit={handleSignup}>
        <button type="submit">signupbt</button>
      </form>
    </>
  );
};

export default LoginSignupRoot;
