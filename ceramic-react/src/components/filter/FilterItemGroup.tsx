import type { FilterItem } from '../../types/types';

interface FilterItemGroupProps {
  title: string;
  items: FilterItem[];
  onToggle: (itemId: number) => void;
  onClear: () => void;
}

export default function FilterItemGroup({
  title,
  items,
  onToggle,
  onClear,
}: FilterItemGroupProps) {
  const selectedCount = items.filter((item) => item.checked).length;

  return (
    <div className="filter-item-group">
      <div className="filter-group__header">
        <h3 className="filter-group__title">{title}</h3>
        <button
          type="button"
          className="filter-link"
          onClick={onClear}
          disabled={selectedCount === 0}
        >
          Clear
        </button>
      </div>

      <ul className="filter-checklist">
        {items.map((item) => (
          <li key={item.id} className="filter-checklist__item">
            <label className="filter-check">
              <input
                type="checkbox"
                className="filter-check__input"
                checked={item.checked}
                onChange={() => onToggle(item.id)}
              />
              <span className="filter-check__label">{item.label}</span>
              {item.count !== undefined && (
                <span className="filter-check__count">({item.count})</span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}