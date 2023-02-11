import { SearchForm } from '../SearchForm/SearchForm';
import styles from './MyBooksList.module.css';
import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { BookToFav } from '../../providers/AppProvider';
import { MyBook } from './MyBook';

type MyBooksProps = {
	myBooksList: BookToFav[];
};

export const MyBookList = ({ myBooksList }: MyBooksProps): JSX.Element => {
	const { resultMyBooks } = useContext(AppContext);

	return (
		<>
			<div className={styles.pic}>
				<h1>MY BOOKS</h1>
			</div>
			<div className={styles.searching}>
				<SearchForm />
			</div>
			<div className={styles.title}>
				<h3>{resultMyBooks}</h3>
			</div>
			<div className={styles['fav-container']}>
				{myBooksList.map((item) => (
					<MyBook key={item.id} item={item} />
				))}
			</div>
		</>
	);
};
