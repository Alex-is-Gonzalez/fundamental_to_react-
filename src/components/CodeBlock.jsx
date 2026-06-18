export default function CodeBlock({ lines, highlightLines = [] }) {
  return (
    <pre className="code-block">
      {lines.map((line, i) => {
        const isHighlighted = highlightLines.includes(i);
        const content = isHighlighted ? <span className="hl">{line}</span> : line;
        return (
          <span key={i}>
            {content}
            {i < lines.length - 1 ? '\n' : ''}
          </span>
        );
      })}
    </pre>
  );
}
