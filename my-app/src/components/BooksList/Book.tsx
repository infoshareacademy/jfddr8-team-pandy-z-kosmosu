import { Link } from 'react-router-dom';
import classes from './Book.module.css';

export const Book = (book: any) => {
	return (
		<div className={classes.book}>
			<div>
				<img src={book.cover_img} alt='cover' />
			</div>
			<div>
				<div>
					<span>Title: </span>
					<span>{book.title}</span>
				</div>

				<div>
				<Link to = {`/${book.id}`} {...book}>
					<span>Author: </span>
					<span>{book.author}</span>
					</Link>
				</div>

				<div>
					<span>First Publish Year: </span>
					<span>{book.first_publish_year}</span>
				</div>
			</div>
		</div>
	);
};
