import { CartItem, ProductItem } from '../../types/types'
import './ProductList.scss';

interface ProductCardProps {
  product: ProductItem;
  onAdd: (item: Omit<CartItem, 'count'>) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="product-card">
      <div
        className="product-image"
        style={{ backgroundColor: product.img }}
      />
      <div className="product-info">
        <div>{
            product.des.length >= 2
            ? <p>{product.des.join(' ● ')}</p>
            : product.des.map((des, idx) => <p key={idx}>{des}</p>)
        }</div>
          <h3 className="product-name">{product.name}</h3>
      
        </div>
        <button
          className="add-btn"
          onClick={() => onAdd({ name: product.name, img: product.img })}
        >
          Chọn
        </button>
      </div>
    
  );
}
