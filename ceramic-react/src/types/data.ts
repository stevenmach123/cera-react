import { ProductItem } from './types';
import type {
  BigCate,
  BrandBigCate,
  BrandSubCateProp,
  Room,
  SubCateBrandProductProp,
  SubCateProductProp,
  SubCateProp,
} from './catalog';


export const products: ProductItem[] = [
  { name: 'Bộ Đĩa Gốm Thanh Lịch', des:['Gốm Sứ','Vâng mờ'], img: '#E8D9C2' },
  { name: 'Bình Gốm Cổ Điển', des: ['Gốm sứ','Trơn'], img: '#D0B995' },
  { name: 'Chén Gốm Thủ Công', des: ['Viền','Vâng xanh'], img: '#F0D9B5' },
  { name: 'Ấm Trà Gốm', des:['Trà xanh'], img: '#E8D9C2' },
  { name: 'Đĩa Trang Trí', des:['Gốm sứ','Trơn'], img: '#D0B995' },
  { name: 'Ly Gốm Men Xanh', des:['Ly gốm','Vâng xanh'], img: '#F0D9B5' },
];



export const Cates =["J","F","K","L","F","M","Q","F","A"]

export type PopCateKey = 'hotsale' | 'quality' | 'foreign';

export interface PopCateEntry {
  intro: { title: string; subtitle?: string };
  // add any other fields present in src/app/service/data/popdata.ts
}
export const popcate:Record<PopCateKey,any> = {
  hotsale: { intro: { title: 'Bán Chạy' } },
  quality: { intro: { title: 'Hàng Chất Lượng' } },
  foreign: { intro: { title: 'Hàng Nhập Khẩu' } },
};








// ─── BigCates (Vietnamese displayName) ───
export const BigCates: BigCate[] = [
  { name: 'modern_porcelain', displayName: 'Sứ Hiện Đại', des: 'Các sản phẩm sứ hiện đại với thiết kế tinh tế, kiểu dáng thanh lịch và tính thẩm mỹ cao.'},
  { name: 'modern_desk', displayName: 'Bàn Trà Hiện Đại', des: 'Bàn trà với kiểu dáng hiện đại, đường nét tối giản, mang đến vẻ đẹp sang trọng cho không gian sống.' },
  { name: 'modern_seat', displayName: 'Ghế Ngồi Hiện Đại',des: 'Bộ sưu tập ghế ngồi với thiết kế tiện nghi, kiểu dáng độc đáo và chất liệu đa dạng.' },
  { name: 'traditional_craft', displayName: 'Gốm Truyền Thống',des:'Các sản phẩm gốm thủ công mang đậm nét văn hóa truyền thống, thể hiện sự tinh xảo trong từng đường nét.' },
  { name: 'modern_accessory', displayName: 'Phụ Kiện Hiện Đại',des:'Những món phụ kiện trang trí hiện đại, tạo điểm nhấn tinh tế và hoàn thiện vẻ đẹp cho không gian nội thất.' },
];

