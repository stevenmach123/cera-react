import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './PopCate.scss';
import { products,popcate,PopCateKey } from '../../types/data';

export default function PopCate() {
  const { id } = useParams<{ id: string }>();
  const { addProduct } = useCart();

  const targetObj =
    id in popcate ? popcate[id as PopCateKey] : null;

  if (!targetObj) return null;

  return (
    <section>
      <h2 className="category-title">{targetObj.intro.title}</h2>
      <div className="product-scroll-container">
        {products.map(( product, i) => (
          <div className="product-card" key={`${product.name}-${i}`}>
            <div
              className="product-image"
              style={{ backgroundColor: product.img }}
            />
            <div className="product-info">
              <div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-des">{product.des}</p>
              </div>
              <button
                className="add-btn"
                onClick={() =>
                  addProduct({ name: product.name, img: product.img })
                }
              >
                Chọn
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
