import { useState } from 'react';
import type { FilterRangeValue, FilterSlide } from '../../types/types';

interface FilterSlideGroupProps {
  slide: FilterSlide;
  temp: FilterRangeValue;
  onUpdate: (active: 'min' | 'max', value: number) => void;
  onReset: () => void;
  restoreRange:()=>void;
}

function formatValue(value: number, unit: string) {
  return `${value}${unit}`;
}

function formatRange(range: FilterRangeValue, unit: string) {
  return `${formatValue(range.min, unit)} - ${formatValue(range.max, unit)}`;
}

function toPercent(value: number, min: number, max: number) {
  if (max === min) return 0;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

export default function FilterSlideGroup({
  slide,
  temp,
  onUpdate,
  onReset,
  restoreRange
}: FilterSlideGroupProps) {
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('max');

  const minPercent = toPercent(temp.min, slide.fix_min, slide.fix_max);
  const maxPercent = toPercent(temp.max, slide.fix_min, slide.fix_max);

  const handleChange = (thumb: 'min' | 'max', rawValue: string) => {
    setActiveThumb(thumb);
    onUpdate(thumb, Number(rawValue));
  };

  return (
    <div className="filter-slide-group">
      <div className="filter-slide-group__header">
        <h3 className="filter-slide-group__title">{slide.title}</h3>
        <div> 
            <button type="button" className="filter-link" onClick={onReset}>
            Reset    </button> <br/>
            <button type="button" className="filter-link" onClick={restoreRange}>
            Previous </button>
        </div>
     
      </div>

    
        <div className="filter-slide-group__selected">
            <span>Range displayed</span>
            <strong>{formatRange(slide, slide.unit)}</strong>
        </div>
    
      <div className="filter-range">
        <div className="filter-range__slider">
          <div className="filter-range__rail">
            <div
              className="filter-range__fill"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />
          </div>

          <input
            type="range"
            className={`filter-range__input filter-range__input--min ${
              activeThumb === 'min' ? 'is-active' : ''
            }`}
            min={slide.fix_min}
            max={slide.fix_max}
            step={slide.step}
            value={temp.min}
            aria-label={`${slide.title} minimum`}
            onChange={(event) => handleChange('min', event.target.value)}
            onPointerDown={() => setActiveThumb('min')}
          />

          <input
            type="range"
            className={`filter-range__input filter-range__input--max ${
              activeThumb === 'max' ? 'is-active' : ''
            }`}
            min={slide.fix_min}
            max={slide.fix_max}
            step={slide.step}
            value={temp.max}
            aria-label={`${slide.title} maximum`}
            onChange={(event) => handleChange('max', event.target.value)}
            onPointerDown={() => setActiveThumb('max')}
          />
        </div>

        <div className="filter-range__labels">
          <span>{formatValue(slide.fix_min, slide.unit)}</span>
          <span>{formatValue(slide.fix_max, slide.unit)}</span>
        </div>
      </div>
    <div className="filter-slide-group__display">
        <span>Selected Range</span>
        <strong>{formatRange(temp, slide.unit)}</strong>
    </div>
    
    </div>
  );
}