// ─── SubCates (Vietnamese displayName) ───
export const SubCates: SubCateProp[] = [
  {
    name: 'modern_porcelain',
    displayName: 'Sứ Hiện Đại',
    sub_cate: [
      { displayName: 'Bát Đĩa Bếp', name: 'kitchen_porcelain', surface_show: true },
      { displayName: 'Men Mềm', name: 'soft_paste', surface_show: false },
      { displayName: 'Bình Hoa Sứ', name: 'porcelain_vase', surface_show: true },
      { displayName: 'Chén Trà Sứ', name: 'tea_cup', surface_show: true },
    ],
  },
  {
    name: 'modern_desk',
    displayName: 'Bàn Trà Hiện Đại',
    sub_cate: [
      { displayName: 'Khay Bàn', name: 'kitchen_desk', surface_show: true },
      { displayName: 'Đĩa Trang Trí Bàn', name: 'desk_decor', surface_show: false },
    ],
  },
  {
    name: 'modern_seat',
    displayName: 'Ghế Ngồi Hiện Đại',
    sub_cate: [
      { displayName: 'Ghế Đơn', name: 'sectional_sofa', surface_show: true },
      { displayName: 'Ghế Quầy', name: 'bar_stool', surface_show: false },
      { displayName: 'Ghế Ngồi Sân Vườn', name: 'garden_seat', surface_show: true },
    ],
  },
  {
    name: 'traditional_craft',
    displayName: 'Gốm Truyền Thống',
    sub_cate: [
      { displayName: 'Bát Trà Truyền Thống', name: 'traditional_bowl', surface_show: true },
      { displayName: 'Nồi Đất Nung', name: 'earthenware_pot', surface_show: false },
      { displayName: 'Hũ Gốm Lưu Trữ', name: 'ceramic_jar', surface_show: true },
    ],
  },
  {
    name: 'modern_accessory',
    displayName: 'Phụ Kiện Hiện Đại',
    sub_cate: [
      { displayName: 'Hoa Văn Trang Trí', name: 'decorative_tile', surface_show: true },
      { displayName: 'Móc Treo Gốm', name: 'ceramic_hook', surface_show: false },
    ],
  },
];

