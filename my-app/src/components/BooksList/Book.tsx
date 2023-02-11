import { Link } from 'react-router-dom';
import classes from './Book.module.css';
import { useContext } from 'react';
import { AppContext } from '../../providers/AppProvider';

export const Book = (book: any) => {
	const { addToFav, isLogged } = useContext(AppContext);

	return (
		<div className={classes.book}>
			<div>
				<img className={classes.cover} src={book.cover_img} alt='cover' />
			</div>
			<div>
				<div>
					<Link to={`/book/${book.id}`} {...book}>
						<span>Title: </span>
						<span>{book.title}</span>
					</Link>
				</div>

				<div>
					<span>Author: </span>
					<span>{book.author}</span>
				</div>

				<div>
					<span>First Publish Year: </span>
					<span>{book.first_publish_year}</span>
				</div>
				{isLogged && (
					<button
						onClick={() =>
							addToFav({
								title: book.title,
								cover_img: book.cover_img,
								id: book.id,
							})
						}>
						Add to favorite
					</button>
				)}
			</div>
		</div>
	);
};
