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
			<Link to={`/book/${item.id}`} {...item}>
						<span>Title: </span>
						<span>{item.title}</span>
					</Link>
			<button onClick={() => removeFromFav(item.id)}>Delete ❌</button>
		</div>
	);
};