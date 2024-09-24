import { toast } from "@/components/ui/use-toast";
import axios from "axios";

export async function getCourseInfo({ courseId }: { courseId: string }) {
  try {
    const res = await axios.get(`/api/course-info?courseId=${courseId}`);
    return res.data.course;
  } catch (error: any) {
    toast({
      title : error.response.data.message
    })
    console.log("Error fetching course info:", error.response.data.message);
    throw error;
  }
}
