import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Intro.scss';
import { Cates } from '../../types/data';
import { Organize } from '../../types/types';
import SearchRoom from './SearchRoom';
import SearchBrand from './SearchBrand';
import PopularContent from './PopularContent';
import ValueTabs from './ValueTabs';
import HeroSlider from './HeroSlider';
import ContactSection from './ContactSection';

interface Faq {
  question: string;
  answer: string;
  open: boolean;
}

const initialFaqs: Faq[] = [
  {
    question: 'Sản phẩm gốm sứ được làm như thế nào?',
    answer:
      'Mỗi sản phẩm đều được chế tác thủ công bằng kỹ thuật truyền thống, nung ở nhiệt độ cao để đảm bảo độ bền và vẻ đẹp tự nhiên.',
    open: false,
  },
  {
    question: 'Gốm sứ có an toàn cho sức khỏe không?',
    answer:
      'Có, sản phẩm được làm từ nguyên liệu tự nhiên với lớp men an toàn, không chứa chì hay hóa chất độc hại, phù hợp để sử dụng hàng ngày.',
    open: false,
  },
  {
    question: 'Làm thế nào để bảo quản sản phẩm gốm sứ?',
    answer:
      'Bạn nên rửa nhẹ bằng nước ấm và khăn mềm, tránh va đập cũng như thay đổi nhiệt độ đột ngột để sản phẩm luôn bền đẹp theo thời gian.',
    open: false,
  },
];

export default function Intro() {
  // Angular initialized activeTab to 'hot-sale', which matches none of the tab keys.
  // Kept verbatim for parity; change to 'hotsale' to make the first tab active on load.
  const [activeTab, setActiveTab] = useState('hot-sale');
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);
  const random=()=>{
    const val = Math.floor(Math.random() * 5);
    return val%2
  }
  const Mapprod = useMemo(()=>{
    const result:{items:string[],org:Organize}[]=[]
    let range= 0
    let mod = 1;let index=0
    let temp:{items:string[],org:Organize} 
    

    for(const v of Cates){   
        if(!(range%(mod+1)) ){
            mod = random() ?3 :2
            range=1
            result.push(temp)
            temp={items:[],org:mod==2?"two":"three"}
        }
        if(range%(mod+1)){
            temp.items.push(v)
        }
        if(index==Cates.length-1){
            result.push(temp)
        }
        range++
        index++      
    }
    return result.slice(1)
  },[])

  const toggleFaq = (index: number) => {
    faqs[index].open  = !faqs[index].open
    setFaqs([...faqs]);
  };

  return (
    <section className="intro-page">

      <section>{
        Mapprod.map((item,index)=>
            <div key={index} className={item.org=="three"?"temp3":"temp2"}>{
                item.items.map((i,idx)=>
                    <div style={{border:'1px solid blue'}} key={idx}>{i}</div>
                )
            }</div>    
        ) 
      }
      </section>  
       <HeroSlider />
      <SearchRoom />
      <PopularContent />
      <SearchBrand/>
    
      <ValueTabs></ValueTabs>


      {/* Category Tabs */}
      {/* <div className="category-tabs">
        {tabs.map((tab) => (
          <span
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </span>
        ))}
      </div> */}

      {/* Featured Products Grid
      <div className="featured-grid">
        {featuredItems.map((item, i) => (
          <div className="featured-card" key={`${item.name}-${i}`}>
            <div
              className="featured-image"
              style={{ backgroundColor: item.color }}
            />
            <div className="featured-info">
              <h3 className="featured-name">{item.name}</h3>
              <p className="featured-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div> */}


      {/* FAQ Accordion */}
      <div className="faq-section">
        <h2 className="faq-title">Câu hỏi thường gặp</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className="faq-item" key={faq.question}>
              <div className="faq-question" onClick={() => toggleFaq(i)}>
                <span>{faq.question}</span>
                <span className="faq-toggle">{faq.open ? '−' : '+'}</span>
              </div>
              {faq.open && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Contact */}
      <ContactSection />


      {/* Featured Product Highlight */}
      <div className="highlight-section">
        <div className="highlight-card">
          <div className="highlight-image" />
          <div className="highlight-content">
            <span className="highlight-badge">Featured</span>
            <h3 className="highlight-title">Artisan Collection</h3>
            <p className="highlight-desc">
              Discover our signature handcrafted pieces, each one unique.
            </p>
            <Link to="/products" className="highlight-btn">
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
