import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import logoImg from "../../Graphics/Logo.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../index";

export const Navbar = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(firebaseAuth);
      navigate("/");
      console.log("Logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.navbar}>
      <img src={logoImg}></img>
      <div>
        <Link className={classes.links} to="/">
          Home
        </Link>
        <Link className={classes.links} to="login">
          Log in
        </Link>
        <Link className={classes.links} to="register">
          Sign in
        </Link>
        <Link className={classes.links} to="mybooks">
          MyBooks
        </Link>
        <Link className={classes.links} to="/" onClick={handleLogout}>
          Sign out
        </Link>
      </div>
    </div>
  );
};
