import { useCallback, useEffect, useState } from 'react';
import './ValueTabs.scss';
import './EventCarousel.scss'
export interface EventItem {
  key: string;
  title: string;
  description: string;
  meta: string;
  image: string; // '#RRGGBB' = placeholder màu, ngược lại là đường dẫn ảnh
}
const eventItems: EventItem[] = [
  {
    key: 'architect_dinner',
    title: 'Tiệc Tối Dành Cho Kiến Trúc Sư',
    description:
      'Buổi tiệc tối quy tụ các công ty trang trí nội thất, thiết kế không gian sống và kiến trúc sư hàng đầu. Chúng tôi giới thiệu bộ sưu tập mới, chia sẻ vật liệu gốm sứ cho từng không gian dự án và mở đầu cho những hợp tác dài lâu.',
    meta: '18/11/2025 · Khách sạn Sofitel · TP. Hồ Chí Minh',
    image: '#C8A97E',
  },
  {
    key: 'team_collaboration',
    title: 'Đội Ngũ Nội Bộ Đồng Hành',
    description:
      'Các thành viên trong đội ngũ trình diễn quy trình phối hợp giữa bộ phận thiết kế, kỹ thuật và kinh doanh trong từng dự án — từ bản vẽ ý tưởng, chọn vật liệu cho tới ngày bàn giao công trình.',
    meta: '22/11/2025 · Showroom Trung Tâm · Hà Nội',
    image: '#8FA9B8',
  },
  {
    key: 'architect_signing',
    title: 'Lễ Ký Hợp Tác Với Kiến Trúc Sư',
    description:
      'Lễ ký kết hợp tác diễn ra trực tiếp tại showroom của chúng tôi, đánh dấu mối quan hệ hợp tác lâu dài và mở ra cơ hội đưa sản phẩm gốm sứ đến gần hơn với những dự án kiến trúc trọn gói.',
    meta: '05/12/2025 · Showroom Trung Tâm · Hà Nội',
    image: '#B08D8D',
  },
];

const AUTOPLAY_MS = 3000;
const AUTOPLAYTAB_MS = 5000;
const valueTabsVi = [
  {
    key: 'business',
    label: 'Đối Tác Kinh Doanh',
    headline: 'Phù Hợp Với Nhu Cầu Kinh Doanh Của Bạn',
    subheadline:
      'Chúng tôi đồng hành cùng bạn ở mọi giai đoạn của hành trình thiết kế không gian sống — từ tư vấn đầu tiên đến lắp đặt hoàn thiện.',
    steps: [
      {
        title: 'Tư Vấn',
        description:
          'Các chuyên gia sản phẩm của chúng tôi giúp bạn tìm giải pháp gốm sứ phù hợp cho mọi quy mô dự án.',
      },
      {
        title: 'Thiết Kế',
        description:
          'Đồng hành cùng đội ngũ thiết kế nội bộ để kiến tạo không gian sống đẹp và tiện nghi.',
      },
      {
        title: 'Kết Nối',
        description:
          'Tiếp cận mạng lưới nhà cung cấp, nhà thầu và đối tác dịch vụ uy tín trên toàn quốc.',
      },
    ],
  },
  {
    key: 'architect',
    
    label: 'Mạng Lưới Kiến Trúc Sư',
    headline: 'Đồng Hành Cùng Các Kiến Trúc Sư Hàng Đầu',
    subheadline:
      'Kiến tạo thiết kế sang trọng và bền bỉ cùng những tâm huyết kiến trúc uy tín nhất Việt Nam.',
    stats: [
      { value: '25+', label: 'Năm Đồng Hành Tin Cậy' },
      { value: '500+', label: 'Hội Viên Kiến Trúc Toàn Quốc' },
      { value: 'B→N', label: 'Phủ Phủ Từ Bắc Vào Nam' },
    ],
    features: [
      'Giải pháp thiết kế sang trọng và tiếp cận cho mọi ngân sách',
      'Người liên kết chuyên trách cho từng dự án kiến trúc',
      'Truy cập sớm độc quyền các bộ sưu tập và vật liệu mới',
    ],
  },
  {
    key: 'value',
    label: 'Giá Trị Bền Vững',
    headline: 'Cam Kết Hoàn Hảo Của Chúng Tôi',
    subheadline:
      'Chúng tôi tin rằng mỗi khách hàng đều xứng đáng với trải nghiệm xuất sắc — từ lần đầu ghé thăm đến nhiều năm sau khi lắp đặt.',
    pillars: [
      {
        icon: '🏛️',
        verb: 'Kiến Tạo',
        noun: 'Di Sản',
        description:
          'Thiết kế không gian gốm sứ cao cấp bền vững theo thời gian và nâng tầm cuộc sống thường nhật.',
      },
      {
         icon: '✨',
        verb: 'Nâng Tầm',
        noun: 'Thẩm Mỹ Thiết Kế',
        description:
          'Biến tầm nhìn của bạn thành hiện thực với sự tỉ mỉ trong từng chi tiết và chất liệu.',
      },
      { icon: '🤝',
        verb: 'Đồng Hành',
        noun: 'Dài Lâu Cùng Khách Hàng',
        description:
          'Mối quan hệ lâu dài được xây dựng trên nền tảng niềm tin, minh bạch và chất lượng sản phẩm không ngừng.',
      },
    ],
  },
];

type Lang = 'en' | 'vi';

