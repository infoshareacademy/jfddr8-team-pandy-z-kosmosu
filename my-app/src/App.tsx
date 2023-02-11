import { Routes, Route} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Home } from './components/Home/Home';
import { MyBookList } from './components/MyBooks/MyBooksList';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from './index';
import { BookDetails } from './components/BookDetails/BookDetails';
import { AppContext } from './providers/AppProvider';

function App() {
	const {
		setUsername,
		myBookList,
		setmyBookList,
		setIsLogged,
		books,
	} = useContext(AppContext);

	useEffect((): void => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) {
				const userEmail = user.email;
				setUsername(userEmail);
				setIsLogged(true);
				const docRef = doc(firebaseDb, 'MyList', `${user.email}`);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setmyBookList(data.books);
				}
			} else {
				setUsername('');
				// setmyBookList([]);
			}
		});
	}, [setmyBookList, setUsername, setIsLogged, books]);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/mybooks'
					element={<MyBookList myBooksList={myBookList} />}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/book/:id' element={<BookDetails />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
