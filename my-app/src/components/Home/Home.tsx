import { BookList } from '../BooksList/BooksList';
import { SearchForm } from '../SearchForm/SearchForm';
import Slider from '../Slider/Slider';
import classes from './Home.module.css';

export const Home = (): JSX.Element => {
	return (
		<div>
			<header className={classes.header}>
				<Slider />
				<div className={classes.content}>
					<h1>find the book you need</h1>
					<SearchForm />
				</div>
			</header>
			<BookList />
		</div>
	);
};
