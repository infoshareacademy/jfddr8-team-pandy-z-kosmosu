import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import logoImg from '../../Graphics/Logo.png';

export const Navbar = () => {
	return (
		<div className={classes.navbar}>
			<img src={logoImg}></img>
            <div>
			<Link className={classes.links} to='/'>Home</Link>
			<Link className={classes.links} to='login'>Log in</Link>
			<Link className={classes.links} to='register'>Sign in</Link>
			<Link className={classes.links} to='mybooks'>MyBooks</Link>
			<Link className={classes.links} to='/'>Sign out</Link>
            </div>
		</div>
	);
};
