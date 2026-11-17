import { PopularItem } from '../../types/types';
import { useCart } from '../../context/CartContext';
import './PopularContent.scss'
import { Product } from '../../types/catalog';
import { useNavigate } from 'react-router-dom';
import { BigCates } from '../../types/data';
type PopularProductCardProps = {
  i: number;
  product: PopularItem |Product;
  des?:string[]
  wordpic: string;
  
};

export default function PopularProductCard({ product, wordpic,des }: PopularProductCardProps) {
  const { addProduct } = useCart();
  const color = product?.img;
   const navigate = useNavigate();
  const goToSubCate = (text: string) => {
    const bigCate = BigCates.find((cate) => cate.displayName === text);
    if (bigCate) navigate(`/home/products/bigcate/${bigCate.name}`);
  };
  return (
    <div className="popular-card" >
      <div className="popular-image" style={color ? { backgroundColor: color } : undefined}>
        {!color && <span className="popular-image-fallback">{wordpic?.[0]}</span>}
      </div>

      <div className="popular-info">
        <div className="popular-des-container">
          {(des ?? []).map((cat,idx)=>
          <span
            key={idx}
            className={`popular-des ${BigCates.some((c) => c.displayName === cat) ? 'popular-des-link' : ''}`}
            onClick={() => goToSubCate(cat)}
          >
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