// ─── Products grouped by sub-general-categories (Sub_Cate_Product) ───
export const Sub_Cate_Product: SubCateProductProp = {
  // modern_porcelain sub-categories
  kitchen_porcelain: [
    {
      displayName: 'Bộ Đĩa Gốm Bếp',
      name: 'a1_item1',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'kitchen_porcelain',
      des: 'Gốm sứ men trắng, bộ 6 món',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype1'],
      img: '#E8D9C2',
    },
    {
      displayName: 'Chén Gốm Bếp',
      name: 'a1_item2',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'kitchen_porcelain',
      des: 'Men xanh truyền thống',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype1'],
      img: '#F0D9B5',
    },
    {
      displayName: 'Đĩa Tráng Miệng Sứ',
      name: 'a1_item3',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'kitchen_porcelain',
      des: 'Đĩa tráng miệng men hoa văn vàng',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype2'],
      img: '#D0B995',
    },
  ],
  soft_paste: [
    {
      displayName: 'Ấm Trà Men Mềm',
      name: 'a1_item4',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'soft_paste',
      des: 'Men mềm mịn, giữ nhiệt tốt',
      other_features: ['unique'],
      branch: ['toto', 'toto_subtype2'],
      img: '#D0B995',
    },
    {
      displayName: 'Ly Trà Sứ Thạch Anh',
      name: 'a1_item5',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'soft_paste',
      des: 'Ly trà trong suốt, men phủ nhũ',
      other_features: ['popular'],
      branch: ['inax', 'inax_subtype2'],
      img: '#E8D9C2',
    },
  ],
  porcelain_vase: [
    {
      displayName: 'Bình Gốm Cổ Điển',
      name: 'a1_item6',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'porcelain_vase',
      des: 'Hoa văn khắc tay phong cách cổ điển',
      other_features: ['popular'],
      branch: ['inax', 'inax_subtype2'],
      img: '#E8D9C2',
    },
    {
      displayName: 'Bình Hoa Sứ Trắng',
      name: 'a1_item7',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'porcelain_vase',
      des: 'Bình hoa thuần khiết, men trắng ngọc',
      other_features: ['unique'],
      branch: ['toto', 'toto_subtype1'],
      img: '#F0D9B5',
    },
  ],
  tea_cup: [
    {
      displayName: 'Chén Trà Sứ Đỏ',
      name: 'a1_item8',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'tea_cup',
      des: 'Chén trà men đỏ truyền thống',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype1'],
      img: '#D0B995',
    },
    {
      displayName: 'Chén Trà Sứ Xanh Lá',
      name: 'a1_item9',
      big_cate_name: 'modern_porcelain',
      sub_cate_name: 'tea_cup',
      des: 'Chén trà men xanh lá, đường kính 8cm',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype1'],
      img: '#E8D9C2',
    },
  ],

  // modern_desk sub-categories
  kitchen_desk: [
    {
      displayName: 'Khay Gốm Bàn',
      name: 'a2_item1',
      big_cate_name: 'modern_desk',
      sub_cate_name: 'kitchen_desk',
      des: 'Khay tròn đường kính 30cm',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype1'],
      img: '#F0D9B5',
    },
    {
      displayName: 'Khay Đựng Bàn Hình Chữ Nhật',
      name: 'a2_item2',
      big_cate_name: 'modern_desk',
      sub_cate_name: 'kitchen_desk',
      des: 'Khay hình chữ nhật, men kem',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype2'],
      img: '#D0B995',
    },
  ],
  desk_decor: [
    {
      displayName: 'Tượng Gốm Bàn',
      name: 'a2_item3',
      big_cate_name: 'modern_desk',
      sub_cate_name: 'desk_decor',
      des: 'Tượng nghệ thuật trang trí bàn làm việc',
      other_features: ['unique'],
      branch: ['toto', 'toto_subtype2'],
      img: '#E8D9C2',
    },
  ],

  // modern_seat sub-categories
  sectional_sofa: [
    {
      displayName: 'Ghế Đơn Gốm',
      name: 'a3_item1',
      big_cate_name: 'modern_seat',
      sub_cate_name: 'sectional_sofa',
      des: 'Khung gốm sứ bền, đệm mềm',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype1'],
      img: '#D0B995',
    },
  ],
  bar_stool: [
    {
      displayName: 'Ghế Quầy Gốm',
      name: 'a3_item2',
      big_cate_name: 'modern_seat',
      sub_cate_name: 'bar_stool',
      des: 'Chiều cao 75cm, men bóng',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype2'],
      img: '#E8D9C2',
    },
  ],
  garden_seat: [
    {
      displayName: 'Ghế Sân Vườn Gốm',
      name: 'a3_item3',
      big_cate_name: 'modern_seat',
      sub_cate_name: 'garden_seat',
      des: 'Ghế ngoài trời, khung sắt sơn men',
      other_features: ['popular'],
      branch: ['inax', 'inax_subtype2'],
      img: '#F0D9B5',
    },
    {
      displayName: 'Băng Ghế Sân Vườn',
      name: 'a3_item4',
      big_cate_name: 'modern_seat',
      sub_cate_name: 'garden_seat',
      des: 'Băng ghế 3 chỗ, sơn men pastel',
      other_features: ['unique'],
      branch: ['toto', 'toto_subtype1'],
      img: '#D0B995',
    },
  ],

  // traditional_craft sub-categories
  traditional_bowl: [
    {
      displayName: 'Bát Trà Gốm Đỏ',
      name: 'a4_item1',
      big_cate_name: 'traditional_craft',
      sub_cate_name: 'traditional_bowl',
      des: 'Bát trà men đỏ kiểu truyền thống',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype1'],
      img: '#E8D9C2',
    },
    {
      displayName: 'Bát Trà Gốm Xanh',
      name: 'a4_item2',
      big_cate_name: 'traditional_craft',
      sub_cate_name: 'traditional_bowl',
      des: 'Bát trà men xanh cobalt',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype1'],
      img: '#F0D9B5',
    },
  ],
  earthenware_pot: [
    {
      displayName: 'Nồi Đất Nung Nấu Canh',
      name: 'a4_item3',
      big_cate_name: 'traditional_craft',
      sub_cate_name: 'earthenware_pot',
      des: 'Nồi đất nung, giữ nhiệt tốt',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype2'],
      img: '#D0B995',
    },
  ],
  ceramic_jar: [
    {
      displayName: 'Hũ Gốm Lưu Trữ',
      name: 'a4_item4',
      big_cate_name: 'traditional_craft',
      sub_cate_name: 'ceramic_jar',
      des: 'Hũ gốm đựng gia vị, nắp đậy kín',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype2'],
      img: '#E8D9C2',
    },
  ],

  // modern_accessory sub-categories
  decorative_tile: [
    {
      displayName: 'Gạch Trang Trí Hoa Văn',
      name: 'a5_item1',
      big_cate_name: 'modern_accessory',
      sub_cate_name: 'decorative_tile',
      des: 'Gạch men hoa văn hình học',
      other_features: ['popular'],
      branch: ['toto', 'toto_subtype1'],
      img: '#F0D9B5',
    },
    {
      displayName: 'Gạch Trang Trí Sọc',
      name: 'a5_item2',
      big_cate_name: 'modern_accessory',
      sub_cate_name: 'decorative_tile',
      des: 'Gạch men sọc xanh trắng',
      other_features: ['unique'],
      branch: ['inax', 'inax_subtype1'],
      img: '#D0B995',
    },
  ],
  ceramic_hook: [
    {
      displayName: 'Móc Treo Gốm Nghệ Thuật',
      name: 'a5_item3',
      big_cate_name: 'modern_accessory',
      sub_cate_name: 'ceramic_hook',
      des: 'Móc treo gốm sứ, thiết kế tối giản',
      other_features: ['unique'],
      branch: ['toto', 'toto_subtype2'],
      img: '#E8D9C2',
    },
  ],
};

