import { WishlistCourses } from "../../components/WishlistCourses";

const WishlistPage = async () => {
  return (
    <div className="min-h-screen bg-primary-foreground">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif">
        My Wishlist
      </div>
      <WishlistCourses />
    </div>
  );
};

export default WishlistPage;
