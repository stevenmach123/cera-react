import { useState } from 'react';
import { BrandBigCates, BrandSubCates } from '../../types/data';
import { extract_brand_popular_product } from '../../types/myutil';
import PopularProductCard from './PopularProductCard';
import type { BrandBigCate, BrandProduct, Product } from '../../types/catalog';
import './SearchRoom.scss';

export default function SearchBrand() {
  const [selectedBrand, setSelectedBrand] = useState<BrandBigCate | null>(BrandBigCates[0]);

  const selectedBrandSubCates = selectedBrand
    ? BrandSubCates.filter((bsc) => bsc.name === selectedBrand.name)
    : [];

  const popularProducts: BrandProduct[] = selectedBrand
    ? extract_brand_popular_product(selectedBrand.name)
    : [];

  return (
    <section className="search-room">
      <h2 className="search-room-title">Search by Brand</h2>
      <div className="search-room-grid">
        {/* Left: Brand list */}
        <div className="search-room-left">
          {BrandBigCates.map((brand) => (
            <div
              key={brand.name}
              className={`room-item ${selectedBrand?.name === brand.name ? 'active' : ''}`}
              onClick={() => setSelectedBrand(brand)}
            >
              <span className="room-name">{brand.displayName}</span>
            </div>
          ))}
        </div>

        {/* Right: sub_cate + popular products */}
        <div className="search-room-right">
          {selectedBrand && (
            <>
              {/* Part 1: Brand sub categories */}
              <div className="right-section">
                <h3 className="right-section-title">Sub Categories</h3>
                {selectedBrandSubCates.map((bsc) =>
                  bsc.sub_cate.map((sub) => (
                    <div key={sub} className="sub-cate-item">
                      <span>{sub}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Part 2: popular products */}
              <div className="right-section">
                <h3 className="right-section-title">Popular {selectedBrand.displayName} Products</h3>
                <div className="popular-product-list">
                  {popularProducts.map((p, i) => (
                    <PopularProductCard
                      key={p.name}
                      i={i}
                      product={p as unknown as Product}
                      des={[]}
                      wordpic={p.displayName}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