// ─── BrandBigCates (Vietnamese displayName) ───
export const BrandBigCates: BrandBigCate[] = [
  { name: 'toto', displayName: 'Toto' },
  { name: 'inax', displayName: 'Inax' },
  { name: 'noritake', displayName: 'Noritake' },
];

// ─── BrandSubCates (Vietnamese displayName) ───
export const BrandSubCates: BrandSubCateProp[] = [
  { displayName: 'Toto', name: 'toto', sub_cate: ['toto_subtype1', 'toto_subtype2', 'toto_subtype3'] },
  { displayName: 'Inax', name: 'inax', sub_cate: ['inax_subtype1', 'inax_subtype2', 'inax_subtype3'] },
  { displayName: 'Noritake', name: 'noritake', sub_cate: ['noritake_subtype1', 'noritake_subtype2'] },
];

// ─── Products grouped by sub-brand-categories (SubCate_Brand_Product) ───
export const SubCate_Brand_Product: SubCateBrandProductProp = {
  // toto subtypes
  toto_subtype1: [
    {
      displayName: 'Bồn rửa Toto',
      name: 'a1_item2',
      des: 'Bồn rửa bếp gốm sứ',
      branch_brand: ['toto', 'toto_subtype1'],
      popular: true,
      img: '#D0B995',
    },
    {
      displayName: 'Chậu Rửa Toto',
      name: 'b1_item2',
      des: 'Chậu rửa mặt men trắng',
      branch_brand: ['toto', 'toto_subtype1'],
      popular: false,
      img: '#F0D9B5',
    },
    {
      displayName: 'Bồn Cầu Toto Premium',
      name: 'b1_item3',
      des: 'Bồn cầu một khối, công nghệ tự động',
      branch_brand: ['toto', 'toto_subtype1'],
      popular: true,
      img: '#E8D9C2',
    },
  ],
  toto_subtype2: [
    {
      displayName: 'Bình Vệ Sinh Toto',
      name: 'b2_item1',
      des: 'Thiết kế tiết kiệm nước',
      branch_brand: ['toto', 'toto_subtype2'],
      popular: true,
      img: '#E8D9C2',
    },
    {
      displayName: 'Vòi Sen Toto',
      name: 'b2_item2',
      des: 'Vòi sen mạ chrome, chống rỉ',
      branch_brand: ['toto', 'toto_subtype2'],
      popular: false,
      img: '#D0B995',
    },
  ],
  toto_subtype3: [
    {
      displayName: 'Bồn Chậu Toto Neo',
      name: 'b3_item1',
      des: 'Bồn chậu lavabo kiểu hiện đại',
      branch_brand: ['toto', 'toto_subtype3'],
      popular: true,
      img: '#F0D9B5',
    },
    {
      displayName: 'Sàn Gạch Toto',
      name: 'b3_item2',
      des: 'Sàn gạch men chống trơn',
      branch_brand: ['toto', 'toto_subtype3'],
      popular: false,
      img: '#E8D9C2',
    },
  ],

  // inax subtypes
  inax_subtype1: [
    {
      displayName: 'Vòi Gốm Inax',
      name: 'c1_item1',
      des: 'Vòi nước gốm sứ cao cấp',
      branch_brand: ['inax', 'inax_subtype1'],
      popular: true,
      img: '#F0D9B5',
    },
    {
      displayName: 'Sen Tắm Inax',
      name: 'c1_item2',
      des: 'Sen tắm mạ vàng, tiết kiệm nước',
      branch_brand: ['inax', 'inax_subtype1'],
      popular: false,
      img: '#D0B995',
    },
  ],
  inax_subtype2: [
    {
      displayName: 'Gạch Gốm Inax',
      name: 'c2_item1',
      des: 'Gạch lát nền chống trơn',
      branch_brand: ['inax', 'inax_subtype2'],
      popular: false,
      img: '#D0B995',
    },
    {
      displayName: 'Ống Gốm Inax',
      name: 'c2_item2',
      des: 'Ống thoát nước gốm sứ',
      branch_brand: ['inax', 'inax_subtype2'],
      popular: true,
      img: '#E8D9C2',
    },
  ],
  inax_subtype3: [
    {
      displayName: 'Bồn Cầu Inax',
      name: 'c3_item1',
      des: 'Bồn cầu treo tường Inax',
      branch_brand: ['inax', 'inax_subtype3'],
      popular: true,
      img: '#F0D9B5',
    },
  ],

  // noritake subtypes (creative — products not in Sub_Cate_Product, purely brand-grouped)
  noritake_subtype1: [
    {
      displayName: 'Bộ Bát Noritake',
      name: 'd1_item1',
      des: 'Bộ bát đĩa sứ trắng tinh khiết',
      branch_brand: ['noritake', 'noritake_subtype1'],
      popular: true,
      img: '#E8D9C2',
    },
    {
      
      displayName: 'Chén Trà Noritake',
      name: 'd1_item2',
      des: 'Chén trà sứ mỏng, truyền thống',
      branch_brand: ['noritake', 'noritake_subtype1'],
      popular: false,
      img: '#F0D9B5',
    },
  ],
  noritake_subtype2: [
    {
      displayName: 'Bình Hoa Noritake',
      name: 'd2_item1',
      des: 'Bình hoa sứ thủ công',
      branch_brand: ['noritake', 'noritake_subtype2'],
      popular: true,
      img: '#D0B995',
    },
  ],
};

