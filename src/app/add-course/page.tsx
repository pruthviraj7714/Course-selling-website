import AddCourseForm from "@/components/AddCourseForm";

export default function AddCourse() {
  return (
    <div className="min-h-screen bg-background">
    <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif">
      Add a course
    </div>
      <AddCourseForm />
    </div>
  );
}
