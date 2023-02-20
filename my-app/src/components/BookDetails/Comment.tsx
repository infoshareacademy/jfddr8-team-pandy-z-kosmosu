import { AppContext } from '../../providers/AppProvider';
import { useContext } from 'react';
import { MyComment } from './BookDetails';
import classes from './Comment.module.css';

export type MyCommentProps = {
	item: MyComment;
	removeComment: (commId: number) => void;
};

export const Comment = ({
	item,
	removeComment,
}: MyCommentProps): JSX.Element => {
	const { username } = useContext(AppContext);

	return (
		<div className={classes['single-comment']}>
			<p>
				Created at:
				{new Intl.DateTimeFormat('pl-PL').format(new Date(Date.now()))}
			</p>
			<p>You are commenting as: {item.user}</p>
			<p>Comment:{item.message}</p>
			{username === item.user && (
				<button onClick={() => removeComment(item.id)}>Remove</button>
			)}
		</div>
	);
};
