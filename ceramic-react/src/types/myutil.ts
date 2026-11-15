import { SubCate_Brand_Product, Sub_Cate_Product, SubCates } from './data';
import type { BrandName, BrandProduct, Product, Room, SubCate } from './catalog';

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
export function get_popular_products_from_room(room: Room): Product[] {
  const subCateNames = room.sub_cate.map((s) => s.sub_cate_name);
  return Object.entries(Sub_Cate_Product)
    .filter(([subCateName]) => subCateNames.includes(subCateName))
    .flatMap(([, products]) => products.filter((product) => product.other_features.includes('popular')));
}


