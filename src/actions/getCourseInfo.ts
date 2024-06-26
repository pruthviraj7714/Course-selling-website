import axios from "axios";

export async function getCourseInfo({ courseId }: { courseId: string }) {
  try {
    const res = await axios.get(`/api/course-info?courseId=${courseId}`);
    console.log(res.data);

    return res.data.course;
  } catch (error: any) {
    console.log("Error fetching course info:", error.message);
    throw error;
  }
}
