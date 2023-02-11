import { SearchForm } from '../SearchForm/SearchForm';
import styles from './MyBooksList.module.css';
import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { BookToFav } from '../../providers/AppProvider';
import { MyBook } from './MyBook';

type MyBooksProps = {
	myBooksList: BookToFav[];
	removeFromFav: (bookId: number) => void;
};

export const MyBookList = ({
	removeFromFav,
	myBooksList,
}: MyBooksProps): JSX.Element => {
	console.log(myBooksList);

	return (
		<>
			<h2>MyBookList</h2>
			{myBooksList.map((item) => (
				<MyBook key={item.id} item={item} removeFromFav={removeFromFav} />
			))}
		</>
	);
};
