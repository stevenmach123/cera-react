export interface FilterItem {
  id: number;
  label: string;
  checked: boolean;
  count?: number;
}

export interface FilterSlide {
  id: string;
  title: string;
  unit: string;
  step: number;
  minGap: number;
  fix_min: number;
  fix_max: number;
  min: number;
  max: number;
}

export interface FilterRangeValue {
  min: number;
  max: number;
}


export interface CartItem {
  name: string;
  count: number;
  img: string;
}

export interface ProductItem {
  name: string;
  des: string[];
  img: string;
}




//intro
export type Organize = "two"|"three"

//popular content
export interface PopularItem {
  label: string;
  img: string;
  des:string[]
}

export interface PopularGroup {
  title: string;
  items: PopularItem[];
}

// Copy the real `groups` array from popular-content.component.ts verbatim.
export const groups: PopularGroup[] = [
  {
    title: 'Group 1',
    items: [
      { label: 'Item 1',des:["sss","sss"], img: '#E8D9C2' },
      { label: 'Item 2',des:["sss","sss"], img: '#D0B995' },
      { label: 'Item 3',des:["sss","sss"] ,img: '#F0D9B5' },
    ],
  },
  {
    title: 'Group 2',
    items: [
      { label: 'Item 4',des:["sss","sss"] ,img: '#E8D9C2' },
      { label: 'Item 5',des:["sss","sss"] ,img: '#D0B995' },
      { label: 'Item 6',des:["sss","sss"] ,img: '#F0D9B5' },
    ],
  },
];