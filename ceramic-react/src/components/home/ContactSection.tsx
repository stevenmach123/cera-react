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
      'Product Information – know more about your ceramic and porcelain collections.',
  },
  {
    value: 'pricing-quotation',
    label: 'Pricing & Quotation – request pricing or a project quotation.',
  },
  {
    value: 'showroom-visit',
    label: "Showroom Visit – I'd like to schedule a showroom visit.",
  },
  {
    value: 'interior-design',
    label: 'Interior Design Consultation – help planning my home interior design.',
  },
  {
    value: 'tile-material',
    label:
      'Tile & Material Selection – recommendations for tiles, colors, and materials.',
  },
  {
    value: 'product-samples',
    label: 'Product Samples – request material or tile samples.',
  },
  {
    value: 'installation-support',
    label:
      'Installation & Technical Support – questions about installation or product specifications.',
  },
  {
    value: 'project-collaboration',
    label:
      "Project Collaboration – I'd like to discuss a residential or commercial project.",
  },
  { value: OTHER_SUBJECT, label: 'Other inquires – type my own subject' },
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
      setError('Please tell us your name.');
      return;
    }
    if (!form.email.trim() && preferContact === 'email') {
      setError('Please provide an email address so we can reply to you.');
      return;
    }
    if (!subject) {
      setError('Please choose a subject.');
      return;
    }
    if (isCustomSubject && !form.customSubject.trim()) {
      setError('Please type your own subject.');
      return;
    }
    if (!form.content.trim()) {
      setError('Please share a few details about your request.');
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
          <span className="contactme-eyebrow">Contact</span>
          <h2 className="contactme-heading">Have a Question About Your Next Design?</h2>
          <p className="contactme-subheading">We&rsquo;d love to hear from you!</p>
          <p className="contactme-description">
            Our team will get back to you via email or Zalo within 2 business days.
          </p>

          <ul className="contactme-points">
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Free consultation on tiles, colors and materials
            </li>
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Showroom visit &amp; sample delivery on request
            </li>
            <li className="contactme-point">
              <span className="contactme-point-dot" />
              Quotations for residential and commercial projects
            </li>
          </ul>

          <div className="contactme-chip">
            <span className="contactme-chip-dot" />
            Replies within 2 business days
          </div>
        </aside>

        {/* Right: form panel */}
        <div className="contactme-form-panel">
          <h3 className="contactme-form-title">Send us a message</h3>
          <p className="contactme-form-desc">
            Tell us what you need and the right consultant will get in touch with you.
          </p>

          {sent ? (
            <div className="contactme-success" role="status">
              <span className="contactme-success-icon">&#10003;</span>
              <h4>Thank you, {form.name.trim()}!</h4>
              <p>
                Your request has been received. Our team will contact you via{' '}
                {preferContact === 'email' ? 'email' : 'Zalo'} within 2 business days.
              </p>
              <button type="button" className="contactme-submit" onClick={resetForm}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contactme-form" onSubmit={handleSubmit} noValidate>
              <div className="contactme-row">
                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-name">
                    Name
                  </label>
                  <input
                    id="contactme-name"
                    name="name"
                    type="text"
                    className="contactme-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-email">
                    Email address
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
                    Phone
                  </label>
                  <input
                    id="contactme-phone"
                    name="phone"
                    type="tel"
                    className="contactme-input"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contactme-field">
                  <label className="contactme-label" htmlFor="contactme-prefer">
                    Prefer contact
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
                  Subject
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
                    <option value="">Select a subject…</option>
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Appears only when "Other inquires" is chosen */}
              {isCustomSubject && (
                <div className="contactme-custom-subject">
                  <label className="contactme-label" htmlFor="contactme-custom-subject">
                    Your own subject
                  </label>
                  <input
                    id="contactme-custom-subject"
                    name="customSubject"
                    type="text"
                    className="contactme-input"
                    placeholder="Type your own subject here…"
                    value={form.customSubject}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="contactme-field">
                <label className="contactme-label" htmlFor="contactme-content">
                  Content
                </label>
                <textarea
                  id="contactme-content"
                  name="content"
                  className="contactme-input contactme-textarea"
                  placeholder="Tell us more about your project, the products you are interested in, quantities, timeline…"
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
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

