import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  purchaseCourse,
  setCurrentVideo,
} from "../../features/courses/coursesSlice";
import styles from "./styles.module.scss";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    price: number;
    videoUrl: string;
  };
}

const handlePurchase = async (
  courseId: string
): Promise<"success" | "error"> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      success ? resolve("success") : reject("Purchase failed");
    }, 1000);
  });
};

const CourseCard = ({ course }: CourseCardProps) => {
  const dispatch = useDispatch();
  const purchased = useSelector((state: RootState) => state.courses.purchased);
  const isPurchased = purchased.includes(course.id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onBuyClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await handlePurchase(course.id);
      if (result === "success") {
        dispatch(purchaseCourse(course.id));
      }
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const openVideo = () => {
    dispatch(setCurrentVideo(course.id));
  };

  return (
    <div className={styles.card}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>

      {!isPurchased ? (
        <>
          <p className={styles.price}>${course.price}</p>
          <button
            className={styles.buyBtn}
            onClick={onBuyClick}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </>
      ) : (
        <>
          <p className={styles.purchased}>✅ Purchased</p>
          <button className={styles.watchBtn} onClick={openVideo}>
            Watch Video
          </button>
        </>
      )}
    </div>
  );
};

export default CourseCard;
