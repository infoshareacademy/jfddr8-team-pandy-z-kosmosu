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
			<p className={classes['comment-author-p']}>{item.user} wrote on: {new Intl.DateTimeFormat('pl-PL').format(new Date(Date.now()))}: </p>
			<p className={classes['comment-message']}>"{item.message}"</p>
			{username === item.user && (
				<button onClick={() => removeComment(item.id)}>Remove</button>
			)}
		</div>
	);
};
