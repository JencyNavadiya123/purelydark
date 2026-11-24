import { useState } from "react";
import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import MobileDrawer from "./MobileDrawer";
import ScrollToTop from "./ScrollToTop";
import CartDrawer from "../cart/CartDrawer";
import ToastContainer from "../common/ToastContainer";
import BackToTop from "../common/BackToTop";
import ScrollProgressBar from "../common/ScrollProgressBar";
import CustomCursor from "../common/CustomCursor";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <ScrollProgressBar />
      <CustomCursor />
      <AnnouncementBar />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
      <CartDrawer />
      <ToastContainer />
      <BackToTop />
    </div>
  );
}
