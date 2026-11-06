import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './CartPage.scss';

const tabs = [{ label: 'In Store' }, { label: 'Delivery' }];

export default function CartPage() {
  const [deliverTabIndex, setDeliverTabIndex] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setDeliverTabIndex(newValue);
  };

  return (
    <section style={{ width: '100%' }}>
      <div className="begin-container">
        <div className="part11">part11 fslkdfjskdjf</div>
        <div className="part12">part12 sdfsdfdsf</div>

        <div className="part21">
          <div className="pic">
            <img
              className={deliverTabIndex === 1 ? 'car' : ''}
              src={`assets/${
                deliverTabIndex === 1 ? 'fast-delivery.png' : 'store.png'
              }`}
              alt=""
            />
          </div>
          <div style={{ flexGrow: 1, border: '1px solid red' }}>
            <Tabs
              value={deliverTabIndex}
              onChange={handleChange}
              variant="standard"
              className="custom-square-tabs"
            >
              {tabs.map((tab, i) => (
                <Tab
                  key={tab.label}
                  label={
                    <div
                      className={`tab-label-wrapper ${
                        deliverTabIndex === i ? 'active-square' : ''
                      }`}
                    >
                      <span className="tab-word">{tab.label}</span>
                    </div>
                  }
                />
              ))}
            </Tabs>

            {deliverTabIndex === 0 && (
              <div className="tab-content-area">
                <p>Tại Showroom</p>
              </div>
            )}
            {deliverTabIndex === 1 && (
              <div className="tab-content-area">
                <p>Chuyển Mẫu Đến</p>
              </div>
            )}
          </div>
        </div>

        <div className="part22">part22 sdfsdfsdf</div>
        <div className="part31">part31 sdfsdfsdf</div>
        <div className="part32">part32 sdfsdfsdf</div>
      </div>
    </section>
  );
}
