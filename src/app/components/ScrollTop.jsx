import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(({ children }) => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

export default ScrollTop;
