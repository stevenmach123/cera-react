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

export default function PopularProductCard({ i, product, wordpic,des }: PopularProductCardProps) {
  const { addProduct } = useCart();

  return (
    <div key={i} className="popular-card" >
      <div className="popular-image" style={{ backgroundColor: product?.img }}>
         {!product?.img && <span style={{ margin: 'auto', fontSize: '4em', border: '1px solid none' }}>{wordpic[0]}</span> }
        
      </div>

      <div className="popular-info">
        <div>
          {des
            ? des.length >= 2
              ? <span>{des.join(' ● ')}</span>
              :des.map((des, idx) => <span key={idx}>{des}</span>)
            : <></>}
        </div>
        <h3 className="popular-name">{wordpic}</h3>
      </div>

      <button
        className="add-btn2"
        onClick={() => addProduct({ name: wordpic, img: product?.img ? product.img : wordpic[0] })}
      >
        Chọn
      </button>
    </div>
  );
}