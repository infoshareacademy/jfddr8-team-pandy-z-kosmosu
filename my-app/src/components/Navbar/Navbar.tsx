import { Link } from "react-router-dom";
import {useContext} from 'react' ;
import classes from "./Navbar.module.css";
import logoImg from "../../Graphics/Logo.png";
import logoUser from '../../Graphics/User-icon.png';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../index";
import { AppContext } from "../../providers/AppProvider";
// import {App} from "../"

export const Navbar = (): JSX.Element => {
  const {isLogged, setIsLogged} = useContext(AppContext)
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(firebaseAuth);
      navigate("/");
      console.log("Logged out");
    } catch (error) {
      console.log(error);
    }
    setIsLogged(false);
  };

  return (
    <div className={classes.navbar}>
      <img src={logoImg}></img>
      <div>
        <Link className={classes.links} to="/">
          Home
        </Link>
        {!isLogged && <Link className={classes.links} to="login">
          Log in
        </Link>}
       {!isLogged && <Link className={classes.links} to="register">
          Sign in
        </Link>}
       {isLogged && <Link className={classes.links} to="mybooks">
          MyBooks
        </Link>}
       {isLogged && <Link className={classes.links} to="/" onClick={handleLogout}>
          Log out
        </Link>}
        {isLogged && <img src={logoUser} className={classes['logo-user']}></img>}
        {isLogged && <span>Hello, User!</span>}
      </div>
    </div>
  );
};
