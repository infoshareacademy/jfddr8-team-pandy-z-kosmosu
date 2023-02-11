import { BookToFav } from '../../providers/AppProvider';

type MyBookProps = {
	item: BookToFav;
	removeFromFav: (bookId: number) => void;
};

export const MyBook = ({ item, removeFromFav }: MyBookProps): JSX.Element => {
	console.log(item);

	return (
		<div>
			<h2>MyBook</h2>
			<h3>{item.title}</h3>
			<button onClick={() => removeFromFav(item.id)}>
				Remove from favorite
			</button>
		</div>
	);
};
