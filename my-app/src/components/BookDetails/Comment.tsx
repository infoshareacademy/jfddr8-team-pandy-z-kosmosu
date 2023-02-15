import { MyComment } from './BookDetails';
type MyCommentProps = {
	item: MyComment;
	removeComment: (commId: number) => void;
};
export const Comment = ({
	item,
	removeComment,
}: MyCommentProps): JSX.Element => {
	return (
		<div>
			<div>
				Created at:
				{new Intl.DateTimeFormat('pl-PL').format(new Date(Date.now()))}
			</div>
			<div>You are commenting as:{item.user}</div>
			<p>Comment:{item.message}</p>
			<button
				onClick={() => {
					removeComment(item.id);
				}}>
				Remove
			</button>
		</div>
	);
};