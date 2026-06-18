export default function NavRow({ currentIndex, totalCount, onPrev, onNext }) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalCount - 1;

  return (
    <div className="nav-row">
      <button
        className="btn"
        onClick={onPrev}
        disabled={isFirst}
        style={isFirst ? { opacity: 0.3, cursor: 'default' } : undefined}
      >
        &larr; Previous
      </button>
      <button
        className="btn"
        onClick={onNext}
        disabled={isLast}
        style={isLast ? { opacity: 0.3, cursor: 'default' } : undefined}
      >
        Next &rarr;
      </button>
    </div>
  );
}
