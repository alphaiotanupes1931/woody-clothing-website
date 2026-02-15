import { Link } from "react-router-dom";

const AnnouncementBar = () => {
  return (
    <Link
      to="/shop"
      className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background text-center py-2 text-[10px] md:text-[11px] font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors block"
    >
      Sign up for our newsletter & get 10% off your first order →
    </Link>
  );
};

export default AnnouncementBar;