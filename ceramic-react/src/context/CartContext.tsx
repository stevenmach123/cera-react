import { useState,useMemo, createContext, ReactNode, useContext } from 'react';
import {CartItem} from '../types/types'

const cartItems:CartItem[] = [] 


interface CartContextValue {
  cartItems: CartItem[];
  totalCount: number;
  addProduct: (item: Omit<CartItem, 'count'>) => void;
  upProductCount: (item: CartItem) => void;
  downProductCount: (item: CartItem) => void;
  removeProduct: (item: CartItem) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
    const [CartItems,setCartItems] = useState<CartItem[]>(cartItems); 
    const [isCartOpen, setCartOpen] = useState(false);
    const upProductCount = (item:CartItem)=>{
        setCartItems(items=>items.map((i) =>
            i.name === item.name ? { ...i, count: Math.min(i.count + 1, 2) }
            : i))
    }
    const downProductCount=(item:CartItem)=>{
        const target = CartItems.find((i) => i.name === item.name);
        if(!target) return 
        if (item.count > 1) {
            setCartItems(items =>items.map((i) =>
            i.name === item.name ? { ...i, count: i.count - 1 } : i
            ))
        }
        else
            removeProduct(item)
    }
    const removeProduct =(item:CartItem)=>{
        setCartItems(items=>items.filter(i=>i.name !==item.name))   
    }   
    const addProduct =(item:Omit<CartItem,'count'>)=>{
        const tar_item = CartItems.find(i=>i.name === item.name)
        if(tar_item){
            upProductCount(tar_item)
        }else{
            setCartItems(items=>[...items,{...item,count:1}])
        }
    }
    const openCart = () => setCartOpen(true)
    const closeCart = () => setCartOpen(false)
    const totalCount = useMemo(
        () => CartItems.reduce((sum, i) => sum + i.count, 0),
        [CartItems]
    );
    const value: CartContextValue = {
        cartItems: CartItems,
        totalCount,
        addProduct,
        upProductCount,
        downProductCount,
        removeProduct,
        isCartOpen,
        openCart,
        closeCart,
        setCartOpen,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() {
    const ctx = useContext(CartContext);
    if (ctx === undefined) throw Error('useCart must be used within CartProvider');
    return ctx
}