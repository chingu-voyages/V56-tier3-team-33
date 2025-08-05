import React from "react";
import Nav from "./Nav";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

const Landing = (props: Props) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <Nav onLoginClick={handleLoginClick} />
    </div>
  );
};

export default Landing;
