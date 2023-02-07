import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { MyBooksList } from './components/MyBooks/MyBooksList';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/mybooks' element={<MyBooksList />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}

export default App;
