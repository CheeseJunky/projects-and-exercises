import { Link } from "react-router-dom";
import styles from '../styles/Navbar.module.css'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>   

      <Link to='/'>Home</Link>
      <Link to='admin'>Admin</Link>
    </nav>
  );
}