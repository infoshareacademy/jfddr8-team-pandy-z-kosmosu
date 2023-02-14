import {MyComment} from './BookDetails';

type MyCommentProps = {
	item: MyComment;
};

export const Comment = ({ item }: MyCommentProps): JSX.Element => {
	// const { removeFromFav } = useContext(AppContext);

	return (
		<div>
			 <p>
             {/* {new Intl.DateTimeFormat("pl-PL", {
                timeStyle: "medium",
                dateStyle: "medium",
              }).format(new Date(item.CreatedAt))} */}
              {item.CreatedAt}
             </p>
             <p>{item.user}</p>
             <p>{item.message}</p>
		</div>
	);
};