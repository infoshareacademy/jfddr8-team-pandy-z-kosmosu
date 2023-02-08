import { BookList } from '../BooksList/BooksList';
import { SearchForm } from '../SearchForm/SearchForm';
import classes from './Home.module.css';

export const Home = () => {
	return (
		<div>
			<div className={classes}>You are in Home now</div>
			<SearchForm />
			<BookList />
		</div>
	);
};
