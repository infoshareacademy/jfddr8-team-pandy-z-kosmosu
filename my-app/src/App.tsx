import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Home } from "./components/Home/Home";
import { MyBooksList } from "./components/MyBooks/MyBooksList";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "./index";
import { BookDetails } from "./components/BookDetails/BookDetails";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooksList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
