import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { MyBooksList } from './components/MyBooks/MyBooksList';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import 'react-slideshow-image/dist/styles.css';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/mybooks' element={<MyBooksList />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
