import { useState, useMemo } from 'react';
import { topics } from './topics.js';
import Hero from './components/Hero.jsx';
import TabBar from './components/TabBar.jsx';
import DrillCard from './components/DrillCard.jsx';
import NavRow from './components/NavRow.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [currentId, setCurrentId] = useState(0);
  const [solvedIds, setSolvedIds] = useState(new Set());
  const [drafts, setDrafts] = useState(() => {
    // Seed every drill's draft with its placeholder so DrillCard always has a value.
    const initial = {};
    topics.forEach((t) => {
      initial[t.id] = t.placeholder;
    });
    return initial;
  });

  const currentIndex = useMemo(
    () => topics.findIndex((t) => t.id === currentId),
    [currentId]
  );
  const currentTopic = topics[currentIndex];

  const handleSelect = (id) => {
    setCurrentId(id);
    const tabbar = document.querySelector('.tabbar-wrap');
    if (tabbar) {
      window.scrollTo({ top: tabbar.offsetTop, behavior: 'smooth' });
    }
  };

  const handleDraftChange = (id, value) => {
    setDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const handleSolved = (id) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const goPrev = () => {
    if (currentIndex > 0) handleSelect(topics[currentIndex - 1].id);
  };

  const goNext = () => {
    if (currentIndex < topics.length - 1) handleSelect(topics[currentIndex + 1].id);
  };

  return (
    <>
      <Hero solvedCount={solvedIds.size} totalCount={topics.length} />

      <TabBar
        topics={topics}
        currentId={currentId}
        solvedIds={solvedIds}
        onSelect={handleSelect}
      />

      <main>
        <DrillCard
          topic={currentTopic}
          draft={drafts[currentTopic.id]}
          isSolved={solvedIds.has(currentTopic.id)}
          onDraftChange={handleDraftChange}
          onSolved={handleSolved}
        />
        <NavRow
          currentIndex={currentIndex}
          totalCount={topics.length}
          onPrev={goPrev}
          onNext={goNext}
        />
      </main>

      <Footer />
    </>
  );
}
