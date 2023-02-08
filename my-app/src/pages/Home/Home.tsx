import { BookList } from '../../components/BooksList/BooksList';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import classes from './Home.module.css';

export const Home = () => {
	return (
		<div>
			<header className={classes.header}>
				<h1>find the book you need</h1>
				<SearchForm />
			</header>
			<BookList />
		</div>
	);
};
