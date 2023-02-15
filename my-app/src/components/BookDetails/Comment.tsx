import {MyComment} from './BookDetails';

type MyCommentProps = {
	item: MyComment;
};

export const Comment = ({ item }: MyCommentProps): JSX.Element => {
	// const { removeFromFav } = useContext(AppContext);

	return (
		<div>
			 {/* <p> 
             Created at:
              {new Intl.DateTimeFormat("pl-PL").format(new Date(Date.now()))}
             </p> */}
             {/* <p>User:{item.user}</p> */}
             <p>Comment:{item.message}</p>
             <p>ID:{item.id}</p>
		</div>
	);
};