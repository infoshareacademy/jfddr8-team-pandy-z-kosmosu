import { AppContext, BookToFav } from '../../providers/AppProvider';
import { useContext } from 'react';
import classes from './MyBook.module.css';

type MyBookProps = {
	item: BookToFav;
};

export const MyBook = ({ item }: MyBookProps): JSX.Element => {
	const { removeFromFav } = useContext(AppContext);

	return (
		<div className={classes['single-book']}>
			<img className={classes['cover-img']} src={item.cover_img} alt='' />
			<p>{item.title}</p>
			<button onClick={() => removeFromFav(item.id)}>Delete X</button>
		</div>
	);
};
