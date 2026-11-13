import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.scss';

export interface HeroSlide {
  key: string;
  miniText: string;
  bigText: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  img: string;   // '#' = placeholder, đường dẫn ảnh = hiển thị <img>
  tone: string;  // màu nền tạm khi chưa có ảnh
}

const COMPANY_NAME = 'Công Ty Nội Thất - Interior Design since 1980';

const heroSlides: HeroSlide[] = [
  {
    key: 'modern_porcelain',
    miniText: 'Sứ Hiện Đại Eurohome',
    bigText: 'Tinh Tế Trong Từng Chi Tiết, Giản Dị Trong Từng Không Gian',
    description:
      'Khám phá bộ sưu tập sứ hiện đại của Eurohome, nơi tay nghề tỉ mỉ gặp vẻ đẹp vượt thời gian. Mỗi sản phẩm hòa quyện chi tiết tinh xảo với thiết kế tối giản, mang đến không gian thanh lịch mà vẫn giản dị tự nhiên.',
    ctaLabel: 'Đến Với Bộ Sưu Tập',
    ctaLink: '/products',
    img: '#',
    tone: '#D9CBB6',
  },
  {
    key: 'living_room',
    miniText: 'Phòng Khách',
    bigText: 'Nâng Tầm Phòng Khách Với Vẻ Đẳng Cấp Vượt Thời Gian',
    description:
      'Biến không gian sống của bạn thành không gian đẳng cấp với bộ sưu tập phòng khách được tuyển chọn. Từ ghế sofa thanh lịch, bình hoa sứ nghệ thuật đến gạch trang trí, mỗi món đồ đều mang đến sự thoải mái, phong cách và tinh tế cho ngôi nhà của bạn.',
    ctaLabel: 'Đến Với Bộ Sưu Tập',
    ctaLink: '/products',
    img: '#',
    tone: '#C3B7A6',
  },
  {
    key: 'kitchen',
    miniText: 'Phòng Bếp',
    bigText: 'Mang Vẻ Đẹp Và Truyền Thống Vào Không Gian Bếp',
    description:
      'Khám phá bộ sưu tập phòng bếp với đồ ăn bằng sứ thanh lịch, bộ bàn ăn hiện đại và nồi đất nung truyền thống. Khám phá sự thành thạo thủ công bền vững, mang sự ấm áp, phong cách và tính thực dụng cho mỗi bữa cơm gia đình.',
    ctaLabel: 'Đến Với Bộ Sưu Tập',
    ctaLink: '/products',
    img: '#',
    tone: '#B9A893',
  },
];

const AUTOPLAY_MS = 5000;

function ImageMap({ item }: { item: HeroSlide }) {
  const isPlaceholder = item.img === '#' || item.img.startsWith('#');
  if (isPlaceholder) {
    return (
      <div
        className="hero-slide-img color-img"
        style={{ backgroundColor: item.img === '#' ? item.tone : item.img }}
      />
    );
  }
  return <img className="hero-slide-img" src={item.img} alt={item.bigText} />;
}

export default function HeroSlider({ slides = heroSlides }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  return (
    <div
      className="hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-slider-viewport">
        <div
          className="hero-slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <div className="hero-slide" key={slide.key}>
              <ImageMap item={slide} />
              <div className="hero-slide-overlay" />

              <div className="hero-slide-content">
                <span className="hero-slide-mini">{slide.miniText}</span>
                <h1 className="hero-slide-title">{slide.bigText}</h1>
                <p className="hero-slide-desc">{slide.description}</p>
                <Link to={slide.ctaLink} className="hero-slide-cta">
                  {slide.ctaLabel}
                </Link>
              </div>

              <span className="hero-slide-company">{COMPANY_NAME}</span>
            </div>
          ))}
        </div>

        {/* dots - bottom right */}
        <div className="hero-slider-dots">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.key}
              className={`hero-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Xem slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}