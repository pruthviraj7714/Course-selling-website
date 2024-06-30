import CoursePage from "@/components/CoursePage";

export default function Page ({ params }: { params: any }) {
  

  return (
    <div className="bg-primary">
      <div className="w-full py-10">
        <CoursePage courseId={params.courseId} />
      </div>
    </div>
  );
}
