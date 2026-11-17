import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './SearchSection.scss';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { totalCount, openCart } = useCart();

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
