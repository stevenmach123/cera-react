import { PopularItem } from '../../types/types';
import { useCart } from '../../context/CartContext';
import './PopularContent.scss'
import { Product } from '../../types/catalog';
type PopularProductCardProps = {
  i: number;
  product: PopularItem |Product;
  des?:string[]
  wordpic: string;
  
};

export default function PopularProductCard({ product, wordpic,des }: PopularProductCardProps) {
  const { addProduct } = useCart();
  const color = product?.img;

  return (
    <div className="popular-card" >
      <div className="popular-image" style={color ? { backgroundColor: color } : undefined}>
        {!color && <span className="popular-image-fallback">{wordpic?.[0]}</span>}
      </div>

      <div className="popular-info">
        <div className="popular-des-container">
        {des.map((cat,idx)=>
          <span className="popular-des">
            <span className="popular-des-text" title={cat}>{cat}</span>
          </span>
        )}
        </div>
        <span className="popular-name" title={wordpic}>{wordpic}</span>
      </div>

      <button
        className="add-btn2"
        onClick={() => addProduct({ name: wordpic, img: color ? color : wordpic[0] })}
      >
        Chọn
      </button>
    </div>
  );
}
