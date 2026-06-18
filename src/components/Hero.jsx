export default function Hero({ solvedCount, totalCount }) {
  return (
    <header className="hero">
      <div className="hero-inner">
        <div className="eyebrow">
          pre-flight check &middot; before next week&apos;s react lesson
        </div>
        <h1>
          Fix the code
          <br />
          <em>before</em> React makes you.
        </h1>
        <p className="sub">
          Eleven small drills covering the syntax rules that trip people up in
          their first React lesson. Each one is broken on purpose. Your job is
          to make it valid. The goal is the identitfy the issue in the broken
          code on the left hand side. Then in your fix section fix the broken
          code. Ensure that you write all code shown on the left hand side.
        </p>

        <div className="hero-terminal">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="line">function Card() {"{"}</p>
          <p className="line">{"  "}return (</p>
          <p className="line">{"    "}&lt;h1&gt;Hi&lt;/h1&gt;</p>
          <p className="line">
            {"    "}
            <span className="err">&lt;p&gt;Two roots&lt;/p&gt;</span>
          </p>
          <p className="line">{"  "});</p>
          <p className="line">{"}"}</p>
        </div>

        <div className="scoreboard">
          <div className="score-item">
            <div className="num">{solvedCount}</div>
            <div className="lbl">solved</div>
          </div>
          <div className="score-item">
            <div className="num coral">{totalCount - solvedCount}</div>
            <div className="lbl">remaining</div>
          </div>
        </div>
      </div>
    </header>
  );
}
