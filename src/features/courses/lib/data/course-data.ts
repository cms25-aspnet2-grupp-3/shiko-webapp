export type CourseLesson = {
  id: string;
  title: string;
  durationMinutes: number;
};

export type CourseDetails = {
  description: string | null;
  lessons: CourseLesson[];
  keyPoints?: string[] | null;
};

export type Course = {
  id: string;
  title: string;
  imageUrl?: string | null;
  instructorId: string | null;
  numberOfLessons: number;
  totalDurationMinutes: number;
  details?: CourseDetails | null;
};

type CourseApiResponse<T> = {
  succeeded: boolean;
  value: T | null;
  error: string | null;
};

const COURSE_ENDPOINT =
  "https://cms25-aspnet2-grupp3-course-api.azurewebsites.net/api/course";
const COURSE_LIST_ERROR = "Could not load courses";
const COURSE_ITEM_ERROR = "Could not load course";

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const res = await fetch(COURSE_ENDPOINT, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Request error (${res.status})`);
    }

    const data = (await res.json()) as CourseApiResponse<Course[]>;

    if (!data.succeeded || !data.value) {
      throw new Error(data.error ?? COURSE_LIST_ERROR);
    }

    return data.value;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : COURSE_LIST_ERROR);
  }
};

export const fetchCourseById = async (id: string): Promise<Course | null> => {
  try {
    const res = await fetch(`${COURSE_ENDPOINT}/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Request error (${res.status})`);
    }

    const data = (await res.json()) as CourseApiResponse<Course>;

    if (!data.succeeded) {
      throw new Error(data.error ?? COURSE_ITEM_ERROR);
    }

    return data.value;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : COURSE_ITEM_ERROR);
  }
};
