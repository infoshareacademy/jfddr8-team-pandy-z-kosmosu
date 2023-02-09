import classes from './Footer.module.css';
import logoNoImg from "../../Graphics/logo-no-img.png";
import githubLogo from "../../Graphics/github-logo.png";
import liLogo from "../../Graphics/LI-logo.png";

export const Footer = () => {
    return (
        <footer>
     <a><img className={classes['footer-logo']} src={logoNoImg} alt='Pandoteka'/></a>
     <div>Pandoteka is a project created at Infoshare Acacemy by:</div>
     <ul>
        <li><span>Maja Karwacka-Frank</span><a href="https://github.com/olga-kacala"><img className={classes['footer-small-logos']} src={githubLogo} alt='github'/></a><a href="https://www.linkedin.com/in/olga-kaca%C5%82a-7b402b140/"><img className={classes['footer-small-logos']} src={liLogo} alt='LI'/></a></li>
        <li><span>Łukasz Śmigiel</span><a href="https://github.com/olga-kacala"><img className={classes['footer-small-logos']} src={githubLogo} alt='github'/></a><a href="https://www.linkedin.com/in/olga-kaca%C5%82a-7b402b140/"><img className={classes['footer-small-logos']} src={liLogo} alt='LI'/></a></li>
        <li><span>Szymon Chiczewski</span><a href="https://github.com/olga-kacala"><img className={classes['footer-small-logos']} src={githubLogo} alt='github'/></a><a href="https://www.linkedin.com/in/olga-kaca%C5%82a-7b402b140/"><img className={classes['footer-small-logos']} src={liLogo} alt='LI'/></a></li>
        <li><span>Weronika Niekludow</span><a href="https://github.com/olga-kacala"><img className={classes['footer-small-logos']} src={githubLogo} alt='github'/></a><a href="https://www.linkedin.com/in/olga-kaca%C5%82a-7b402b140/"><img className={classes['footer-small-logos']} src={liLogo} alt='LI'/></a></li>
        <li><span>Olga Kacała</span><a href="https://github.com/olga-kacala"><img className={classes['footer-small-logos']} src={githubLogo} alt="github"/></a><a href="https://www.linkedin.com/in/olga-kaca%C5%82a-7b402b140/"><img className={classes['footer-small-logos']} src={liLogo} alt='LI'/></a></li>
     </ul>
     </footer>
    )
}