import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './SearchSection.scss';

interface Crumb {
  label: string;
  url: string;
}

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCount, openCart } = useCart();

 
  function buildBreadcrumbs() {
    const segments = location.pathname.split('/').filter((s) => s);
    const crumbs: Crumb[] = [{ label: 'Nhà', url: '/' }];

    segments.forEach((segment) => {
      if (segment === 'home') return;
      let val = '';
      if (segment === 'products') val = 'Mẫu';
      crumbs.push({
        label: val.charAt(0).toUpperCase() + val.slice(1).replace(/-/g, ' '),
        url: segment,
      });
    });

    setBreadcrumbs(crumbs);
  }

  useEffect(() => {
    if(location.pathname)
        buildBreadcrumbs();
  }, [location.pathname]);

  const onSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const navigatePop = (filter: string) => {
    setSelectedFilter(filter);
    navigate(`/home/products/${filter}`);
  };

  const clearNavigate = () => {
    setSelectedFilter(null);
    navigate('/home/products');
  };

  const navigateTo = (url: string) => {
    navigate(url);
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Kiếm mẫu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={onSearch}>
            Kiếm
          </button>
          <div className="address ms-2">
            <span className="a1 d-block">HI </span>
            <span className="a2">Hi</span>
          </div>
          <a onClick={openCart} style={{ cursor: 'pointer' }}>
            <i
              style={{ fontSize: '1.6rem', color: 'var(--color-on-surface)' }}
              className="bi bi-cart ms-2"
            />
            {totalCount > 0 && (
              <span
                style={{
                  color: 'white',
                  backgroundColor: 'var(--color-on-surface)',
                }}
                className="top-0 start-100 translate-middle badge rounded-pill"
              >
                {totalCount}
              </span>
            )}
          </a>
        </div>

        {breadcrumbs.length > 0 && (
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, i) => (
              <div className="item" key={`${crumb.label}-${i}`}>
                <span
                  className="breadcrumb-link"
                  onClick={() => navigateTo(crumb.url)}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="filter-tags">
          <span
            className={`filter-tag ${selectedFilter === 'hotsale' ? 'active' : ''}`}
            onClick={() => navigatePop('hotsale')}
          >
            Bán Chạy
          </span>
          <span
            className={`filter-tag ${selectedFilter === 'quality' ? 'active' : ''}`}
            onClick={() => navigatePop('quality')}
          >
            Hàng Chất Lượng
          </span>
          <span
            className={`filter-tag ${selectedFilter === 'foreign' ? 'active' : ''}`}
            onClick={() => navigatePop('foreign')}
          >
            Hàng Nhập Khẩu
          </span>
          <button className="clear-btn" onClick={clearNavigate}>
            Xóa
          </button>
        </div>
      </div>
    </section>
  );
}
