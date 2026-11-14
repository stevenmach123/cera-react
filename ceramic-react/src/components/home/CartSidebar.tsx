import { useCart } from '../../context/CartContext';
import './CartSidebar.scss';

export default function CartSidebar() {
  const {
    cartItems,
    totalCount,
    upProductCount,
    downProductCount,
    removeProduct,
    isCartOpen,
    closeCart,
  } = useCart();

  return (
    <>
      <div
        className={`cart-sidebar-backdrop ${isCartOpen ? 'active' : ''}`}
        onClick={closeCart}
      />

      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeCart}>
          <span className="close-icon">×</span>
        </button>

        <div className="cart-sidebar-header">
          <span className="headsize">Võ hàng có</span>
           <span style={{color:'var(--color-primary)'}}>{cartItems.length}</span>
          <span className="headsize">món</span>
        </div>

        <div className="cart-sidebar-content">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <div className="item-image">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div className="item-quantity">
                    <div className="quantity-toggle">
                      <button
                        onClick={() => upProductCount(item)}
                        disabled={item.count >= 2}
                      >
                        ∧
                      </button>
                      <span className="count-display">{item.count}</span>
                      <button onClick={() => downProductCount(item)}>∨</button>
                    </div>

                    {item.count > 0 && (
                      <span className="items-label">Items</span>
                    )}
                    <button
                      className="remove-btn"
                      onClick={() => removeProduct(item)}
                    >
                      <span className="remove-icon">🗑</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">
              <p>Võ hàng đang trống</p>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="total">
              <span>Tổng số lượng:</span>
              <span style={{fontSize:'1.5rem'}}>{totalCount}</span>
            </div>
            <button className="checkout-btn">Kiểm & Đặt hàng</button>
          </div>
        )}
      </div>
    </>
  );
}
