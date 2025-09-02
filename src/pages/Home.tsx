import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import CourseList from "../components/CourseList/CourseList";
import Header from "../components/Header/Header";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const courses = useSelector((state: RootState) => state.courses.courses);

  return (
    <div className={styles.home}>
      <Header />
      <h1>Welcome, {user?.email?.split("@")[0]}</h1>

      <CourseList courses={courses} />
    </div>
  );
};

export default Home;
