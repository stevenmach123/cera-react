import { createContext, useContext, useMemo } from "react";
import { Product } from "../types/catalog";
import { ReactNode } from "react";
import { build_sub_cate_product_dict } from "../types/myutil";


interface ProductContext {
    Sub_Cate_Product_dict: Record<string, Record<string, Omit<Product, 'name'>>>;
}

const ProductContext = createContext<ProductContext | null>(null);
export function ProductProvider({ children }: { children: ReactNode }){
    
    const Sub_Cate_Product_dict= useMemo(()=>(build_sub_cate_product_dict()),[])
    const value: ProductContext  = {
        Sub_Cate_Product_dict: Sub_Cate_Product_dict
    }
    return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>)
}
export function useProducts() {
    const context = useContext(ProductContext);
    if (context === null) {
        throw new Error("useProducts must be used within ProductProvider");
    }
    return context;
}