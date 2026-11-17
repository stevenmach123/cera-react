import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigCates, SubCates } from '../../../types/data';
import type { BigCate } from '../../../types/catalog';
import type { Organize } from '../../../types/types';
import './BigCatePage.scss';

const random = () => Math.floor(Math.random() * 5) % 2;

const tones: Record<string, string> = {
  modern_porcelain: '#D9CBB6',
  modern_desk: '#C3B7A6',
  modern_seat: '#B9A893',
  traditional_craft: '#D0B995',
  modern_accessory: '#E8D9C2',
};

function ImageMap({ item }: { item: BigCate }) {
  return (
    <div className="bigcate-image color-img" style={{ backgroundColor: tones[item.name] }}>
      <span className="bigcate-image-label">{item.displayName}</span>
    </div>
  );
}

export default function BigCatePage() {
  const { bigcate } = useParams<{ bigcate: string }>();
  //const [hello,setHello] = useState(0);
  //console.log("bigcate",bigcate)

  

  const bigCate = BigCates.find((cate) => cate.name === bigcate);
  const selectedBigcate = SubCates.find((cate) => cate.name === bigcate);

  const Mapprod = useMemo(() => {
    const result: { items: string[]; org: Organize }[] = [];
    const names = selectedBigcate?.sub_cate.map((sc) => sc.displayName) ?? [];
    let range = 0;
    let mod = 1;
    let index = 0;
    let temp: { items: string[]; org: Organize } = { items: [], org: 'two' };

    for (const v of names) {
      if (!(range % (mod + 1))) {
        mod = random() ? 3 : 2;
        range = 1;
        result.push(temp);
        temp = { items: [], org: mod == 2 ? 'two' : 'three' };
      }
      if (range % (mod + 1)) {
        temp.items.push(v);
      }
      if (index == names.length - 1) {
        result.push(temp);
      }
      range++;
      index++;
    }
    return result.slice(1);
  }, [selectedBigcate]);

  if (!bigCate) return null;

  return (
    <section className="bigcate-page">
      <div className="bigcate-hero">
        <div className="bigcate-hero-left">
          <ImageMap item={bigCate} />
        </div>
        <div className="bigcate-hero-right">
          <h2 className="bigcate-title">{bigCate.displayName}</h2>
          <p className="bigcate-des">{bigCate.des}</p>
        </div>
      </div>

      <div className="bigcate-body">
        {Mapprod.map((item, index) => (
          <div key={index} className={item.org == 'three' ? 'bigcate-temp3' : 'bigcate-temp2'}>
            {item.items.map((name, idx) => (
              <div key={idx} className="sub-cate-item bigcate-wide">
                <span>{name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}