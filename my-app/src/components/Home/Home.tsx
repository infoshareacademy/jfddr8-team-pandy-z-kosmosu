import { BookDetails } from '../BookDetails/BookDetails';
import { BookList } from '../BooksList/BooksList';
import { Logout } from '../Logout/Logout';
import { SearchForm } from '../SearchForm/SearchForm';
import Slider from '../Slider/Slider';
import classes from './Home.module.css';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../providers/AppProvider';
import { Route } from 'react-router-dom';

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
