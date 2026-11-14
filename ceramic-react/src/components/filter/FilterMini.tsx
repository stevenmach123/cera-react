import { useState } from 'react';
import type { FilterItem, FilterRangeValue, FilterSlide } from '../../types/types';
import FilterItemGroup from './FilterItemGroup';
import FilterSlideGroup from './FilterSlideGroup';
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

const FILTER_TITLES = ['Categories', 'Pattern'];

const INITIAL_SLIDES: FilterSlide[] = [
  {
    id: 'waterproof',
    title: 'Waterproof',
    unit: '%',
    step: 1,
    minGap: 1,
    fix_min: 0,
    fix_max: 100,
    min: 30,
    max: 50,
  },
  {
    id: 'tile-thickness',
    title: 'Tile thickness',
    unit: 'mm',
    step: 1,
    minGap: 1,
    fix_min: 1,
    fix_max: 10,
    min: 2,
    max: 8,
  },
];

const cloneFilters = (groups: FilterItem[][]) =>
  groups.map((group) => group.map((item) => ({ ...item })));

const cloneSlides = (slides: FilterSlide[]) =>
  slides.map((slide) => ({ ...slide }));

const toTempRanges = (slides: FilterSlide[]): FilterRangeValue[] =>
  slides.map(({ min, max }) => ({ min, max }));

export default function FilterMini({ onApply }: FilterMiniProps) {
  const [filtersItems, setFiltersItems] = useState<FilterItem[][]>(() =>
    cloneFilters(INITIAL_FILTERS)
  );
  const [filterSlides, setFilterSlides] = useState<FilterSlide[]>(() =>
    cloneSlides(INITIAL_SLIDES)
  );
  const [tempSlides, setTempSlides] = useState<FilterRangeValue[]>(() =>
    toTempRanges(INITIAL_SLIDES)
  );

  const toggleSelection = (filterIdx: number, itemId: number) => {
    setFiltersItems((prev) =>
      prev.map((group, gi) =>
        gi === filterIdx
          ? group.map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          : group
      )
    );
  };

  const clearGroup = (filterIdx: number) => {
    setFiltersItems((prev) =>
      prev.map((group, gi) =>
        gi === filterIdx
          ? group.map((item) => ({ ...item, checked: false }))
          : group
      )
    );
  };

  const clearAll = () => {
    setFiltersItems((prev) =>
      prev.map((group) => group.map((item) => ({ ...item, checked: false })))
    );

    const fullRanges = filterSlides.map((slide) => ({
      min: slide.fix_min,
      max: slide.fix_max,
    }));

    setTempSlides(fullRanges);
    setFilterSlides((prev) =>
      prev.map((slide) => ({
        ...slide,
        min: slide.fix_min,
        max: slide.fix_max,
      }))
    );
  };

  const updateTempRange = (
    idx: number,
    active: 'min' | 'max',
    value: number
  ) => {
    const slide = filterSlides[idx];
    if (!slide) return;

    setTempSlides((prev) => {
      const current = prev[idx];
      const next = prev.map((range) => ({ ...range }));

      if (active === 'min') {
        const upper = current.max - slide.minGap;
        next[idx].min = Math.min(
          Math.max(value, slide.fix_min),
          Math.max(upper, slide.fix_min)
        );
      } else {
        const lower = current.min + slide.minGap;
        next[idx].max = Math.max(
          Math.min(value, slide.fix_max),
          Math.min(lower, slide.fix_max)
        );
      }

      return next;
    });
  };

  const resetRange = (idx: number) => {
    const slide = filterSlides[idx];
    if (!slide) return;

    setTempSlides((prev) =>
      prev.map((range, i) =>
        i === idx
          ? { min: slide.fix_min, max: slide.fix_max }
          : range
      )
    );
  };

  const handleApply = () => {
    const nextSlides = filterSlides.map((slide, i) => ({
      ...slide,
      min: tempSlides[i].min,
      max: tempSlides[i].max,
    }));

    setFilterSlides(nextSlides);

    const selectedItems = filtersItems.map((group) =>
      group.filter((item) => item.checked).map((item) => item.id)
    );

    const payload: (number[] | FilterSlide)[] = [
      ...selectedItems,
      ...nextSlides,
    ];

    onApply?.(payload);
  };

  return (
    <section className="filter-mini">
      <div className="filter-mini__header">
        <h2 className="filter-mini__title">Filters</h2>
        <button type="button" className="filter-link" onClick={clearAll}>
          Clear all
        </button>
      </div>

      {filtersItems.map((group, i) => (
        <FilterItemGroup
          key={FILTER_TITLES[i] ?? `filter-${i}`}
          title={FILTER_TITLES[i] ?? `Filter ${i + 1}`}
          items={group}
          onToggle={(itemId) => toggleSelection(i, itemId)}
          onClear={() => clearGroup(i)}
        />
      ))}

      {filterSlides.map((slide, i) => (
        <FilterSlideGroup
          key={slide.id}
          slide={slide}
          temp={tempSlides[i]}
          onUpdate={(active, value) => updateTempRange(i, active, value)}
          onReset={() => resetRange(i)}
        />
      ))}

      <button type="button" className="apply_button" onClick={handleApply}>
        Apply
      </button>
    </section>
  );
}