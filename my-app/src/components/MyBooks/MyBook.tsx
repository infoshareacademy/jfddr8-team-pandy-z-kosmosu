import { AppContext, BookToFav } from '../../providers/AppProvider';
import { useContext } from 'react';
import classes from './MyBook.module.css';
import { Link } from 'react-router-dom';

type MyBookProps = {
	item: BookToFav;
};

export const MyBook = ({ item }: MyBookProps): JSX.Element => {
	const { removeFromFav } = useContext(AppContext);

	return (
		<div className={classes['single-book']}>
			<img className={classes['cover-img']} src={item.cover_img} alt='' />
			<div className={classes.content}>
			<Link className={classes.link} to={`/book/${item.id}`} {...item}>
						<span className={classes.title}>Title: </span>
						<span>{item.title}</span>
					</Link>
			<button onClick={() => removeFromFav(item.id)}>Delete ❌</button>
			</div>
		</div>
	);
};