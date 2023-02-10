import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../index";
import classes from './Register.module.css';

export const Register = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false)
  const [isUsernameError, setIsUsernameError] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (username === '') {
      setError("Please enter your email");
      setIsUsernameError(true);
      return
    }
    if (password !== repeatPassword) {
      setError("Password is not repeated correctly.");
      setIsPasswordError(true);
      return
    };
    if (password.length < 6) {
      setError("Your password is too short.")
      setIsPasswordError(true);
      return
    }
    try {
      await createUserWithEmailAndPassword(firebaseAuth, username, password);
      navigate("/");
    } catch ({ code, message, password, repeatPassword }) {
      if (code === "auth/email-already-in-use") {
        console.log(message);
        setIsUsernameError(true);
        setError("There is already Panda with that login. Please try again.");
      }
      if (code === "auth/invalid-email") {
        console.log(message);
        setIsUsernameError(true);
        setError("Your email is invalid. Please type a correct email address.");
      }
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <>
      <h1>Please register:</h1>
      <form>
        <label>Login:</label>
        <br />
        <input
          className={isUsernameError ? classes.wrongInput : ''}
          name="login"
          type="email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setIsUsernameError(false)
          }}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          className={isPasswordError ? classes.wrongInput : ''}
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsPasswordError(false);
          }}
        />
        <br />
        <label>Repeat password:</label>
        <br />
        <input
          className={isPasswordError ? classes.wrongInput : ''}
          name="Repeat password"
          type="password"
          value={repeatPassword}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            setIsPasswordError(false)
          }}
        />
        <br />
        <br />
        <button onClick={handleSubmit}>Register</button>
        <p>{error}</p>
      </form>
    </>
  );
};
