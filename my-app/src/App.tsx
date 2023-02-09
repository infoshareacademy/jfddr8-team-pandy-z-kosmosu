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
import { AppContext} from './providers/AppProvider';


function App() {

  const { username, setUsername, setmyBookList, books} = useContext(AppContext);
  const navigate = useNavigate();
  

  useEffect((): void => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userEmail = user.email;
        setUsername(userEmail);
        console.log(userEmail);

        try {
          const docRef = doc(firebaseDb, "MyList", `${userEmail}`);
          const listSumSnapshot = await getDoc(docRef);
          console.log(listSumSnapshot);
          if (listSumSnapshot.exists()) {
            const {favBooksIDs} = listSumSnapshot.data();
            // setmyBookList(data.filter((books) => books.id === id)); 
            // wyfiltrowac: wyszukac ksiazki konkretnie z favbooks ids
            // if () {
            //   ssetmyBookList('Your Search Result');
            // } else {
            //   ssetmyBookList('No Search Result Found!');
            // }


          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setUsername('');
        setmyBookList([]);
      }
    });
  }, [setmyBookList, setUsername]);


  // useEffect((): void => {
  //   if (username) {
  //     navigate('/mybooks');
  //   } 
  // }, [username, navigate]);


  return (
    <div>
      <Navbar />
      <Routes>
      {/* <Route path="/" element={
            username ? (
              <Navigate to='/mybooks' />
            ) : (
              <Navigate to='/login' />
            )} 
        />          */}
        <Route path="/" element={<Home />} />
        <Route path="/mybooks" element={<MyBooksList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
