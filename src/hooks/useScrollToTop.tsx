
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Ensure scrolling to the very top of the page, including scrolling both vertically and horizontally
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
};
