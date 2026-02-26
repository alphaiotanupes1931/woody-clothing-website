import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import CartDrawer from "@/components/CartDrawer";
import NewsletterPopup from "@/components/NewsletterPopup";
import FilmGrain from "@/components/FilmGrain";
import PromoModal from "@/components/PromoModal";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import OrderConfirmation from "./pages/OrderConfirmation";
import Checkout from "./pages/Checkout";
import OurStory from "./pages/OurStory";
import FAQs from "./pages/FAQs";
import Contact from "./pages/Contact";
import ShippingReturns from "./pages/ShippingReturns";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <ScrollProgress />
            <CustomCursor />
            <CartDrawer />
            <NewsletterPopup />
            <FilmGrain />
            <PromoModal />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;