// ─── Rooms (Vietnamese displayName, sub_cate from SubCates, collection from Sub_Cate_Product) ───
export const rooms: Room[] = [
  {
    displayName: 'Phòng Ăn',
    name: 'dinning',
    des: 'Bộ sưu tập gốm sứ hoàn chỉnh cho phòng ăn, từ bát đĩa bếp đến chén trà.',
    sub_cate: [
      {
        displayName: 'Bát Đĩa Bếp',
        sub_cate_name: 'kitchen_porcelain',
        big_cate_name: 'modern_porcelain',
      },
      {
        displayName: 'Khay Bàn',
        sub_cate_name: 'kitchen_desk',
        big_cate_name: 'modern_desk',
      },
      {
        displayName: 'Chén Trà Sứ',
        sub_cate_name: 'tea_cup',
        big_cate_name: 'modern_porcelain',
      },
    ],
    collection: [
      {
        name: 'dining_set_v1',
        displayName: 'Bộ Bữa Ăn Hiện Đại',
        product: [
          {
            name: 'a1_item1',
            displayName: 'Bộ Đĩa Gốm Bếp',
            sub_cate_name: 'kitchen_porcelain',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a2_item1',
            displayName: 'Khay Gốm Bàn',
            sub_cate_name: 'kitchen_desk',
            big_cate_name: 'modern_desk',
          },
          {
            name: 'a1_item8',
            displayName: 'Chén Trà Sứ Đỏ',
            sub_cate_name: 'tea_cup',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a1_item3',
            displayName: 'Đĩa Tráng Miệng Sứ',
            sub_cate_name: 'kitchen_porcelain',
            big_cate_name: 'modern_porcelain',
          },
        ],
      },
      {
        name: 'dining_set_v2',
        displayName: 'Bữa Ăn Truyền Thống',
        product: [
          {
            name: 'a4_item1',
            displayName: 'Bát Trà Gốm Đỏ',
            sub_cate_name: 'traditional_bowl',
            big_cate_name: 'traditional_craft',
          },
          {
            name: 'a1_item8',
            displayName: 'Chén Trà Sứ Đỏ',
            sub_cate_name: 'tea_cup',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a4_item2',
            displayName: 'Bát Trà Gốm Xanh',
            sub_cate_name: 'traditional_bowl',
            big_cate_name: 'traditional_craft',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Phòng Khách',
    name: 'living',
    des: 'Trang trí phòng khách với bình hoa sứ, gạch hoa văn và ghế ngồi gốm.',
    sub_cate: [
      {
        displayName: 'Ghế Đơn',
        sub_cate_name: 'sectional_sofa',
        big_cate_name: 'modern_seat',
      },
      {
        displayName: 'Bình Hoa Sứ',
        sub_cate_name: 'porcelain_vase',
        big_cate_name: 'modern_porcelain',
      },
      {
        displayName: 'Hoa Văn Trang Trí',
        sub_cate_name: 'decorative_tile',
        big_cate_name: 'modern_accessory',
      },
    ],
    collection: [
      {
        name: 'living_set_v1',
        displayName: 'Bộ Trang Trí Phòng Khách',
        product: [
          {
            name: 'a1_item6',
            displayName: 'Bình Gốm Cổ Điển',
            sub_cate_name: 'porcelain_vase',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a1_item7',
            displayName: 'Bình Hoa Sứ Trắng',
            sub_cate_name: 'porcelain_vase',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a5_item1',
            displayName: 'Gạch Trang Trí Hoa Văn',
            sub_cate_name: 'decorative_tile',
            big_cate_name: 'modern_accessory',
          },
          {
            name: 'a3_item1',
            displayName: 'Ghế Đơn Gốm',
            sub_cate_name: 'sectional_sofa',
            big_cate_name: 'modern_seat',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Phòng Bếp',
    name: 'kitchen',
    des: 'Gốm sứ nhà bếp từ hiện đại đến truyền thống, bao gồm nồi đất và bộ bát đĩa.',
    sub_cate: [
      {
        displayName: 'Bát Đĩa Bếp',
        sub_cate_name: 'kitchen_porcelain',
        big_cate_name: 'modern_porcelain',
      },
      {
        displayName: 'Khay Bàn',
        sub_cate_name: 'kitchen_desk',
        big_cate_name: 'modern_desk',
      },
      {
        displayName: 'Nồi Đất Nung',
        sub_cate_name: 'earthenware_pot',
        big_cate_name: 'traditional_craft',
      },
    ],
    collection: [
      {
        name: 'kitchen_set_v1',
        displayName: 'Bộ Bếp Hiện Đại',
        product: [
          {
            name: 'a1_item1',
            displayName: 'Bộ Đĩa Gốm Bếp',
            sub_cate_name: 'kitchen_porcelain',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a2_item1',
            displayName: 'Khay Gốm Bàn',
            sub_cate_name: 'kitchen_desk',
            big_cate_name: 'modern_desk',
          },
          {
            name: 'a1_item2',
            displayName: 'Chén Gốm Bếp',
            sub_cate_name: 'kitchen_porcelain',
            big_cate_name: 'modern_porcelain',
          },
        ],
      },
      {
        name: 'kitchen_set_v2',
        displayName: 'Bộ Nấu ăn Truyền Thống',
        product: [
          {
            name: 'a4_item3',
            displayName: 'Nồi Đất Nung Nấu Canh',
            sub_cate_name: 'earthenware_pot',
            big_cate_name: 'traditional_craft',
          },
          {
            name: 'a4_item4',
            displayName: 'Hũ Gốm Lưu Trữ',
            sub_cate_name: 'ceramic_jar',
            big_cate_name: 'traditional_craft',
          },
          {
            name: 'a1_item2',
            displayName: 'Chén Gốm Bếp',
            sub_cate_name: 'kitchen_porcelain',
            big_cate_name: 'modern_porcelain',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Sân Vườn',
    name: 'garden',
    des: 'Sản phẩm gốm sứ cho không gian ngoài trời, từ ghế sân vườn đến móc treo trang trí.',
    sub_cate: [
      {
        displayName: 'Ghế Ngồi Sân Vườn',
        sub_cate_name: 'garden_seat',
        big_cate_name: 'modern_seat',
      },
      {
        displayName: 'Móc Treo Gốm',
        sub_cate_name: 'ceramic_hook',
        big_cate_name: 'modern_accessory',
      },
    ],
    collection: [
      {
        name: 'garden_set_v1',
        displayName: 'Bộ Sân Vườn',
        product: [
          {
            name: 'a3_item3',
            displayName: 'Ghế Sân Vườn Gốm',
            sub_cate_name: 'garden_seat',
            big_cate_name: 'modern_seat',
          },
          {
            name: 'a3_item4',
            displayName: 'Băng Ghế Sân Vườn',
            sub_cate_name: 'garden_seat',
            big_cate_name: 'modern_seat',
          },
          {
            name: 'a5_item3',
            displayName: 'Móc Treo Gốm Nghệ Thuật',
            sub_cate_name: 'ceramic_hook',
            big_cate_name: 'modern_accessory',
          },
          {
            name: 'a5_item2',
            displayName: 'Gạch Trang Trí Sọc',
            sub_cate_name: 'decorative_tile',
            big_cate_name: 'modern_accessory',
          },
        ],
      },
    ],
  },
  {
    displayName: 'Phòng Trưng Bày',
    name: 'showroom',
    des: 'Bộ sưu tập trưng bày gốm sứ cao cấp với bình hoa, tượng nghệ thuật và gạch trang trí.',
    sub_cate: [
      {
        displayName: 'Bình Hoa Sứ',
        sub_cate_name: 'porcelain_vase',
        big_cate_name: 'modern_porcelain',
      },
      {
        displayName: 'Tượng Gốm Bàn',
        sub_cate_name: 'desk_decor',
        big_cate_name: 'modern_desk',
      },
      {
        displayName: 'Hoa Văn Trang Trí',
        sub_cate_name: 'decorative_tile',
        big_cate_name: 'modern_accessory',
      },
    ],
    collection: [
      {
        name: 'showroom_set_v1',
        displayName: 'Bộ Trang Trí Trưng Bày',
        product: [
          {
            name: 'a1_item6',
            displayName: 'Bình Gốm Cổ Điển',
            sub_cate_name: 'porcelain_vase',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a2_item3',
            displayName: 'Tượng Gốm Bàn',
            sub_cate_name: 'desk_decor',
            big_cate_name: 'modern_desk',
          },
          {
            name: 'a5_item1',
            displayName: 'Gạch Trang Trí Hoa Văn',
            sub_cate_name: 'decorative_tile',
            big_cate_name: 'modern_accessory',
          },
          {
            name: 'a1_item7',
            displayName: 'Bình Hoa Sứ Trắng',
            sub_cate_name: 'porcelain_vase',
            big_cate_name: 'modern_porcelain',
          },
          {
            name: 'a5_item2',
            displayName: 'Gạch Trang Trí Sọc',
            sub_cate_name: 'decorative_tile',
            big_cate_name: 'modern_accessory',
          },
        ],
      },
    ],
  },
];
