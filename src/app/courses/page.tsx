import { BackgroundBoxes } from "../_components/Background-boxdemo";
import CourseHomePage from "../_components/CourseHomePage";

export default function Courses() {
  return (
    <div className="flex flex-col bg-primary-foreground">
      <BackgroundBoxes />
      <CourseHomePage />
    </div>
  );
}
