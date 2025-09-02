import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { UserCircle } from "lucide-react";
import styles from "./styles.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Courses
      </Link>

      <div className={styles.account} ref={dropdownRef}>
        <div onClick={() => setMenuOpen(!menuOpen)}>
          <UserCircle size={28} />
        </div>

        {menuOpen && (
          <div className={styles.dropdown}>
            <p>{user?.email}</p>
            <button
              className={styles.profileBtn}
              onClick={() => setMenuOpen(false)}
            >
              <Link className={styles.profileBtn_text} to="/profile">
                Profile
              </Link>
            </button>
            <button className={styles.logOutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
