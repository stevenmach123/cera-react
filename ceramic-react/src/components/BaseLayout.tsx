import { Link, Outlet } from 'react-router-dom';
import SearchSection from './home/SearchSection';
import CartSidebar from './home/CartSidebar';
import PopularContent from './home/PopularContent';
import './BaseLayout.scss';

export default function BaseLayout() {
  return (
    <>

      <nav className="info-nav-bar">
        <div className="nav-container">
          <Link to="/home" className="nav-logo">
            Heritage Ceramics
          </Link>
          <div className="nav-links">
            <Link to="/home" className="nav-link">
              Nhà
            </Link>
            <Link to="products" className="nav-link">
              Mẫu
            </Link>
            <a href="#" className="nav-link">
              Liên hệ
            </a>
            <a href="#" className="nav-link">
              Đăng nhập
            </a>
          </div>
        </div>
      </nav>

      <SearchSection />
      <CartSidebar />
      <Outlet />
    </>
  );
}
