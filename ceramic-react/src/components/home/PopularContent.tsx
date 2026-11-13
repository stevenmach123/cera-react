import { useEffect, useRef, useState } from 'react';
import './PopularContent.scss';
import { groups,PopularGroup,PopularItem } from '../../types/types';
import { useCart } from '../../context/CartContext';
import PopularProductCard from './PopularProductCard';



export default function PopularContent() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const count = groups.length;
  const [pause,setPaused] = useState<boolean>(false);
  const AUTOPLAY_MS = 5000
 const {addProduct} = useCart();
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [currentGroupIndex]);

  const nextGroup = () => {
      setCurrentGroupIndex((i)=>i + 1);
  };

  const previousGroup = () => {
      setCurrentGroupIndex((i)=>i - 1);
  };

  const goToGroup = (index: number) => {
    setCurrentGroupIndex(index);
  };

  useEffect(()=>{
    if(pause || count <= 1) return;
    const timer = setInterval(() => setCurrentGroupIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  },[count,pause])
 

  return (
    <section className="popular-content">
      <div className="popular-header">
        <h2 className="popular-title">{groups[currentGroupIndex].title}</h2>
      </div>

       <div  onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="popular-nav">
          <button className="nav-arrow" disabled={currentGroupIndex === 0} onClick={previousGroup}>‹</button>

          <div className="popular-track-viewport">
          <div style={{ transform: `translateX(-${currentGroupIndex * 100}%)` }}
            className="popular-track">{
               groups.map((group, gi) => (
                <div className="popular-slide"
                  key={gi}
                  ref={gi === currentGroupIndex ? scrollContainerRef : null}
                >{  
                group.items.map((product, i)=>(
                  <PopularProductCard
                      i={i}
                      product={product}
                      wordpic={product.label}
                      des={product.des}
                      />
              
                ) )
              
            }</div>
          ))}</div>
        </div>
      <button className="nav-arrow"  disabled={currentGroupIndex === count- 1} onClick={nextGroup}>
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
