import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BookDetails.module.css';
import { Loader } from '../Loader/Loader';
import coverImg from '../../Graphics/cover_not_found.jpg';
import pandaFull from '../../Graphics/panda-full-mark.jpg';
import pandaHalf from '../../Graphics/panda-half-mark.jpg';
import { AppContext } from '../../providers/AppProvider';
import { Link } from 'react-router-dom';
import { firebaseDb } from '../../App';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { Comment } from './Comment';

const URL = 'https://openlibrary.org/works/';

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
								: 'No description found',
						title: title,
						cover_img: covers
							? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
							: coverImg,
						subject_places: subject_places
							? subject_places.join(', ')
							: 'No subject places found',
						subject_times: subject_times
							? subject_times.join(', ')
							: 'No subject times found',
						subjects: subjects ? subjects.join(', ') : 'No subjects found',
						id: id,
					};
					setBook(newBook);
				} else {
					setBook('');
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getBookDetails();
	}, [id]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentValue(e.target.value);
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

	const removeComment = async (commId: number): Promise<void> => {
		const newArr = myMessagesList.filter((obj) => obj.id !== commId);

		try {
			await setDoc(doc(firebaseDb, 'conversations', `${book.id}`), {
				messages: newArr,
			});
			setmyMessagesList(newArr);
		} catch (error) {
			console.log(error);
		}
	};

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

	if (loading) return <Loader />;
	return (
		<section>
			<div className={classes['card-book']}>
				<div className={classes['cover-img']}>
					<img src={book.cover_img} alt='cover img' />
				</div>
				<div className={classes.content}>
					<div>
						<span>Title: </span>
						<span>{book.title}</span>
					</div>
					<div>
						<span>Description: </span>
						<span>{book.description || book.description}</span>
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
								className={classes['btn-add-to-fav']}
								disabled={myBookList.some(
									(singleBook) => singleBook.id === book.id
								)}
								onClick={() =>
									addToFav({
										title: book.title,
										cover_img: book.cover_img,
										id: book.id,
									})
								}></button>
							<div className={classes['box-panda']}>
								<img className={classes['panda-img']} src={pandaFull} alt='' />
								<img className={classes['panda-img']} src={pandaFull} alt='' />
								<img className={classes['panda-img']} src={pandaFull} alt='' />
								<img className={classes['panda-img']} src={pandaFull} alt='' />
								<img className={classes['panda-img']} src={pandaHalf} alt='' />
							</div>
						</div>
					)}

					{!isLogged && (
						<div>
							<div>
								<Link className={classes.links} to='/login'>
									Log in
								</Link>
								<span>to add to favorites :)</span>
							</div>
							<div>
								<span>See comments or </span>
								<Link className={classes.links} to='/login'>
									Log in
								</Link>
								<span>to add one!</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{isLogged && (
				<div>
					<div>
						<textarea
							onChange={handleInputChange}
							placeholder='Your comment...'
							value={commentValue}></textarea>
						<div>
							<button
								onClick={() => {
									addToComment({
										CreatedAt: Date.now(),
										message: commentValue,
										user: username,
										id: Date.now(),
									});
								}}>
								Add comment
							</button>
						</div>
					</div>

					<div className={classes['comment-box']}>
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
			)}
		</section>
	);
};
