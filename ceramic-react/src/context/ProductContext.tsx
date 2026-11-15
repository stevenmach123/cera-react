import { createContext, useContext, useMemo } from "react";
import { Product } from "../types/catalog";
import { ReactNode } from "react";
import { build_sub_cate_product_dict } from "../types/myutil";
import { BigCates, SubCates } from "../types/data";


interface ProductContext {
    Sub_Cate_Product_dict: Record<string, Record<string, Omit<Product, 'name'>>>;
    Sub_Cate_Product_Entries: [string, Record<string, Omit<Product, "name">>][];
    checkSub_Cate_ProductExist: (product_name: string) => Omit<Product, "name"> | undefined;
    subCate_DisplayName: (item: Partial<{ sub_cate_name: string }>) => string;
    bigCate_DisplayName: (item: Partial<{ big_cate_name: string }>) => string;
}

const ProductContext = createContext<ProductContext | null>(null);
export function ProductProvider({ children }: { children: ReactNode }) {

    const Sub_Cate_Product_dict = useMemo(() => build_sub_cate_product_dict(), []);
    const Sub_Cate_Product_Entries = useMemo(() => Object.entries(Sub_Cate_Product_dict), [Sub_Cate_Product_dict]);
    const checkSub_Cate_ProductExist = (product_name: string) => {
        const product = Sub_Cate_Product_Entries.find(([, obj]) => obj[product_name]);
        return product ? product[1][product_name] : undefined;
    };
    const bigCate_DisplayName = (item: Partial<{ big_cate_name: string }>) => {
        return (item && BigCates.find((i) => i.name === item?.big_cate_name)?.displayName) ?? "";
    };
    const subCate_DisplayName = (item: Partial<{ sub_cate_name: string }>) => {
        return (item && SubCates.flatMap((cate) => cate?.sub_cate).find((i) => i.name === item?.sub_cate_name)?.displayName) ?? "";
    };
    const value: ProductContext = {
        Sub_Cate_Product_dict,
        Sub_Cate_Product_Entries,
        checkSub_Cate_ProductExist,
        subCate_DisplayName,
        bigCate_DisplayName,
    };
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>);
}
export function useProducts() {
    const context = useContext(ProductContext);
    if (context === null) {
        throw new Error("useProducts must be used within ProductProvider");
    }
    return context;
}
