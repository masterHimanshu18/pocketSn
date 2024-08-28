import {Link} from 'react-router-dom';
import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const user = {
    _id : "", role : ''
};

const Header = () => {

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const logoutHandler = () => {
    setIsOpen(false);
  };
  return (
    <nav className="header">
        <Link onClick={() => setIsOpen(false)} to={"/"}>HOME</Link>
        <Link onClick={() => setIsOpen(false)} to={"/Search"}><FaSearch /></Link>
        <Link onClick={() => setIsOpen(false)} to={"/Cart"}><FaShoppingBag /></Link>
        {/* If user exists then show profile else login using optional chaining */}
        {
            user?._id? (
                <>
                <button onClick={() => setIsOpen((prev) => !prev)}>
                    <FaUser />
                </button>
                <dialog open={isOpen}>
                    <div>
                        {user.role === 'admin' && (
                            <Link to="/admin/dashboard">Admin</Link>
                            )}
                            <Link to="/orders">Orders</Link>
                            <button onClick={logoutHandler}>
                                <FaSignOutAlt />
                            </button>
                    </div>
                </dialog>
                </>
            ) : (
            <Link onClick={() => setIsOpen(false)} to={"/login"}>
                <FaSignInAlt />
            </Link>
            )
        }
    </nav>
  )
}

export default Header;