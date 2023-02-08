import classes from './Book.module.css';

export const Book = (book: any) => {
	return (
		<div className={classes.book}>
			<div>
				<img src={book.cover_img} alt='cover' />
			</div>
			<div>
				<div>
					<span>{book.title}</span>
				</div>

				<div>
					<span>Author: </span>
					<span>{book.author}</span>
				</div>

				<div>
					<span>First Publish Year: </span>
					<span>{book.first_publish_year}</span>
				</div>
			</div>
		</div>
	);
};
