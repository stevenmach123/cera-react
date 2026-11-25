import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import './ContactSection.scss';

type PreferContact = 'email' | 'zalo';

const preferContactOptions: { value: PreferContact; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'zalo', label: 'Zalo' },
];

const OTHER_SUBJECT = 'other';

const subjectOptions: { value: string; label: string }[] = [
  {
    value: 'product-information',
    label:
      'Thông tin sản phẩm – tìm hiểu thêm về các bộ sưu tập gốm và sứ của chúng tôi.',
  },
  {
    value: 'pricing-quotation',
    label: 'Bảng giá & Báo giá – yêu cầu báo giá hoặc báo giá cho dự án.',
  },
  {
    value: 'showroom-visit',
    label: 'Tham quan showroom – tôi muốn đặt lịch tham quan showroom.',
  },
  {
    value: 'interior-design',
    label: 'Tư vấn thiết kế nội thất – hỗ trợ lên ý tưởng thiết kế nội thất ngôi nhà của bạn.',
  },
  {
    value: 'tile-material',
    label:
      'Lựa chọn gạch & vật liệu – gợi ý về gạch, màu sắc và vật liệu phù hợp.',
  },
  {
    value: 'product-samples',
    label: 'Mẫu sản phẩm – yêu cầu mẫu vật liệu hoặc mẫu gạch.',
  },
  {
    value: 'installation-support',
    label:
      'Lắp đặt & Hỗ trợ kỹ thuật – thắc mắc về lắp đặt hoặc thông số kỹ thuật sản phẩm.',
  },
  {
    value: 'project-collaboration',
    label:
      'Hợp tác dự án – tôi muốn trao đổi về một dự án nhà ở hoặc thương mại.',
  },
  { value: OTHER_SUBJECT, label: 'Yêu cầu khác – nhập chủ đề của riêng bạn' },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  content: string;
  customSubject: string;
}

const emptyForm: FormState = {
  name: '',
  email: '',
  phone: '',
  content: '',
  customSubject: '',
};

export default function ContactSection() {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);

  const [preferContact, setPreferContact] = useState<PreferContact>('email');
  const [subject, setSubject] = useState('');
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const isCustomSubject = subject === OTHER_SUBJECT;

  // Scroll to the contact block when arriving with the #contact hash
  useEffect(() => {
    if (location.hash !== '#contact') return;
    const timer = window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname, location.key]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Vui lòng cho chúng tôi biết tên của bạn.');
      return;
    }
    if (!form.email.trim() && preferContact === 'email') {
      setError('Vui lòng nhập địa chỉ email để chúng tôi có thể liên hệ lại với bạn.');
      return;
    }
    if (!subject) {
      setError('Vui lòng chọn một chủ đề.');
      return;
    }
    if (isCustomSubject && !form.customSubject.trim()) {
      setError('Vui lòng nhập chủ đề của riêng bạn.');
      return;
    }
    if (!form.content.trim()) {
      setError('Vui lòng cho chúng tôi biết thêm một vài chi tiết về yêu cầu của bạn.');
      return;
    }

    setSent(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSubject('');
    setPreferContact('email');
    setSent(false);
    setError('');
  };

  return (
    <section className="contactme-section" id="contact" ref={sectionRef}>
      <div className="contactme-card">
        {/* Left: intro / info panel */}
        <aside className="contactme-info">
          <span className="contactme-eyebrow">Liên hệ</span>
          <h2 className="contactme-heading">Bạn có câu hỏi về thiết kế tiếp theo?</h2>
          <p className="contactme-subheading">Chúng tôi rất muốn nghe ý kiến của bạn!</p>
          <p className="contactme-description">
            Đội ngũ của chúng tôi sẽ liên hệ lại với bạn qua email hoặc Zalo trong vòng 2 ngày làm việc.
          </p>

          <ul className="contactme-points">
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Tư vấn miễn phí về gạch, màu sắc và vật liệu
            </li>
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Tham quan showroom và giao mẫu theo yêu cầu
            </li>
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Báo giá cho các dự án nhà ở và thương mại
            </li>
          </ul>

          <div className="contactme-chip">
            <span className="contactme-chip-dot" />
            Phản hồi trong vòng 2 ngày làm việc
          </div>
        </aside>

        {/* Right: form panel */}
        <div className="contactme-form-panel">
          <h3 className="contactme-form-title">Gửi tin nhắn cho chúng tôi</h3>
          <p className="contactme-form-desc">
            Hãy cho chúng tôi biết bạn cần gì, chuyên viên phù hợp sẽ liên hệ với bạn.
          </p>

          {sent ? (
            <div className="contactme-success" role="status">
              <span className="contactme-success-icon">&#10003;</span>
              <h4>Cảm ơn bạn, {form.name.trim()}!</h4>
              <p>
                Yêu cầu của bạn đã được ghi nhận. Đội ngũ của chúng tôi sẽ liên hệ với bạn qua{' '}
                {preferContact === 'email' ? 'email' : 'Zalo'} trong vòng 2 ngày làm việc.
              </p>
              <button type="button" className="contactme-submit" onClick={resetForm}>
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form className="contactme-form" onSubmit={handleSubmit} noValidate>
              <div className="contactme-row">
                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-name">
                    Họ và tên
                  </label>
                  <input
                    id="contactme-name"
                    name="name"
                    type="text"
                    className="contactme-input"
                    placeholder="Nhập họ và tên của bạn"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-email">
                    Địa chỉ email
                  </label>
                  <input
                    id="contactme-email"
                    name="email"
                    type="email"
                    className="contactme-input"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contactme-row">
                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-phone">
                    Số điện thoại
                  </label>
                  <input
                    id="contactme-phone"
                    name="phone"
                    type="tel"
                    className="contactme-input"
                    placeholder="Nhập số điện thoại của bạn"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-prefer">
                    Phương thức liên hệ
                  </label>
                  <div className="contactme-select-wrap">
                    <select
                      id="contactme-prefer"
                      className="contactme-input contactme-select"
                      value={preferContact}
                      onChange={(e) => setPreferContact(e.target.value as PreferContact)}
                    >
                      {preferContactOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="contactme-field">
                <label className="contactme-label" htmlFor="contactme-subject">
                  Chủ đề
                </label>
                <div className="contactme-select-wrap">
                  <select
                    id="contactme-subject"
                    className="contactme-input contactme-select"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      setError('');
                    }}
                  >
                    <option value="">Chọn chủ đề…</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Appears only when "Yêu cầu khác" is chosen */}
              {isCustomSubject && (
                <div className="contactme-custom-subject">
                  <label className="contactme-label" htmlFor="contactme-custom-subject">
                    Chủ đề của bạn
                  </label>
                  <input
                    id="contactme-custom-subject"
                    name="customSubject"
                    type="text"
                    className="contactme-input"
                    placeholder="Nhập chủ đề của riêng bạn tại đây…"
                    value={form.customSubject}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="contactme-field">
                <label className="contactme-label" htmlFor="contactme-content">
                  Nội dung
                </label>
                <textarea
                  id="contactme-content"
                  name="content"
                  className="contactme-input contactme-textarea"
                  placeholder="Hãy cho chúng tôi biết thêm về dự án, loại sản phẩm bạn quan tâm, số lượng, thời gian cần hoàn thành…"
                  value={form.content}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="contactme-error" role="alert">
                  {error}
                </p>
              )}

              <div className="contactme-actions">
                <button type="submit" className="contactme-submit">
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}