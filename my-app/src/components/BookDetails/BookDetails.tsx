import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "./BookDetails.module.css";
import { Loader } from "../Loader/Loader";
import coverImg from "../../Graphics/cover_not_found.jpg";
import pandaFull from "../../Graphics/panda-full-mark.jpg";
import pandaHalf from "../../Graphics/panda-half-mark.jpg";
import { AppContext } from "../../providers/AppProvider";
import { Link } from "react-router-dom";
import { firebaseDb } from "../../App";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { Comment } from "./Comment";
import icon from "../../Graphics/User-icon.png";
import { Rating } from "react-simple-star-rating";
import { EmptyIcon, FillIcon } from "../Rating/FillIcon";

const URL = "https://openlibrary.org/works/";

export type MyComment = {
  id: number;
  CreatedAt: number;
  message: string;
  user: string | null;
};

export const BookDetails = (): JSX.Element => {
	const { isLogged, addToFav, myBookList, username } = useContext(AppContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [book, setBook] = useState<any>('');
	const [myMessagesList, setmyMessagesList] = useState([] as MyComment[]);
	const [commentValue, setCommentValue] = useState('');
	const [ratesList, setRatesList] = useState<number[]>([]);
	const [ratesListAverage, setRatesListAverage] = useState(0)
  const [rating, setRating] = useState(0);


  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);


  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description:
              description?.value || description
                ? description.value || description
                : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
            id: id,
          };
          setBook(newBook);
        } else {
          setBook("");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

	const addToRate = async (index: number): Promise<void> => {
		try {
			await setDoc(doc(firebaseDb, 'Rating', `${book.id}`), {
				values: [...ratesList, index],
			});
			setRatesList([...ratesList, index]);
			
			console.log(ratesList)
			console.log(ratesListAverage)
		} catch (error) {
			console.log(error);
		}
	};
	
	const addToComment = async (product: MyComment): Promise<void> => {
		try {
			await setDoc(doc(firebaseDb, 'conversations', `${book.id}`), {
				messages: [...myMessagesList, product],
			});
			setmyMessagesList([...myMessagesList, product]);
			setCommentValue('');
		} catch (error) {
			console.log(error);
		}
	};

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const removeComment = async (commId: number): Promise<void> => {
    const newArr = myMessagesList.filter((obj) => obj.id !== commId);
     try {
      await setDoc(doc(firebaseDb, "conversations", `${book.id}`), {
        messages: newArr,
      });
      setmyMessagesList(newArr);
    } catch (error) {
      console.log(error);
    }
  };

	useEffect(() => {
		const docRef = doc(firebaseDb, 'Rating', `${book.id}`);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const data = doc.data();
				setRatesList(data.values);
				// console.log(data.values)
				const sumOfRates = ratesList.reduce((a, b) => (a + b))
				setRatesListAverage(sumOfRates / ratesList.length)

				// console.log(ratesList.length)
				console.log(ratesListAverage)
			}
		});
		return () => unsubscribe();
	}, [book.id, ratesList.length]);

	useEffect(() => {
		const docRef = doc(firebaseDb, 'conversations', `${book.id}`);
		const unsubscribe = onSnapshot(docRef, (doc) => {
			if (doc.exists()) {
				const data = doc.data();
				setmyMessagesList(data.messages);
			}
		});
		return () => unsubscribe();
	}, [book.id]);

  useEffect(() => {
    const docRef = doc(firebaseDb, "conversations", `${book.id}`);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setmyMessagesList(data.messages);
      }
    });
    return () => unsubscribe();
  }, [book.id]);

  if (loading) return <Loader />;
  return (
    <section className={classes["all-page"]}>
      {/* <button className={classes.backBtn2} onClick={() => navigate("/")}>
        Back to Home
        <br />
        <span className={classes.arrow}>⟻</span>
      </button> */}
      <div className={classes["card-book"]}>
        <div className={classes["cover-img"]}>
          <img src={book.cover_img} alt="cover img" />
        </div>
        <div className={classes["content"]}>
          <div className={classes.infobook}>
            <span>
              <b>Title:</b>{" "}
            </span>
            <span>{book.title}</span>
          </div>
          <div>
            <span>
              <b>Description:</b>{" "}
            </span>
            <span>{book.description || book.description}</span>
          </div>
          <div>
            <span>
              <b>Subject Places:</b>{" "}
            </span>
            <span>{book.subject_places}</span>
          </div>
          <div>
            <span>
              <b>Subject Times:</b>{" "}
            </span>
            <span>{book.subject_times}</span>
          </div>

          {isLogged && (
            <div>
              <button
                className={classes["btn-add-to-fav"]}
                disabled={myBookList.some(
                  (singleBook) => singleBook.id === book.id
                )}
                onClick={() =>
                  addToFav({
                    title: book.title,
                    cover_img: book.cover_img,
                    id: book.id,
                  })
                }
              ></button>
              {/* <div className={classes["box-panda"]}>
                <img className={classes["panda-img"]} src={pandaFull} alt="" onClick={() => {
										addToRate(1);
									}}/>
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaHalf} alt="" />
                <span>{ratesListAverage}</span>
              </div> */}
              <div className={classes.ratingContainer}>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
				  fillIcon={FillIcon}
				  initialValue={rating} //here you pass the average
				  transition={true}
				  emptyIcon={EmptyIcon}
                  /* Available Props */
                />
              </div>
            </div>
          )}

          {!isLogged && (
            <div>
              <div>
                <Link className={classes.links} to="/login">
                  Log in
                </Link>
                <span> to add to favorites :)</span>
              </div>
              <div>
                <span>See comments or </span>
                <Link className={classes.links} to="/login">
                  Log in
                </Link>
                <span> to add one!</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <section className={classes.commentsection}>
        <div>
          {isLogged && (
            <div className={classes["typecomment"]}>
              <img className={classes["pandacomment"]} src={icon} alt="" />
              <textarea
                className={classes["typecommentarea"]}
                onChange={handleInputChange}
                placeholder="Your comment..."
                value={commentValue}
              ></textarea>
              <div className={classes["pComment"]}>
                <button
                  className={classes["addcomment"]}
                  onClick={() => {
                    addToComment({
                      CreatedAt: Date.now(),
                      message: commentValue,
                      user: username,
                      id: Date.now(),
                    });
                  }}
                >
                  Add comment
                </button>
              </div>
            </div>
          )}
          <div className={classes["comment-box"]}>
            <div>
              {myMessagesList.map((item) => (
                <Comment
                  key={item.id}
                  item={item}
                  removeComment={removeComment}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
