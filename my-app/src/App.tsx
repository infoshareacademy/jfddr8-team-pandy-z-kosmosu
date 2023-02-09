import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
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
import { AppContext} from './providers/AppProvider';


function App() {

  const { username, setUsername, setmyBookList, setIsLogged, books} = useContext(AppContext);
  const navigate = useNavigate();
  

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail);
        setIsLogged(true);
        console.log(userEmail);

        // try {
        //   const docRef = doc(firebaseDb, "MyList", `${userEmail}`);
        //   const listSumSnapshot = await getDoc(docRef);
        //   console.log(listSumSnapshot);
        //   if (listSumSnapshot.exists()) {
        //     const {favBooksIDs} = listSumSnapshot.data();
        //     if (books.length>0) {
        //     console.log(books.filter((book) => favBooksIDs.includes(book.id)));
        //     setmyBookList(books.filter((book) => favBooksIDs.includes(book.id)))}; 
        //   //  trzeba zrobic konkatenacje array i wyciaganc id


        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      } else {
        setUsername('');
        setmyBookList([]);
      }
    });
  }, [setmyBookList, setUsername, books]);



  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooksList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
