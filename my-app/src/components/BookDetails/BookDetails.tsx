import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { isLogged, addToFav, myBookList } = useContext(AppContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>("");
  const navigate = useNavigate();

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
    <section className={classes.page}>
      <section className={classes.backplusdescription}>
        <button className={classes.backBtn2} onClick={() => navigate("/")}>
          Back to Home
          <br />
          <span className={classes.arrow}>⟻</span>
        </button>

        <div className={classes.bookdetalis}>
          <div className={classes["card-book"]}>
            <div className={classes["cover-img"]}>
              <img
                className={classes.pic}
                src={book.cover_img}
                alt="cover img"
              />
            </div>
            <div className={classes.info}>
              <div>
                <span>
                  <b>Title:</b>
                </span>
                <div className={classes.par}>{book.title}</div>
              </div>
              <div>
                <span>
                  <b>Author:</b>{" "}
                </span>
                <div className={classes.par}>{book.author}</div>
              </div>
              <div>
                <span>
                  <b>First Publish Year:</b>{" "}
                </span>
                <div className={classes.par}>{book.first_publish_year}</div>
              </div>
              <div>
                <span>
                  <b>Description:</b>{" "}
                </span>
                <div className={classes.par}>{book.description}</div>
              </div>
              <div>
                <span>
                  <b>Subject Places:</b>{" "}
                </span>
                <div className={classes.par}>{book.subject_places}</div>
              </div>
              <div>
                <span>
                  <b>Subject Times: </b>
                </span>
                <div className={classes.par}>{book.subject_times}</div>
              </div>
              {isLogged && (
                <div className={classes.buttons}>
                  <button
                    className={classes.favBtn}
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
                  >
                    {" "}
                    <b>Add to favorite</b>
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

      <section className={classes.commentsarea}>
        <div className={classes.comments}>
          <div className={classes.titlecomment}>
            <h3>Comments:</h3>
          </div>

          <div className={classes.typecomment}>
            <img className={classes.pandacomment} src={userIcon}></img>
            <div className={classes.typecomment}>Type comment as User...</div>
            <button className={classes.buttonadd}> ADD</button>
          </div>
          <div className={classes.comment}>
            <p className={classes.pComment}>Panda wrote on 02.07.2022:</p>
            <p className={classes.pComment}>
              {" "}
              "I like book, better than bamboo c:"
            </p>
          </div>
          <div className={classes.comment}>
            <p className={classes.pComment}> DJ Pandex wrote on 02.07.2022:</p>
            <p className={classes.pComment}>
              {" "}
              "I don't like book, is very sad :("{" "}
            </p>
          </div>
          <p className={classes.par}>
            {" "}
            <button className={classes.seemore}>
              <b>See more</b>{" "}
            </button>
          </p>
        </div>
      </section>
    </section>
  );
};
