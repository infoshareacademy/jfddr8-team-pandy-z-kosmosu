import { BookDetails } from '../BookDetails/BookDetails';
import { BookList } from '../BooksList/BooksList';
import { SearchForm } from '../SearchForm/SearchForm';
import { useContext } from 'react';
import Slider from '../Slider/Slider';
import classes from './Home.module.css';
import { AppContext } from '../../providers/AppProvider';
import { BookToFav } from '../../providers/AppProvider';
import { MyBookList } from '../MyBooks/MyBooksList';

export const Home = (): JSX.Element => {

	const {myBookList, setmyBookList} = useContext(AppContext)


	const addToFav = (product: BookToFav) => {
		setmyBookList([...myBookList, product])
		console.log('Dodałam')
	}


	return (
		<div>
			<header className={classes.header}>
				<Slider />
				<div className={classes.content}>
					<h1>find the book you need</h1>
					<SearchForm />
				</div>
			</header>
			<BookList addToFav={addToFav}/>
		</div>
	);
};
