import React, { createContext, useEffect, useState } from 'react';
import { useCallback } from 'react';

const URL = 'http://openlibrary.org/search.json?title=';

export type Book = {
	id: string;
	author: string;
	cover_id: number;
	first_publish_year: number;
	title: string;
};

// type MyBookListContextState = {
// 	username: string | null;
// 	setUsername: (username: string | null) => void;
// 	listSum: number;
// 	setlistSum: (value: number) => void;
// 	myBookList: Book[];
// 	setmyBookList: (books: Book[]) => void;
//   };
    
//   export const MyBookListContext = createContext<MyBookListContextState>({} as MyBookListContextState);

type AppContextState = {
	searchTerm: string | null;
	setSearchTerm: (searchTerm: string) => void;
	books: Book[];
	setBooks: (param: []) => void;
	loading: boolean;
	setLoading: (param: boolean) => void;
	resultTitle: string | null;
	setResultTitle: (param: string) => void;
<<<<<<< HEAD
	username: string | null;
	setUsername: (username: string | null) => void;
	listSum: number;
	setlistSum: (value: number) => void;
	myBookList: Book[];
	setmyBookList: (books: Book[]) => void;
=======
	isLogged: boolean;
	setIsLogged: (param: boolean) => void;
>>>>>>> c919de045fe806f6bd7bef02817659bcc5860b81
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
<<<<<<< HEAD
	const [username, setUsername] = useState<string | null>('');
  const [listSum, setlistSum] = useState<number>(0);
  const [myBookList, setmyBookList] = useState([] as Book[]);

=======
	const [isLogged, setIsLogged] = useState(false);
>>>>>>> c919de045fe806f6bd7bef02817659bcc5860b81

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${URL}${searchTerm}`);
			const data = await response.json();
			const { docs } = data;
			console.log(docs);

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
			}}>
			{children}
		</AppContext.Provider>
	);
};
