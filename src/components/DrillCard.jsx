import { useState, useEffect, useRef } from 'react';
import CodeBlock from './CodeBlock.jsx';

export default function DrillCard({ topic, draft, isSolved, onDraftChange, onSolved }) {
  const [feedback, setFeedback] = useState(null); // { ok, msg } | null
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef(null);

  // Reset transient UI state (feedback, hint) whenever the learner switches drills.
  useEffect(() => {
    setFeedback(null);
    setShowHint(false);
  }, [topic.id]);

  const handleChange = (e) => {
    onDraftChange(topic.id, e.target.value);
  };

  const handleCheck = () => {
    const result = topic.validate(draft);
    setFeedback(result);
    if (result.ok) {
      onSolved(topic.id);
    }
  };

  const handleReset = () => {
    onDraftChange(topic.id, topic.placeholder);
    setFeedback(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = draft.slice(0, start) + '  ' + draft.slice(end);
      onDraftChange(topic.id, next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  };

  const gutterClass = `gutter ${isSolved ? 'correct' : ''}`;
  const feedbackClass = feedback
    ? `feedback show ${feedback.ok ? 'good' : 'bad'}`
    : 'feedback';

  return (
    <>
      <div className="topic-head">
        <div className="rule-no">
          {topic.rule} {isSolved ? '— ✓ solved' : ''}
        </div>
        <h2>{topic.title}</h2>
        <p>{topic.desc}</p>
      </div>

      <div className="card">
        <div className="pane broken-pane">
          <div className={gutterClass}></div>
          <div className="pane-label">
            <span>broken</span>
            <span>{topic.file}</span>
          </div>
          <CodeBlock lines={topic.broken} highlightLines={topic.brokenHighlight || []} />
        </div>

        <div className="pane answer-pane">
          <div className="pane-label">
            <span>your fix</span>
            <span>type here</span>
          </div>
          <textarea
            ref={textareaRef}
            className="answer"
            spellCheck="false"
            value={draft}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <div className="action-row">
            <button className="btn primary" onClick={handleCheck}>
              Check
            </button>
            <button className="btn ghost" onClick={handleReset}>
              Reset
            </button>
          </div>
          <button className="hint-toggle" onClick={() => setShowHint((v) => !v)}>
            Need a hint?
          </button>
          <div className={`hint-box ${showHint ? 'show' : ''}`}>{topic.hint}</div>
          <div className={feedbackClass}>
            {feedback ? `${feedback.ok ? '✓' : '✗'} ${feedback.msg}` : ''}
          </div>
        </div>
      </div>
    </>
  );
}
