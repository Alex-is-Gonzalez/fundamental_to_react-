export default function TabBar({ topics, currentId, solvedIds, onSelect }) {
  return (
    <nav className="tabbar-wrap">
      <div className="tabbar">
        {topics.map((topic) => {
          const isActive = topic.id === currentId;
          const isDone = solvedIds.has(topic.id);
          const shortTitle = topic.title.split(' ').slice(0, 2).join(' ');

          return (
            <button
              key={topic.id}
              className={`tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(topic.id)}
            >
              <span className={`dot ${isDone ? 'done' : ''}`}></span>
              {shortTitle}
              <span className="filename">{topic.file}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
