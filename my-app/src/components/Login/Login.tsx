import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../../index";

export const Login = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const signIn = async (): Promise<void> => {
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

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(firebaseAuth, username, password);
      navigate("/");
    } catch ({ code, message }) {
      if (code === "auth/email-already-in-use") {
        await signIn();
        return;
      }
      console.log(message);
      //setting error message to display under form
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
        <button onClick={handleSubmit}>Log in</button>
        <p>{error}</p>
      </form>
    </>
  );
};
