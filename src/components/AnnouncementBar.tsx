import { Link } from "react-router-dom";

const messages = [
  "The AI Collection · New drops available. Shop now",
  "Free shipping on orders over $149",
  "Pre-orders ship by April 21",
  "95th Anniversary Exclusives · Register to unlock",
  "Limited edition fitted hats now available",
];

const AnnouncementBar = () => {
  return (
    <Link
      to="/shop"
      className="fixed top-0 left-0 right-0 z-[60] bg-foreground text-background text-center py-2.5 text-[10px] md:text-[11px] font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors block overflow-hidden"
    >
      <div className="flex animate-[marquee-left_20s_linear_infinite] whitespace-nowrap">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="mx-8 md:mx-12 inline-block">
            {msg}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default AnnouncementBar;
