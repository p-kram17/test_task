import { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./styles.module.scss";

interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
}

interface Props {
  courses: Course[];
}

const CourseList: React.FC<Props> = ({ courses }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <div className={styles.courseList}>
        {courses.slice(0, visibleCount).map((course, index) => (
          <div
            key={course.id}
            className={`${styles.cardWrapper} ${styles.fadeIn}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      {visibleCount < courses.length && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={styles.loadMoreBtn}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CourseList;
