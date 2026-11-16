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
  const meta = (des ?? []).filter(Boolean).join(' ● ');

  return (
    <div className="popular-card" >
      <div className="popular-image" style={color ? { backgroundColor: color } : undefined}>
        {!color && <span className="popular-image-fallback">{wordpic?.[0]}</span>}
      </div>

      <div className="popular-info">
        {meta && <span className="popular-des" title={meta}>{meta}</span>}
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
