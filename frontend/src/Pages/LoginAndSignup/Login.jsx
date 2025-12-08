import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    navigate("/root");
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <button type="submit">loginbtn</button>
      </form>
    </>
  );
};

export default Login;
