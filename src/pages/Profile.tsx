import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Header from "../components/Header/Header";
import CourseCard from "../components/CourseCard/CourseCard";
import styles from "./Profile.module.scss";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const courses = useSelector((state: RootState) => state.courses.courses);
  const purchased = useSelector((state: RootState) => state.courses.purchased);

  const purchasedCourses = courses.filter((c) => purchased.includes(c.id));

  return (
    <div className={styles.profile}>
      <Header />

      <h2 className={styles.accountTitle}>
        Account: {user?.email?.split("@")[0]}
      </h2>

      <h3>Purchased Courses:</h3>
      <div className={styles.coursesGrid}>
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course, index) => (
            <div
              key={course.id}
              className={`${styles.cardWrapper} ${styles.fadeIn}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <p>No purchased courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
