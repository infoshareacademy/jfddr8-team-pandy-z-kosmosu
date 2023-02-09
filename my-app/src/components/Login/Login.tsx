import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../../index";
// import {handleSubmit} from "./Register/Register";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent): Promise<void> => {
	e.preventDefault();
    try {
      await signInWithEmailAndPassword(firebaseAuth, username, password);
      navigate("/");
    } catch ({ message }) {
      console.log(message);
      setError(
        "Panda is not satisfied with your login or password. Please try again"
      );
      //clearing error message from screen after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };



  return (
    <>
      <h1>Please log in:</h1>
      <form>
        <label>Login:</label>
        <br />
        <input
          name="login"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          name="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={signIn}>Log in</button>
        <p>{error}</p>
      </form>
    </>
  );
};
