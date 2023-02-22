import { AppContext } from "../../providers/AppProvider";
import { useContext } from "react";
import { MyComment } from "./BookDetails";
import classes from "./Comment.module.css";

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
    <div className={classes["single-comment"]}>
      <div className={classes.whoCommentStyle}>
        Created at:
        {new Intl.DateTimeFormat("pl-PL").format(new Date(Date.now()))}
      </div>
      <div>You are commenting as: {item.user}</div>
      <div>Comment:{item.message}</div>
      {username === item.user && (
        <button onClick={() => removeComment(item.id)}>Remove</button>
      )}
    </div>
  );
};
