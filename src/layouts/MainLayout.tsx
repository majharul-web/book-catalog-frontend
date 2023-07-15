import { Outlet } from "react-router-dom";
import Appbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div>
      <Appbar />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
