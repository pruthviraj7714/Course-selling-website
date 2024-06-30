import UserPurchasedCourses from "../../components/UserPurchasedCourses";

export default function Page() {
  return (
    <div className="min-h-screen bg-primary-foreground">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif">
        My Learning
      </div>
      <UserPurchasedCourses />
    </div>
  );
}
