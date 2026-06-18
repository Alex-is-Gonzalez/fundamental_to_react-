# React Pre-Flight — Syntax Drills

An interactive practice app for the JS/JSX fundamentals you'll want fresh before
a React lesson: single-parent elements, closing tags, camelCase attributes,
`{ }` expressions, destructuring, arrow functions, template literals, the
spread operator, default parameters, list rendering with `key`, and
conditional rendering with a ternary.

Each drill shows broken code next to an editable box. Type a fix and hit
**Check** for instant feedback — no build step, compiler, or backend involved;
everything is checked with small pattern matches in the browser.

## Project structure

```
react-prep-app/
├── index.html              entry HTML, loads fonts + main.jsx
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             mounts <App /> into #root
    ├── App.jsx              top-level state: current drill, drafts, solved set
    ├── topics.js            all 11 drills: broken code, hints, validators
    ├── styles/
    │   └── index.css        all styling, separated from components
    └── components/
        ├── Hero.jsx         top banner + scoreboard
        ├── TabBar.jsx       sticky drill switcher
        ├── DrillCard.jsx    the editable drill itself (textarea, check, hint)
        ├── CodeBlock.jsx    renders the read-only "broken" code with highlights
        ├── NavRow.jsx       Previous / Next buttons
        └── Footer.jsx
```

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (18+ recommended).

```bash
cd react-prep-app
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

To build a static, deployable version:

```bash
npm run build
```

This outputs a `dist/` folder you can host anywhere (Netlify, GitHub Pages, a
plain static file server, etc.). Preview the production build locally with:

```bash
npm run preview
```

## Adding more drills

Open `src/topics.js` and add another object to the `topics` array with a new
unique `id`. Each topic needs:

- `file` — shown in the tab as a filename
- `rule` / `title` / `desc` — the heading and explanation
- `broken` — array of strings, one per line of the broken example
- `brokenHighlight` (optional) — line indices to flag in coral
- `placeholder` — starting text in the editable box
- `hint` — shown when the learner clicks "Need a hint?"
- `validate(code)` — returns `{ ok: boolean, msg: string }`

No other file needs to change — `App.jsx` renders whatever is in the array.
