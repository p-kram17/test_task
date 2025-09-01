import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockCourses } from "../../mock/courses";

interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
}

interface CoursesState {
  courses: Course[];
  purchased: string[];
  currentVideo: string | null;
}

const initialState: CoursesState = {
  courses: mockCourses,
  purchased: [],
  currentVideo: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    purchaseCourse: (state, action: PayloadAction<string>) => {
      if (!state.purchased.includes(action.payload)) {
        state.purchased.push(action.payload);
      }
    },
    setCurrentVideo: (state, action: PayloadAction<string | null>) => {
      state.currentVideo = action.payload;
    },
  },
});

export const { purchaseCourse, setCurrentVideo } = coursesSlice.actions;
export default coursesSlice.reducer;
