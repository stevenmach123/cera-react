import { useState,useEffect } from 'react';
import { rooms } from '../../types/data';
import { get_popular_products_from_room } from '../../types/myutil';
import type { Room } from '../../types/catalog';
import './SearchRoom.scss';
import PopularProductCard from './PopularProductCard';
import { useProducts } from '../../context/ProductContext';

export default function SearchRoom() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(rooms[0]);
  const {bigCate_DisplayName,subCate_DisplayName} = useProducts()
  const popularProducts = selectedRoom ? get_popular_products_from_room(selectedRoom) : [];


  const COL_VISIBLE = 2;
  const collections = selectedRoom?.collection ?? [];
  const maxColOffset = Math.max(0, collections.length - COL_VISIBLE);
  const [colOffset, setColOffset] = useState(0);
  useEffect(() => {
    setColOffset(0);
  }, [selectedRoom?.name]);
  return (
    <section className="search-room">
      <h2 className="search-room-title">Tìm kiếm theo Phòng</h2>
      <div className="search-room-grid">
        {/* Left: Room list */}
        <div className="search-room-left">
          {rooms.map((room) => (
            <div
              key={room.name}
              className={`room-item ${selectedRoom?.name === room.name ? 'active' : ''}`}
              onClick={() => setSelectedRoom(room)}
            >
              <span className="room-name">{room.displayName}</span>
              {selectedRoom?.name === room.name && room.des && (
                <span className="room-des">{room.des}</span>
              )}
            </div>
          ))}
        </div>

        {/* Right: sub_cate + collections + popular products */}
        <div className="search-room-right">
          {selectedRoom && (
            <>
              {/* Part 1: sub_cate list */}
              <div className="right-section">
                <h3 className="right-section-title">Danh Mục Con</h3>
                
                  {selectedRoom.sub_cate.map((sc) => (
                    <div key={sc.sub_cate_name} className="sub-cate-item">
                      <span>{sc.displayName}</span>
                    </div>
                  ))}
            
              </div>

              {/* Part 2: collection cards horizontal */}
              <div className="right-section">
                <div className="grid-as">
                    <div className="grid-left">
                        <span className="title-as">Những bộ sưu tập nổi tiếng của {selectedRoom.displayName}</span><br/>
                        {selectedRoom.collection?.map((col,index) => (
                            <span className="collection-name" style={{padding:'0px 0.2rem',color:'var(--color-text-sg)'}}>{col.displayName}{index < selectedRoom.collection.length - 1 ? ',' : ''}</span>
                        ))}    
                    </div>

                    <div className="grid-right">                 
                        {/* <div className="collection-list">
                        {selectedRoom.collection?.map((col) => (
                             <div key={col.name}  className="sub-cate-item" style={{width:'200px',aspectRatio:'1/1.2'}}>
                                 <span>{col.displayName}</span>
                             </div>
                        ))}
                        </div> */}

                         <div className="collection-nav">
                            <button
                              className="nav-arrow"
                              disabled={colOffset === 0}
                              onClick={() => setColOffset((i) => Math.max(0, i - 1))}
                            >
                              ‹
                            </button>

                            {/* viewport clips the 3rd+ items */}
                            <div className="collection-list">
                              <div
                                className="collection-track"
                                style={{ transform: `translateX(calc(-${colOffset} * (200px + 1rem)))` }}
                              >
                                {selectedRoom.collection?.map((col) => (
                                  <div key={col.name} className="sub-cate-item collection-item">
                                    <span>{col.displayName}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button
                              className="nav-arrow"
                              disabled={colOffset >= maxColOffset}
                              onClick={() => setColOffset((i) => Math.min(maxColOffset, i + 1))}
                            >
                              ›
                            </button>
                          </div>

                    </div>
              </div>
              </div>

              {/* Part 3: popular products */}
              <div className="right-section">
                <h3 className="right-section-title">Sản phẩm {selectedRoom.displayName} phổ biến</h3>
                <div className="popular-product-list">
                  {popularProducts.map((p,i) => (
                    <PopularProductCard
                        i={i}
                        product={p}
                        des={[bigCate_DisplayName(p),subCate_DisplayName(p),p.branch[0]]}
                        wordpic={p.displayName}
                    >
                    </PopularProductCard>
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