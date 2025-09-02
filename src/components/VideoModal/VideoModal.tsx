import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setCurrentVideo } from "../../features/courses/coursesSlice";
import styles from "./styles.module.scss";

const VideoModal = () => {
  const dispatch = useDispatch();
  const currentVideoId = useSelector(
    (state: RootState) => state.courses.currentVideo
  );
  const course = useSelector((state: RootState) =>
    state.courses.courses.find((c) => c.id === currentVideoId)
  );

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    dispatch(setCurrentVideo(null));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (currentVideoId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentVideoId]);

  if (!course) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <video
          controls
          autoPlay
          src={course.videoUrl}
          className={styles.video}
        />
      </div>
    </div>
  );
};

export default VideoModal;
