const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div className="filter-bar">
      <span>Show:</span>
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          id={`filter-${id}`}
          className={`filter-btn ${current === id ? 'active' : ''}`}
          onClick={() => onChange(id)}
        >
          {label}
          {counts[id] !== undefined ? ` (${counts[id]})` : ''}
        </button>
      ))}
    </div>
  );
}
