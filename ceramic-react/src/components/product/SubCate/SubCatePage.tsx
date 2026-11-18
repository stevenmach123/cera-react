import { useParams } from 'react-router-dom';
import { BigCates, SubCates } from '../../../types/data';
import type { BigCate, SubCate } from '../../../types/catalog';
import './SubCatePage.scss';

const tones: Record<string, string> = {
  modern_porcelain: '#D9CBB6',
  modern_desk: '#C3B7A6',
  modern_seat: '#B9A893',
  traditional_craft: '#D0B995',
  modern_accessory: '#E8D9C2',
};

function ImageMap({ item }: { item: BigCate }) {
  return (
    <div className="subcate-image" style={{ backgroundColor: tones[item.name] }}>
      <span className="subcate-image-label">{item.displayName}</span>
    </div>
  );
}

export default function SubCatePage() {
  const { bigcate } = useParams<{ bigcate: string }>();

  const subCate: SubCate | undefined = SubCates.flatMap((i) => i.sub_cate).find((sc) => sc.name === bigcate);
  const parent = SubCates.find((i) => i.sub_cate.some((sc) => sc.name === bigcate));
  const bigCate = BigCates.find((c) => c.name === parent?.name);

  if (!subCate || !bigCate) return null;

  return (
    <section className="subcate-page">
      <div className="subcate-hero">
        <div className="subcate-hero-left">
          <ImageMap item={bigCate} />
        </div>
        <div className="subcate-hero-right">
          <h2 className="subcate-title">{subCate.displayName}</h2>
          <p className="subcate-des">{bigCate.des}</p>
        </div>
      </div>

      <div className="subcate-toc">
        <h3 className="subcate-toc-title">Sản Phẩm</h3>
      </div>
    </section>
  );
}
