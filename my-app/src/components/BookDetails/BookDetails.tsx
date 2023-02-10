import { useState, useEffect, useContext, } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BookDetails.module.css';
import { Loader } from '../Loader/Loader';
import coverImg from '../../Graphics/cover_not_found.jpg';
import pandaFull from '../../Graphics/panda-full-mark.jpg';
import pandaHalf from '../../Graphics/panda-half-mark.jpg';
import { AppContext } from '../../providers/AppProvider';
import { Link } from 'react-router-dom';

const URL = 'https://openlibrary.org/works/';

export const BookDetails = () => {
	const { isLogged } = useContext(AppContext);
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [book, setBook] = useState<any>('');


	
	

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
						description: description ? description : 'No description found',
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
							<button>Add to favorites</button>
							<button>Go to comments...</button>
							<div className={classes['box-panda']}>
								<img className={classes['panda-img']} src={pandaFull} />
								<img className={classes['panda-img']} src={pandaFull} />
								<img className={classes['panda-img']} src={pandaFull} />
								<img className={classes['panda-img']} src={pandaFull} />
								<img className={classes['panda-img']} src={pandaHalf} />
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
		</section>
	);
};
