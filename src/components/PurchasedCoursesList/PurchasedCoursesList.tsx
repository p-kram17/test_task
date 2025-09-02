import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./styles.module.scss";

const PurchasedCoursesList = () => {
  const courses = useSelector((state: RootState) => state.courses.courses);
  const purchased = useSelector((state: RootState) => state.courses.purchased);

  const purchasedCourses = courses.filter((course) =>
    purchased.includes(course.id)
  );

  if (purchasedCourses.length === 0) {
    return (
      <p className={styles.noCourses}>You haven’t purchased any courses yet.</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      {purchasedCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default PurchasedCoursesList;
