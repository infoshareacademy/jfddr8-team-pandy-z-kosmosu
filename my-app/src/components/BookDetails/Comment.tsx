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
			<span>
				Created at:
				{new Intl.DateTimeFormat('pl-PL').format(new Date(Date.now()))}
			</span>
			<span>User:{item.user}</span>
			<p>Comment:{item.message}</p>
			{/* <span>ID:{item.id}</span> */}
			<button
				onClick={() => {
					removeComment(item.id);
				}}>
				Remove
			</button>
		</div>
	);
};
