import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import classes from "./BookDetails.module.css";
import { Loader } from "../Loader/Loader";
import coverImg from "../../Graphics/cover_not_found.jpg";
import pandaFull from "../../Graphics/panda-full-mark.jpg";
import pandaHalf from "../../Graphics/panda-half-mark.jpg";
import { AppContext } from "../../providers/AppProvider";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import {Route, Routes } from "react-router-dom";
import { Conversation } from "../Conversation/index";
import { ConversationList } from "../Conversation-list/index";
import { firebaseDb } from '../../index';
import { doc, setDoc } from 'firebase/firestore';
import {Comment} from './Comment';

const URL = "https://openlibrary.org/works/";

export type MyComment = {
	id: string,
	CreatedAt: number,
	message: string,
	user: string,

}

export const BookDetails = () => {
  const { isLogged, addToFav, myBookList, username } = useContext(AppContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>("");
  const [myMessagesList, setmyMessagesList] = useState ([] as MyComment[]);

  
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

  const addToComment = async (product: MyComment): Promise<void> => {
    	try {
    		await setDoc(doc(firebaseDb, 'conversations', `${book.id}`), {
    			messages: [...myMessagesList, product],
    		});
    		setmyMessagesList([...myMessagesList, product]);
    		console.log('dodano kom');
        
    	} catch (error) {
    		console.log(error);
    	}
    };
    console.log(myMessagesList);
  if (loading) return <Loader />;

  return (
    <section>
      <div className={classes["card-book"]}>
        <div className={classes["cover-img"]}>
          <img src={book.cover_img} alt="cover img" />
        </div>
        <div className={classes.content}>
          <div>
            <span>Title: </span>
            <span>{book.title}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{book.description}</span>
          </div>
          <div>
            <span>Subject Places: </span>
            <span>{book.subject_places}</span>
          </div>
          <div>
            <span>Subject Times: </span>
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
              <button onClick={() =>
                            addToComment({
      createdAt: Date.now(),
      message: 'hejo',
      user: username,
      id: book.id,
                            })}>Go to comments...</button>
              <div className={classes["box-panda"]}>
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaFull} alt="" />
                <img className={classes["panda-img"]} src={pandaHalf} alt="" />
              </div>
              <div className={classes["comment-box"]}>
              <div>
                {myMessagesList.map((item) => (
                    <Comment key={item.id} item={item} />
                ))}
            </div>
                
                <Stack
                  sx={{
                    height: "calc(100% - 48px)",
                    gap: "24px",
                    padding: "24px",
                  }}
                  direction="row"
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Routes>
                      <Route
                        element={
                          <Typography variant="h4">
                            
                          </Typography>
                        }
                        path="/"
                      />
                      <Route element={<Conversation />} path='/book/:id/*' />
                    
                    </Routes>
                  </Box>
                  <ConversationList />
                </Stack>
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
    </section>
  );
};
