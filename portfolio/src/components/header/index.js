import { Link } from "preact-router/match";
import style from './style.css'

const Header = () => (
    <header className={style.header}>
        <nav>
            <Link activeClassName={style.active} href="/">Home</Link>
            <Link activeClassName={style.active} href="/blog">Blog</Link>
            <Link activeClassName={style.active} href="/about-me">About Me</Link>
        </nav>

    </header>

);

export default Header;