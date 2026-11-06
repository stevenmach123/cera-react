import { useEffect, useRef, useState } from 'react';
import { FilterItem,FilterSlide } from '../types/types';
import './FilterMini.scss';

interface FilterMiniProps {
  onApply?: (data: (number[] | FilterSlide)[]) => void;
}

const INITIAL_FILTERS: FilterItem[][] = [
  [
    { id: 1, label: 'Type 1', checked: false },
    { id: 2, label: 'Type 2', checked: false },
    { id: 3, label: 'Type 3', checked: false },
  ],
  [
    { id: 4, label: 'Type 4', checked: false },
    { id: 5, label: 'Type 5', checked: false },
    { id: 6, label: 'Type 6', checked: false },
  ],
];

const INITIAL_SLIDES: FilterSlide[] = [
  { fix_min: 30000, fix_max: 120000, min: 30000, max: 120000 },
  { fix_min: 50000, fix_max: 120000, min: 50000, max: 120000 },
];

const nameItemsFilter = ['Type', 'Pattern'];
const nameSlidesFilter = ['Attribute1', 'Attribute2'];

export default function FilterMini({ onApply }: FilterMiniProps) {
  const [filtersItems, setFiltersItems] = useState<FilterItem[][]>(() =>
    INITIAL_FILTERS.map((group) => group.map((item) => ({ ...item })))
  );
  const [filterSlides, setFilterSlides] = useState<FilterSlide[]>(() =>
    INITIAL_SLIDES.map((s) => ({ ...s }))
  );
  const [tempSlides, setTempSlides] = useState(() =>
    INITIAL_SLIDES.map((s) => ({ min: s.min, max: s.max }))
  );
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean[]>([false, false]);
  const [isSlidePopOpen, setIsSlidePopOpen] = useState<boolean[]>([false, false]);
  const [selectedItemCounts, setSelectedItemCounts] = useState<number[]>([0, 0]);
  const [activeThumb, setActiveThumb] = useState<('min' | 'max')[]>(['max', 'max']);

  const itemGroupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const slideGroupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const thumbLeftRefs = useRef<Array<HTMLDivElement | null>>([]);
  const thumbRightRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Click-outside handling (ported from the Angular @HostListener).
  useEffect(() => {
    function handleClickOut(event: MouseEvent) {
      const target = event.target as Node;

      itemGroupRefs.current.forEach((el, i) => {
        if (el && !el.contains(target)) {
          setIsPopUpOpen((prev) =>
            prev[i] ? prev.map((v, idx) => (idx === i ? false : v)) : prev
          );
        }
      });

      slideGroupRefs.current.forEach((el, i) => {
        if (el && !el.contains(target)) {
          setIsSlidePopOpen((prev) =>
            prev[i] ? prev.map((v, idx) => (idx === i ? false : v)) : prev
          );
        }
      });
    }

    document.addEventListener('click', handleClickOut);
    return () => document.removeEventListener('click', handleClickOut);
  }, []);

  const togglePopup = (index: number) => {
    setIsPopUpOpen((prev) => prev.map((v, i) => (i === index ? true : v)));
  };

  const toggleSlidePopup = (idx: number) => {
    setIsSlidePopOpen((prev) => prev.map((v, i) => (i === idx ? true : v)));
  };

  const toggleSelection = (item: FilterItem, filterIdx: number) => {
    setFiltersItems((prev) =>
      prev.map((group, gi) =>
        gi === filterIdx
          ? group.map((it) =>
              it.id === item.id ? { ...it, checked: !it.checked } : it
            )
          : group
      )
    );
  };

  const updateTempSalary = (idx: number, active: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10);
    setTempSlides((prev) => {
      const next = prev.map((s) => ({ ...s }));
      if (
        active === 'min' &&
        !isNaN(numValue) &&
        numValue >= filterSlides[idx].fix_min &&
        numValue <= next[idx].max - 2000
      ) {
        next[idx].min = numValue;
      }
      if (
        active === 'max' &&
        !isNaN(numValue) &&
        numValue <= filterSlides[idx].fix_max &&
        numValue >= next[idx].min + 2000
      ) {
        next[idx].max = numValue;
      }
      return next;
    });
  };

  const resetSalaryRange = (idx: number) => {
    setTempSlides((prev) =>
      prev.map((s, i) =>
        i === idx
          ? { min: filterSlides[idx].min, max: filterSlides[idx].max }
          : s
      )
    );
  };

  const onThumbMouseDown = (
    idx: number,
    active: 'min' | 'max',
    activeEl: HTMLDivElement | null,
    inactiveEl: HTMLDivElement | null
  ) => {
    setActiveThumb((prev) => prev.map((v, i) => (i === idx ? active : v)));
    if (activeEl) activeEl.style.zIndex = '1';
    if (inactiveEl) inactiveEl.style.zIndex = '4';
  };

  const formatSalaryRange = (idx: number): string => {
    const s = filterSlides[idx];
    if (s.min === s.fix_min && s.max === s.fix_max) return '';
    if (s.min === s.fix_min) return `≤$${(s.max / 1000).toFixed(1)}k`;
    if (s.max === s.fix_max) return `≥$${(s.min / 1000).toFixed(1)}k`;
    return `$${(s.min / 1000).toFixed(1)}k-$${(s.max / 1000).toFixed(1)}k`;
  };

  const finalApply = () => {
    const nextSlides = filterSlides.map((slide, i) => ({
      ...slide,
      min: tempSlides[i].min,
      max: tempSlides[i].max,
    }));
    setFilterSlides(nextSlides);

    const counts = filtersItems.map(
      (group) => group.filter((item) => item.checked).length
    );
    setSelectedItemCounts(counts);

    const selectedItems = filtersItems.map((group) =>
      group.filter((item) => item.checked).map((v) => v.id)
    );

    const cc: (number[] | FilterSlide)[] = [];
    selectedItems.forEach((item) => cc.push(item));
    nextSlides.forEach((item) => cc.push({ ...item }));

    onApply?.(cc);
  };

  return (
    <section className="begin-container">
      {filtersItems.map((group, i) => (
        <div
          className="position-relative"
          key={`filter-group-${i}`}
          ref={(el) => {
            itemGroupRefs.current[i] = el;
          }}
        >
          <button
            className={`btn border-filter px-3 py-2 bg-white ${isPopUpOpen[i] ? 'active' : ''}`}
            onClick={() => togglePopup(i)}
          >
            <span>{nameItemsFilter[i]}</span>
            {selectedItemCounts[i] === 0 && (
              <span>
                <i className="bi ms-2 bi-chevron-down" />
              </span>
            )}
            {selectedItemCounts[i] > 0 && (
              <span className="ms-1 bg-primary rounded">
                +{selectedItemCounts[i]}
              </span>
            )}
          </button>

          <div
            className={`popup-menu shadow-sm border rounded p-3 bg-white position-absolute z-3 ${isPopUpOpen[i] ? 'show' : ''}`}
            style={{ minWidth: 200, top: '100%' }}
          >
            <div className="list-group list-group-flush">
              {group.map((item) => (
                <div
                  className="list-group-item px-0 py-1 border-0"
                  key={item.id}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`check-${item.id}`}
                      checked={item.checked}
                      onChange={() => toggleSelection(item, i)}
                    />
                    <label className="w-100" htmlFor={`check-${item.id}`}>
                      {item.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {filterSlides.map((slide, i) => (
        <div
          className="position-relative"
          key={`slide-group-${i}`}
          ref={(el) => {
            slideGroupRefs.current[i] = el;
          }}
        >
          <button
            className="btn border-filter d-flex align-items-center gap-2 px-3 py-2 position-relative"
            onClick={() => toggleSlidePopup(i)}
          >
            <span className="pe-2">{nameSlidesFilter[i]}</span>
            {!(slide.min === slide.fix_min && slide.max === slide.fix_max) && (
              <span className="badge bg-primary text-white">
                {formatSalaryRange(i)}
              </span>
            )}
            {slide.min === slide.fix_min && slide.max === slide.fix_max && (
              <span>
                <i className="bi bi-chevron-down" />
              </span>
            )}
          </button>

          <div
            className={`popup-menu shadow-sm position-absolute z-3 ${isSlidePopOpen[i] ? 'show' : ''}`}
          >
            <div
              className="p-4 bg-white shadow-sm"
              style={{ width: 320, borderRadius: 'var(--radius-button)' }}
            >
              <div className="mb-2">
                <label className="form-label small text-muted">
                  Select Range
                </label>
                <div
                  className="range-slider-container position-relative"
                  style={{ height: 40 }}
                >
                  <div
                    className="slider-selection position-absolute rounded-pill"
                    style={{
                      top: '30%',
                      height: 6,
                      left: `${
                        ((tempSlides[i].min - slide.fix_min) /
                          (slide.fix_max - slide.fix_min)) *
                        100
                      }%`,
                      width: `${
                        ((tempSlides[i].max - tempSlides[i].min) /
                          (slide.fix_max - slide.fix_min)) *
                        100
                      }%`,
                    }}
                  />
                  <input
                    type="range"
                    className="form-range position-absolute w-100 h-2"
                    style={{ zIndex: 3, opacity: 0, pointerEvents: 'auto' }}
                    min={slide.fix_min}
                    max={slide.fix_max}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (activeThumb[i] === 'min') {
                        updateTempSalary(i, 'min', value);
                      } else if (activeThumb[i] === 'max') {
                        updateTempSalary(i, 'max', value);
                      }
                    }}
                  />

                  <div
                    className="position-absolute"
                    style={{
                      left: 0,
                      top: 0,
                      transform: 'translateY(100%)',
                      zIndex: 0,
                      pointerEvents: 'none',
                    }}
                  >
                    <small className="text-muted">
                      {slide.fix_min / 1000}k
                    </small>
                  </div>
                  <div
                    className="position-absolute"
                    style={{
                      right: 0,
                      top: 0,
                      transform: 'translateY(100%)',
                      zIndex: 0,
                      pointerEvents: 'none',
                    }}
                  >
                    <small className="text-muted">
                      {slide.fix_max / 1000}k
                    </small>
                  </div>

                  <div
                    className="slider-thumb position-absolute rounded-circle border border-white"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      top: '33%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 4,
                      pointerEvents: 'auto',
                      left: `${
                        ((tempSlides[i].min - slide.fix_min) /
                          (slide.fix_max - slide.fix_min)) *
                        95
                      }%`,
                    }}
                    ref={(el) => {
                      thumbLeftRefs.current[i] = el;
                    }}
                    onMouseDown={() =>
                      onThumbMouseDown(
                        i,
                        'min',
                        thumbLeftRefs.current[i],
                        thumbRightRefs.current[i]
                      )
                    }
                  />

                  <div
                    className="slider-thumb position-absolute rounded-circle border border-white"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      top: '33%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      zIndex: 4,
                      pointerEvents: 'auto',
                      left: `${
                        ((tempSlides[i].max - slide.fix_min) /
                          (slide.fix_max - slide.fix_min)) *
                        94
                      }%`,
                    }}
                    ref={(el) => {
                      thumbRightRefs.current[i] = el;
                    }}
                    onMouseDown={() =>
                      onThumbMouseDown(
                        i,
                        'max',
                        thumbRightRefs.current[i],
                        thumbLeftRefs.current[i]
                      )
                    }
                  />
                </div>
              </div>

              <div
                className="p-2 rounded text-center mb-3"
                style={{ backgroundColor: 'var(--color-surface-container)' }}
              >
                <small className="text-muted">Selected Range:</small>
                <div className="fw-bold">
                  {tempSlides[i].min.toLocaleString()} -{' '}
                  {tempSlides[i].max.toLocaleString()}
                </div>
              </div>

              <button
                className="btn btn-outline-secondary flex-grow-1 mx-auto btn-sm"
                onClick={() => resetSalaryRange(i)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      ))}

      <button className="btn apply_button px-3" onClick={finalApply}>
        Áp dụng
      </button>
    </section>
  );
}
