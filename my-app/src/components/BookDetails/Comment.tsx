import {MyComment} from './BookDetails';

type MyCommentProps = {
	item: MyComment;
	removeComment: (commID: number) => void;
};

export const Comment = ({ item, removeComment }: MyCommentProps): JSX.Element => {

	return (
		<div>
			 <span> 
             Created at:
              {new Intl.DateTimeFormat("pl-PL").format(new Date(Date.now()))}
             </span>
             <span>User:{item.user}</span>
             <span>Comment:{item.message}</span>
       <button onClick={() => {
		removeComment(item.id);
	   }}>Remove</button>
		</div>
	);
};