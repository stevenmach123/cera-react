import { SubCate_Brand_Product, Sub_Cate_Product, SubCates } from './data';
import type { BrandName, BrandProduct, Product, SubCate } from './catalog';

export function extract_brand_popular_product(brand: BrandName): BrandProduct[] {
  return Object.entries(SubCate_Brand_Product)
    .filter(([subCateName]) => subCateName.includes(brand))
    .flatMap(([, products]) => products.filter((product) => product.popular));
}

export type SubCateProductDict = Record<string, Record<string, Omit<Product, 'name'>>>;

export function build_sub_cate_product_dict(): SubCateProductDict {
  const dict: SubCateProductDict = {};
  for (const [subCateName, products] of Object.entries(Sub_Cate_Product)) {
    dict[subCateName] = Object.fromEntries(
      products.map(({ name, ...props }): [string, Omit<Product, 'name'>] => [name, props])
    );
  }
  return dict;
}