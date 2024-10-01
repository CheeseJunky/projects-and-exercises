import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='admin'>Admin</Link>
    </nav>
  );
}