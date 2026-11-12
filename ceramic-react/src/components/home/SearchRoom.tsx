import { useState } from 'react';
import { rooms } from '../../types/data';
import { get_popular_products_from_room } from '../../types/myutil';
import type { Room } from '../../types/catalog';
import './SearchRoom.scss';
import PopularProductCard from './PopularProductCard';

export default function SearchRoom() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(rooms[0]);
   
  const popularProducts = selectedRoom ? get_popular_products_from_room(selectedRoom) : [];

  return (
    <section className="search-room">
      <h2 className="search-room-title">Search by Room</h2>
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
                <h3 className="right-section-title">Sub Categories</h3>
                
                  {selectedRoom.sub_cate.map((sc) => (
                    <div key={sc.sub_cate_name} className="sub-cate-item">
                      <span>{sc.displayName}</span>
                    </div>
                  ))}
            
              </div>

              {/* Part 2: collection cards horizontal */}
              <div className="right-section">
                <div className="grid-as">
                    <div>
                        <span className="title-as">Những bộ sưu tập nổi tiếng của {selectedRoom.displayName}</span><br/>
                        {selectedRoom.collection?.map((col,index) => (
                            <span className="collection-name" style={{padding:'0px 0.2rem',color:'var(--color-text-sg)'}}>{col.displayName}{index < selectedRoom.collection.length - 1 ? ',' : ''}</span>
                        ))}    
                    </div>

                    <div>                 
                        <div className="collection-list">
                        {selectedRoom.collection?.map((col) => (
                             <div key={col.name}  className="sub-cate-item" style={{width:'180px',aspectRatio:'1/1.2'}}>
                                 <span>{col.displayName}</span>
                             </div>
                        ))}
                        </div>
                    </div>
              </div>
              </div>

              {/* Part 3: popular products */}
              <div className="right-section">
                <h3 className="right-section-title">Popular {selectedRoom.displayName} Product</h3>
                <div className="popular-product-list">
                  {popularProducts.map((p,i) => (
                    <PopularProductCard
                        i={i}
                        product={p}
                        des={[]}
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