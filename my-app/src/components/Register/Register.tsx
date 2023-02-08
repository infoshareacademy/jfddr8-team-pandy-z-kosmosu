import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../index";

export const Register = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(firebaseAuth, username, password);
      navigate("/");
    } catch ({ code, message }) {
      if (code === "auth/email-already-in-use") {
        console.log(message);
        setError("There is already Panda with that login. Please try again ");
      }
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <h1>Please register:</h1>
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
        <button onClick={handleSubmit}>Register</button>
        <p>{error}</p>
      </form>
    </>
  );
};