export default function ValueTabs() {
  const tabs = valueTabsVi 
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const active = tabs.find((t) => t.key === activeTab) || tabs[0];





  const tabCount = tabs.length; 
  const [tabPaused,SetTabPaused] = useState<boolean>(false) 
  const [tabIndex,SetTabIndex] = useState(0); 
  const handleTabClick =(key: string) =>{
      setActiveTab(key);
      SetTabIndex(tabs.findIndex((item)=>item.key==key))
  } 
  useEffect(()=>{
    if(tabPaused || tabCount <=1 ) return
    const timer = setInterval(()=>
        SetTabIndex(index=>{
            setActiveTab(tabs[(index+1)%(tabCount)].key)
            return index +1;
        })
    ,AUTOPLAYTAB_MS)
    return ()=> clearInterval(timer)
},[tabPaused,tabCount])
    

  

 {/*Events slide of valueTabsVi[].key = architect*/}
  const count = eventItems.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const goTo = (next: number) => setIndex(((next % count) + count) % count)
  const next = useCallback(() => goTo(index + 1), [index]);
  const prev = useCallback(() => goTo(index - 1), [index]);
  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);






  function ImageMap({ item }: { item: EventItem }) {
    const isPlaceholder = item.image.includes('#');
    if (isPlaceholder) {
      return (
        <div
          className="event-img color-img"
          style={{ backgroundColor: item.image }}
          role="img"
          aria-label={item.title}
        >
          <span className="event-img-tag">{item.title}</span>
        </div>
      );
  }
  return <img className="event-img" src={item.image} alt={item.title} />;
  }


  return (
  <section className="value-tabs-section">
      <div className="value-tabs-header">
        <h2 className="value-tabs-main-title">
          {'Tại Sao Chọn Chúng Tôi'}
        </h2>
        <p className="value-tabs-main-sub">
          {'Ba nền tảng niềm tin định hình uy tín của chúng tôi'}
        </p>
      </div>

    <div onMouseEnter={()=>SetTabPaused(true)} onMouseLeave={()=>SetTabPaused(false)} className="value-tabs-container">
      <div className="value-tabs-bar">
        {tabs.map((tab, i) => (
          <button
            key={tab.key}
            className={`value-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={()=>handleTabClick(tab.key)}
          >
            <span className="tab-index">{String(i + 1)}.</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="value-tab-panel">
        {active.key === 'business' && (
          <div className="business-panel">
            <h3 className="panel-headline"><span style={{fontSize:'2.5rem',fontWeight:'400'}}>1.</span>{active.headline}</h3>
            <p className="panel-sub">{active.subheadline}</p>
            <div className="steps-row">
              {active.steps.map((step, i) => (
                <div className="step-card" key={step.title}>
                  <div className="box-img"></div>
                  <div style={{padding:'no-padding'}}>
                    <span className="step-number">{String(i + 1)}. </span><span className="step-title">{step.title}</span>
                    <p className="step-desc">{step.description}</p>
                    
                    {i < active.steps.length - 1 && (
                      <div className="step-arrow">→</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active.key === 'architect' && (
          <div className="architect-panel">

            <h3 className="panel-headline"><span style={{fontSize:'2.5rem',fontWeight:'400'}}>2.</span> {active.headline}</h3>
            <p className="panel-sub">{active.subheadline}</p>
            {/*Carousel event start*/}
      <div
      className="event-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="event-carousel-header">
        <span className="event-carousel-label">Sự Kiện</span>
        <h3 className="event-carousel-title">Câu Chuyện Của Chúng Tôi</h3>
      </div>

      <div className="event-carousel-viewport">
        <div
          className="event-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {eventItems.map((item) => (
            <article className="event-slide" key={item.key}>
              <div className="event-slide-left">
                <h4 className="event-slide-title">{item.title}</h4>
                <p className="event-slide-desc">{item.description}</p>
                <span className="event-slide-meta">{item.meta}</span>
              </div>
              <div className="event-slide-right">
                <ImageMap item={item} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="event-carousel-controls">
        <button type="button" className="event-nav-btn" onClick={prev} aria-label="Sự kiện trước">
          ←
        </button>

        <div className="event-dots">
          {eventItems.map((item, i) => (
            <button
              type="button"
              key={item.key}
              className={`event-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Xem sự kiện ${i + 1}`}
            />
          ))}
        </div>

        <button type="button" className="event-nav-btn" onClick={next} aria-label="Sự kiện tiếp theo">
          →
        </button>
      </div>
        </div>
            


            {/*Carousel event end*/}
            <div className="stats-row">
              {active.stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="feature-list">
              {active.features.map((f) => (
                <li key={f} className="feature-item">
                  <span className="feature-check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active.key === 'value' && (
          <div className="value-panel">
            <h3 className="panel-headline"><span style={{fontSize:'2.5rem',fontWeight:'400'}}>3.</span> {active.headline}</h3>
            <p className="panel-sub">{active.subheadline}</p>
            <div className="pillars-row">
            {active.pillars.map((pillar) => (
              <div className="pillar-card" key={pillar.noun}>
                <div className="pillar-icon">{pillar.icon}</div>
                <div className="pillar-heading">
                  <span className="pillar-verb">{pillar.verb}</span>
                  <span className="pillar-noun">{pillar.noun}</span>
                </div>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>

          </div>
        )}
      </div>
    </div>
  </section>
);
}
