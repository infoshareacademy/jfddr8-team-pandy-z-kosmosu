import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import { firebaseAuth } from "../../index";
import classes from './Login.module.css';


export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [isInputError, setIsInputError] = useState<boolean>(false)

  const signIn = async (e: React.FormEvent): Promise<void> => {
	e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, username, password);
      navigate("/");
    } catch ({ message }) {
      console.log(message);
      setIsInputError(true);
      setError(
        "Panda is not satisfied with your login or password. Please try again"
      );
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };



  return (
    <>
      <h1>Please log in:</h1>
      <form>
        <label>Login:</label>
        <br />
        <input
          className={isInputError ? classes.wrongInput : classes.login}
          name="login"
          type="email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setIsInputError(false)
          }}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          className={isInputError ? classes.wrongInput : classes.login}
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsInputError(false)
          }}
        />
        <br />
        <button onClick={signIn}>Log in</button>
        <p>{error}</p>
      </form>
    </>
  );
};
