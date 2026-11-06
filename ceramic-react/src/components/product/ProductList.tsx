import { Outlet } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import FilterMini from '../FilterMini';
import ProductCard from './ProductCard';
import './ProductList.scss';
import { products } from '../../types/data';

export default function ProductList() {
  const { addProduct } = useCart();

  return (
    <>
      <Outlet />
      <div className="row">
        <section className="cate-list col col-2">fsdf</section>
        <section className="product-list col col-10">
          <div className="product-container">
            <h2 className="section-title">Products</h2>
            <FilterMini />
            <div className="product-grid">
              {products.map((product, i) => (
                <ProductCard
                  key={`${product.name}-${i}`}
                  product={product}
                  onAdd={addProduct}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
