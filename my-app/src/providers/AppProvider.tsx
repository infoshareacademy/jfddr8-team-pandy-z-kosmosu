import React, { createContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDb } from '../index';

const URL = 'http://openlibrary.org/search.json?title=';

export type BookToFav = {
	id: number;
	title: string;
};

export type Book = {
	id: string;
	author: string;
	cover_id: number;
	first_publish_year: number;
	title: string;
};

type AppContextState = {
	searchTerm: string | null;
	setSearchTerm: (searchTerm: string) => void;
	books: Book[];
	setBooks: (param: []) => void;
	loading: boolean;
	setLoading: (param: boolean) => void;
	resultTitle: string | null;
	setResultTitle: (param: string) => void;
	username: string | null;
	setUsername: (username: string | null) => void;
	listSum: number;
	setlistSum: (value: number) => void;
	myBookList: BookToFav[];
	setmyBookList: (books: BookToFav[]) => void;
	isLogged: boolean;
	setIsLogged: (param: boolean) => void;
	addToFav: (product: BookToFav) => void;
};

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [searchTerm, setSearchTerm] = useState('Harry Potter');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [resultTitle, setResultTitle] = useState('');

	const [username, setUsername] = useState<string | null>('');
	const [listSum, setlistSum] = useState<number>(0);
	const [myBookList, setmyBookList] = useState([] as BookToFav[]);

	const [isLogged, setIsLogged] = useState(false);

	const addToFav = async (product: BookToFav): Promise<void> => {
		try {
			await setDoc(doc(firebaseDb, 'MyList', `${username}`), {
				products: [...myBookList, product],
			});
			setmyBookList([...myBookList, product]);
			console.log('Dodałam');
		} catch (error) {
			console.log(error);
		}
	};
	console.log(myBookList);

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${URL}${searchTerm}`);
			const data = await response.json();
			const { docs } = data;

			if (docs) {
				const newBooks = docs
					.slice(0, 20)
					.map(
						(bookSingle: {
							key: string;
							author_name: string;
							cover_i: number;
							first_publish_year: number;
							title: string;
						}) => {
							const { key, author_name, cover_i, first_publish_year, title } =
								bookSingle;

							return {
								id: key,
								author: author_name,
								cover_id: cover_i,
								first_publish_year: first_publish_year,
								title: title,
							};
						}
					);

				setBooks(newBooks);
				console.log(newBooks);

				if (newBooks.length > 1) {
					setResultTitle('Your Search Result:');
				} else {
					setResultTitle('No Search Result Found!');
				}
			} else {
				setBooks([]);
				setResultTitle('No Search Result Found!');
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchBooks();
	}, [searchTerm, fetchBooks]);

	return (
		<AppContext.Provider
			value={{
				username,
				setUsername,
				listSum,
				setlistSum,
				myBookList,
				setmyBookList,
				searchTerm,
				setSearchTerm,
				books,
				setBooks,
				loading,
				setLoading,
				resultTitle,
				setResultTitle,
				setIsLogged,
				isLogged,
				addToFav,
			}}>
			{children}
		</AppContext.Provider>
	);
};
