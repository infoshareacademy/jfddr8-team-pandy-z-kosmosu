import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "./BookDetails.module.css";
import { Loader } from "../Loader/Loader";
import coverImg from "../../Graphics/cover_not_found.jpg";
import pandaFull from "../../Graphics/panda-full-mark.jpg";
import pandaHalf from "../../Graphics/panda-half-mark.jpg";
import { AppContext } from "../../providers/AppProvider";
import { Link } from "react-router-dom";
import styles from "./BookDetails.module.css";
import userIcon from "../../Graphics/User-icon.png";

const URL = "https://openlibrary.org/works/";

export const BookDetails = () => {
  const { isLogged } = useContext(AppContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>("");

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
            description: description ? description : "No description found",
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

  if (loading) return <Loader />;

  return (
    <section className={styles.page}>
      <section className={styles.backplusdescription}>
        <button className={styles.backtobrowse}>Back to browse</button>

        <div className={styles.bookdetalis}>
          <div className={classes["card-book"]}>
            <div className={classes["cover-img"]}>
              <img
                className={styles.pic}
                src={book.cover_img}
                alt="cover img"
              />
            </div>
            <div className={classes.content}>
              <div>
                <span>
                  <b>Title:</b>{" "}
                </span>
                <span>{book.title}</span>
              </div>
              <div>
                <span>
                  <b>Author:</b>{" "}
                </span>
                <span>{book.author}</span>
              </div>
              <div>
                <span>
                  <b>First Publish Year:</b>{" "}
                </span>
                <span>{book.first_publish_year}</span>
              </div>
              <div>
                <span>
                  <b>Description:</b>{" "}
                </span>
                <span>{book.description}</span>
              </div>
              <div>
                <span>
                  <b>Subject Places:</b>{" "}
                </span>
                <span>{book.subject_places}</span>
              </div>
              <div>
                <span>
                  <b>Subject Times: </b>
                </span>
                <span>{book.subject_times}</span>
              </div>
              {isLogged && (
                <div className={styles.buttons}>
                  <button className={styles.addtofavorites}>
                    <b>Add to favorites</b>
                  </button>
                  <button className={styles.gotocomments}>
                    Go to comments...
                  </button>
                  <div className={classes["box-panda"]}>
                    <img className={classes["panda-img"]} src={pandaFull} />
                    <img className={classes["panda-img"]} src={pandaFull} />
                    <img className={classes["panda-img"]} src={pandaFull} />
                    <img className={classes["panda-img"]} src={pandaFull} />
                    <img className={classes["panda-img"]} src={pandaHalf} />
                  </div>
                </div>
              )}
              {!isLogged && (
                <div>
                  <div>
                    <Link className={classes.links} to="/login">
                      Log in
                    </Link>
                    <span>to add to favorites :)</span>
                  </div>
                  <div>
                    <span>See comments or </span>
                    <Link className={classes.links} to="/login">
                      Log in
                    </Link>
                    <span>to add one!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <p>
        <h2>Intrested in ....? See our recommendations</h2>
      </p>

      <section className={styles.recommendations}>
        <div className={styles.booksproposition}>
          <img
            className={styles.imgbook}
            src="https://covers.openlibrary.org/b/id/10523466-L.jpg"
            alt="cover"
          ></img>
          <p>
            {" "}
            <b>Title:</b> Harry Potter and the Order of the Phoenix
          </p>
          <p>
            <b>Author:</b> J. K. Rowling
          </p>
          <p>
            <b>First Publish Year:</b> 2000{" "}
          </p>
        </div>

        <div className={styles.booksproposition}>
          <img
            className={styles.imgbook}
            src="https://covers.openlibrary.org/b/id/10523466-L.jpg"
            alt="cover"
          ></img>
          <p>
            {" "}
            <b>Title:</b> Harry Potter and the Order of the Phoenix
          </p>
          <p>
            <b>Author:</b> J. K. Rowling
          </p>
          <p>
            <b>First Publish Year:</b> 2000{" "}
          </p>
        </div>

        <div className={styles.booksproposition}>
          <img
            className={styles.imgbook}
            src="https://covers.openlibrary.org/b/id/10523466-L.jpg"
            alt="cover"
          ></img>
          <p>
            {" "}
            <b>Title:</b> Harry Potter and the Order of the Phoenix
          </p>
          <p>
            <b>Author:</b> J. K. Rowling
          </p>
          <p>
            <b>First Publish Year:</b> 2000{" "}
          </p>
        </div>
      </section>

      <section className={styles.commentsarea}>
        <div className={styles.comments}>
          <p>
            <h4>Comments:</h4>
          </p>

          <div className={styles.typecomment}>
            <img className={styles.pandacomment} src={userIcon}></img>type
            comment here <button> add</button>
          </div>
          <div className={styles.comment}>
            <p>Panda wrote on 02.07.2022:</p>
            <p> "I like book, better than bamboo c:"</p>
          </div>
          <div className={styles.comment}>
            <p> DJ Pandex wrote on 02.07.2022:</p>
            <p> "I don't like book, is very sad :(" </p>
          </div>
          <p> See more...</p>
        </div>
      </section>
    </section>
  );
};
