import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SearchSection from './home/SearchSection';
import CartSidebar from './home/CartSidebar';
import PopularContent from './home/PopularContent';

import './BaseLayout.scss';
import { BigCates } from '../types/data';

interface Crumb {
  label: string;
  url: string;
}

export default function BaseLayout() {
  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  function buildBreadcrumbs() {
    const segments = location.pathname.split('/').filter((s) => s);
    const crumbs: Crumb[] = [{ label: 'Nhà', url: '/' }];

    segments.forEach((segment) => {
      if (segment === 'home') return;
      let val = '';
      if (segment === 'products') val = 'Mẫu';
      else {
        const bigCate = BigCates.find((cate) => cate.name === segment);
        if (bigCate){
            val = bigCate.displayName;
            segment = ['products','bigcate',bigCate.name].join('/')
        }
       
      }
      if(val)
        crumbs.push({
          label: val.charAt(0).toUpperCase() + val.slice(1).replace(/-/g, ' '),
          url: segment,
        });

    });
    console.log(crumbs)
    setBreadcrumbs(crumbs);
  }

  useEffect(() => {
    if (location.pathname) buildBreadcrumbs();
  }, [location.pathname]);

  const navigateTo = (url: string) => {
    navigate(url);
  };

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

      {breadcrumbs.length > 0 && (
        <div className="breadcrumb-container">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, i) => (
              <div className="item" key={`${crumb.label}-${i}`}>
                <span className="breadcrumb-link" onClick={() => navigateTo(crumb.url)}>
                  {crumb.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}