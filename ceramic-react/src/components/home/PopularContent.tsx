import { useEffect, useRef, useState } from 'react';
import './PopularContent.scss';
import { groups,PopularGroup,PopularItem } from '../../types/types';
import { useCart } from '../../context/CartContext';



export default function PopularContent() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
 const {addProduct} = useCart();
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [currentGroupIndex]);

  const nextGroup = () => {
    if (currentGroupIndex < groups.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    }
  };

  const previousGroup = () => {
    if (currentGroupIndex > 0) {
      setCurrentGroupIndex(currentGroupIndex - 1);
    }
  };

  const goToGroup = (index: number) => {
    setCurrentGroupIndex(index);
  };



  return (
    <section className="popular-content">
      <div className="popular-header">
        <h2 className="popular-title">{groups[currentGroupIndex].title}</h2>
      </div>

       <div className="popular-nav">
            <button className="nav-arrow" disabled={currentGroupIndex === 0} onClick={previousGroup}>‹</button>
            <div className="popular-scroll" ref={scrollContainerRef}>
                {groups[currentGroupIndex].items.map((product, i) =>
                    <div key={i} className="popular-card">
                    <div
                        className="popular-image"
                        style={{ backgroundColor: product.img }}
                    />
                    <div className="popular-info">
                        <div>{
                            product.des.length >= 2
                            ? <p>{product.des.join(' ● ')}</p>
                            : product.des.map((des, idx) => <p key={idx}>{des}</p>)
                        }</div>
                        <h3 className="popular-name">{product.label}</h3>
                    
                    </div>
                    <button
                        className="add-btn2"
                        onClick={() => addProduct({ name: product.label, img: product.img })}
                    >
                        Chọn
                    </button>
                    </div>
                )}
            </div>
            <button className="nav-arrow"  disabled={currentGroupIndex === groups.length - 1} onClick={nextGroup}>
            ›
          </button>

      </div>

    <div className="group-indicators">
      {groups.map((_, i) => (
    <span
      key={i}
      className={`group-indicator ${i === currentGroupIndex ? 'active' : ''}`}
      onClick={() => goToGroup(i)}
    />
      ))}
    </div>
    </section>
  );
}
