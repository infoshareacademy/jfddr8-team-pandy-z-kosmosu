import { Link } from "react-router-dom"
import classes from "./Logout.module.css";
import logoutPanda from "../../Graphics/logout-panda.png";

export const Logout = (): JSX.Element => {
  return (
    <div className={classes.logout}>
      <img src={logoutPanda} alt="" />
      <div>
        <h2>You've been logged out</h2>
        <div>
          <h4>Please remember about me or</h4>
          <button>
            <Link to="/login">
              Log in
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
