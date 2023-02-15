import { Link, useNavigate } from "react-router-dom"
import classes from "./Logout.module.css";
import logoutPanda from "../../Graphics/logout-panda.png";
import { useEffect } from 'react';
import Timer from "../Timer/Timer";

export const Logout = (): JSX.Element => {
      const navigate = useNavigate();
      useEffect(() => {
        setTimeout(() => {
          navigate('/');
        }, 5000);
    })

  return (
    <>
    <div className={classes.logout}>
      <img src={logoutPanda} alt="" />
      <div>
        <h2>You've been logged out</h2>
        <div className={classes.remember}>
          <h4>Please remember about me or</h4>
          <button className={classes.login}>
            <Link to="/login">
              Log in
            </Link>
          </button>
        </div>
      </div>
    </div>
    <p>Redirecting in <Timer/> seconds</p>
    </>
  );
};
