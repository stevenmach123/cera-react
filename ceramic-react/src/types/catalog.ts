export type Feature = 'popular' | 'unique';

export type BigCateName = 'modern_porcelain' | 'modern_desk' | 'modern_seat' | 'traditional_craft' |'modern_accessory';
export type BrandName = 'toto' | 'inax'|'noritake';

export type TotoSubType = 'toto_subtype1' | 'toto_subtype2' | 'toto_subtype3';
export type InaxSubType = 'inax_subtype1' | 'inax_subtype2' | 'inax_subtype3';
export type NoritakeType = 'noritake_subtype1' |'noritake_subtype2'
export type BrandSubTypeName = TotoSubType | InaxSubType |NoritakeType;

export type BranchBrand = ['toto', TotoSubType] | ['inax', InaxSubType] | ['noritake',NoritakeType];

export interface BigCate {
  name: BigCateName;
  displayName: string;des:string
}

export interface SubCate {
  displayName: string;
  name: string;
  surface_show: boolean;
}

export interface SubCateProp {
  name: BigCateName;
  displayName: string;
  sub_cate: SubCate[];
}

export interface Product {
  displayName: string;
  name: string;
  big_cate_name: BigCateName;
  sub_cate_name: string;
  des: string;
  other_features: Feature[];
  branch: BranchBrand;
  img?: string;
}

export interface BrandProduct {
  displayName: string;
  name: string;
  des: string;
  branch_brand: BranchBrand;
  popular: boolean;
  img?: string;
}

export type SubCateProductProp = Record<string, Product[]>;
export type SubCateBrandProductProp = Record<string, BrandProduct[]>;

export interface BrandBigCate {
  name: BrandName;
  displayName: string;
}

export interface BrandSubCateProp {
  displayName: string;
  name: BrandName;
  sub_cate: BrandSubTypeName[];
}

export type RoomSubCate = Partial<Omit<SubCate, 'name'>> & {
  sub_cate_name: string;
  big_cate_name: BigCateName;
};

export type CollectionProduct = { name: string } & Partial<Omit<Product, 'name'>>;

export interface Collection {
  name: string;
  displayName: string;
  product: CollectionProduct[];
}

export interface Room {
  displayName: string;
  name: string;
  des:string
  sub_cate: RoomSubCate[];
  collection?: Collection[];
}