import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import logoImg from '../../Graphics/Logo.png';
import logoUser from '../../Graphics/User-icon.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../index';
import { AppContext } from '../../providers/AppProvider';
import bar from '../../Graphics/Hamburger-icon.png';

export const Navbar = (): JSX.Element => {
	const { isLogged, setIsLogged, username, myBookList } = useContext(AppContext);
	const [toggleMenu, setToggleMenu] = useState(false);
	const [pandaAnime, setPandaAnime] = useState(false)

	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		setToggleMenu(!toggleMenu)
		try {
			await signOut(firebaseAuth);
			navigate('/');
			console.log('Logged out');
		} catch (error) {
			console.log(error);
		}
		setIsLogged(false);
	};

	useEffect(() => {
		if (myBookList.length === 0) {
			return
		}
		setPandaAnime(true);
		const timer = setTimeout(() => {
			setPandaAnime(false)
		}, 300);

		return () => {
			clearTimeout(timer)
		}
	}, [myBookList]);

	const pandaClasses = `${classes['logo-user']} ${pandaAnime ? classes.bump : ''}`;

	const contentIsLogged = (
		<div>
			<Link className={classes['links-desktop']} to='/'>
				Home
			</Link>
			<Link className={classes['links-desktop']} to='mybooks'>
				MyBooks
			</Link>
			<Link className={classes['links-desktop']} to='/' onClick={handleLogout}>
				Log out
			</Link>
			<img src={logoUser} className={pandaClasses} alt='' />
			<span className={classes['span-username']}>Hello, {username}!</span>
		</div>
	);

	const contentIsNotLogged = (
		<div>
			<Link className={classes['links-desktop']} to='/'>
				Home
			</Link>
			<Link className={classes['links-desktop']} to='login'>
				Log in
			</Link>
			<Link className={classes['links-desktop']} to='register'>
				Sign in
			</Link>
		</div>
	);

	return (
		<div className={classes.navbar}>
			<img className={classes['logo-img']} src={logoImg} alt=''></img>
			<div>
				{!isLogged && contentIsNotLogged}
				{isLogged && contentIsLogged}
				<button
					onClick={() => setToggleMenu(!toggleMenu)}
					className={classes['bar-button']}>
					<img className={classes['bar-icon']} src={bar} alt='' />
				</button>

				<div
					className={
						toggleMenu
							? classes['show-navbar-collapse']
							: classes['navbar-collapse']
					}>
					{isLogged && toggleMenu && (
						<ul className={classes['navbar-nav']}>
							<li className={classes['nav-item']}>
								<Link className={classes.links} to='/' onClick={() => setToggleMenu(!toggleMenu)}>
									Home
								</Link>
							</li>
							<li>
								<Link className={classes.links} to='mybooks' onClick={() => setToggleMenu(!toggleMenu)}>
									MyBooks
								</Link>
							</li>
							<li>
								<Link className={classes.links} to='/' onClick={handleLogout}>
									Log out
								</Link>
							</li>
						</ul>
					)}

					{!isLogged && toggleMenu && (
						<ul className={classes['navbar-nav']}>
							<li className={classes['nav-item']}>
								<Link className={classes.links} to='/' onClick={() => setToggleMenu(!toggleMenu)}>
									Home
								</Link>
							</li>

							<li>
								<Link className={classes.links} to='login' onClick={() => setToggleMenu(!toggleMenu)}>
									Log in
								</Link>
							</li>

							<li>
								<Link className={classes.links} to='register' onClick={() => setToggleMenu(!toggleMenu)}>
									Sign in
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};
