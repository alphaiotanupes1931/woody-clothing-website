import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header solid />

      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-14">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8 opacity-0 animate-[fadeSlideUp_0.8s_ease-out_0.1s_forwards]">
            <img src={logo} alt="AI Nupes" className="h-16 mx-auto mb-6 opacity-20" />
            <h1 className="font-display text-[120px] md:text-[180px] leading-none text-foreground/10 tracking-tight">
              404
            </h1>
          </div>

          <div className="opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards]">
            <h2 className="font-display text-3xl md:text-5xl tracking-wide text-foreground mb-3">
              PAGE NOT FOUND
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Looks like this page doesn't exist. The link may be outdated or the page may have moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.5s_forwards]">
            <Link
              to="/shop"
              className="bg-foreground text-background px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-foreground/90 transition-all duration-300 hover:tracking-[0.3em]"
            >
              Shop Now
            </Link>
            <Link
              to="/"
              className="border border-border text-foreground px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;