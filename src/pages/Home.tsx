import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <div className={styles.home}>
      <h1>Welcome, {user?.email?.split("@")[0]}👋</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Home;
