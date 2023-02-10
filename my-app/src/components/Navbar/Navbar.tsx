import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import classes from './Navbar.module.css';
import logoImg from '../../Graphics/Logo.png';
import logoUser from '../../Graphics/User-icon.png';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../index';
import { AppContext } from '../../providers/AppProvider';
import bar from '../../Graphics/Hamburger-icon.png';

export const Navbar = (): JSX.Element => {
	const { isLogged, setIsLogged, username } = useContext(AppContext);
	const [toggleMenu, setToggleMenu] = useState(false);

	const navigate = useNavigate();

	const handleLogout = async (): Promise<void> => {
		try {
			await signOut(firebaseAuth);
			navigate('/');
			console.log('Logged out');
		} catch (error) {
			console.log(error);
		}
		setIsLogged(false);
	};

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
			<img src={logoUser} className={classes['logo-user']} alt='' />
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
								<Link className={classes.links} to='/'>
									Home
								</Link>
							</li>
							<li>
								<Link className={classes.links} to='mybooks'>
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
								<Link className={classes.links} to='/'>
									Home
								</Link>
							</li>

							<li>
								<Link className={classes.links} to='login'>
									Log in
								</Link>
							</li>

							<li>
								<Link className={classes.links} to='register'>
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
