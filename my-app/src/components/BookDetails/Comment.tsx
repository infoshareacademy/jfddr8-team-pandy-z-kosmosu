import { AppContext } from '../../providers/AppProvider';
import { MyComment } from './BookDetails';
import { useContext } from 'react';

type MyCommentProps = {
	item: MyComment;
	removeComment: (commId: number) => void;
};
export const Comment = ({
	item,
	removeComment,
}: MyCommentProps): JSX.Element => {

	const { username } = useContext(AppContext)
	return (
		<div>
			<div>
				Created at:
				{new Intl.DateTimeFormat('pl-PL').format(new Date(Date.now()))}
			</div>
			<div>You are commenting as:{item.user}</div>
			<p>Comment:{item.message}</p>
			{username === item.user && (
                <button onClick={() => removeComment(item.id)}>Remove</button>
            )}

		</div>
	);
};