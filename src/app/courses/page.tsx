import { BackgroundBoxes } from "../../components/Background-boxdemo";
import CourseHomePage from "../../components/CourseHomePage";

export default function Courses() {
  return (
    <div className="flex flex-col bg-primary-foreground">
      <BackgroundBoxes />
      <CourseHomePage />
    </div>
  );
}
