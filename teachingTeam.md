# Pre-Flight: React Syntax Drills : Instructor Answer Key

Reference solutions for all 11 drills in the practice app. Each one shows the
broken starting code, a correct fix, and what to listen for if a learner is
stuck or gets it almost but not quite right.

> Note: most validators accept more than one valid phrasing (e.g. a fragment
> instead of a `<div>`, or destructuring inline vs. in the function body).
> The "accepts" notes flag where that flexibility matters.

---

## Rule 01 — Elements must have a single parent

**Broken:**
jsx
function Profile() {
  return (
    <h1>Jordan</h1>
    <p>Frontend Engineer</p>
  );
}

**Fix:**
jsx
function Profile() {
  return (
    <div>
      <h1>Jordan</h1>
      <p>Frontend Engineer</p>
    </div>
  );
}

**Also accepts:** wrapping in a fragment instead of a `<div>`:
jsx
<>
  <h1>Jordan</h1>
  <p>Frontend Engineer</p>
</>

**Watch for:** learners adding a parent tag but only around one of the two
elements, leaving two siblings at the top level — still invalid.

---

## Rule 02 — All tags must be properly closed

**Broken:**
jsx
function Avatar() {
  return (
    <div>
      <img src="me.png">
      <hr>
    </div>
  );
}

**Fix:**
jsx
function Avatar() {
  return (
    <div>
      <img src="me.png" />
      <hr />
    </div>
  );
}

**Watch for:** learners fixing only one of the two tags, or adding the slash
without the required space (`<img.../>` is fine, but make sure they didn't
cut the attribute while editing).

---

## Rule 03 — Attributes use camelCase

**Broken:**
jsx
function Button() {
  return (
    <button class="primary" onclick={handleClick}>
      Go
    </button>
  );
}

**Fix:**
jsx
function Button() {
  return (
    <button className="primary" onClick={handleClick}>
      Go
    </button>
  );
}

**Watch for:** fixing `class` → `className` but leaving `onclick` lowercase
(or vice versa) — both need the camelCase treatment.

---

## Rule 04 — JS expressions go inside curly braces

**Broken:**
jsx
function Greeting() {
  const name = 'Sam';
  return (
    <h1>Hello, 'name'!</h1>
  );
}

**Fix:**
jsx
function Greeting() {
  const name = 'Sam';
  return (
    <h1>Hello, {name}!</h1>
  );
}

**Watch for:** learners who just delete the quotes and leave bare `name` with
no braces — that's a JSX parse error, not a fix. Worth pointing out that
quoted `'name'` would technically "work" but render the literal text "name"
instead of the variable's value — the bug is semantic, not just syntactic.

---

## Rule 05 — Destructuring

**Broken:**
js
function showUser(user) {
  console.log(user.name + ' is ' + user.age);
}

const person = { name: 'Lee', age: 29 };
showUser(person);

**Fix (destructure in the parameter list):**
js
function showUser({ name, age }) {
  console.log(name + ' is ' + age);
}

const person = { name: 'Lee', age: 29 };
showUser(person);

**Also accepts (destructure inside the function body):**
js
function showUser(user) {
  const { name, age } = user;
  console.log(name + ' is ' + age);
}

**Watch for:** this is the one most learners underfix — they'll destructure
correctly but forget to update the `console.log` line to use the bare
`name`/`age` instead of `user.name`/`user.age`. Worth calling out explicitly
since it's exactly the kind of half finished refactor that shows up in props
destructuring next week.

---

## Rule 06 — Arrow functions

**Broken:**
js
function double(n) {
  return n * 2;
}

const nums = [1, 2, 3];
const doubled = nums.map(function(n) {
  return n * 2;
});

**Fix:**
js
const double = (n) => n * 2;

const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);

**Watch for:** learners converting `double` but leaving the `nums.map(...)`
callback as a traditional `function` expression, or vice versa — both need
converting. Also a good moment to mention that parens around a single
parameter (`(n) =>` vs `n =>`) are optional but encouraged for consistency.

---

## Rule 07 — Template literals

**Broken:**
js
const name = 'Riley';
const score = 87;
const message = 'Hi ' + name + ', you scored ' + score + '%.';
console.log(message);

**Fix:**
js
const name = 'Riley';
const score = 87;
const message = `Hi ${name}, you scored ${score}%.`;
console.log(message);

**Watch for:** learners swapping quote style (`'...'` → `` `...` ``) but
forgetting to wrap the embedded variables in `${ }` — they'll end up with a
backtick string that still has `+ name +` inside it, which is a syntax error.

---

## Rule 08 — Spread operator

**Broken:**
js
const user = { name: 'Ade', age: 31 };
const updated = user;
updated.age = 32;

console.log(user.age); // this changes too — bug!

**Fix:**
js
const user = { name: 'Ade', age: 31 };
const updated = { ...user, age: 32 };

console.log(user.age); // still 31

**Watch for:**  `updated = user` doesn't copy the object, it copies the
*reference*, so mutating `updated` mutates `user` too. The spread creates a
genuinely new object. Worth connecting explicitly to "this is how you'll
update state in React without mutating it directly."

---

## Rule 09 — Default parameters

**Broken:**
js
function greet(name) {
  if (name === undefined) {
    name = 'friend';
  }
  return 'Hello, ' + name + '!';
}

console.log(greet());

**Fix:**
js
function greet(name = 'friend') {
  return 'Hello, ' + name + '!';
}

console.log(greet());

**Watch for:** learners adding the default parameter but leaving the old
`if` block in place. It's not wrong exactly (the if-block just never runs),
but it's worth having them delete the dead code so the simplification
actually lands.

---

## Rule 10 — Rendering lists with `.map()` and `key`

**Broken:**
jsx
function FruitList() {
  const fruits = ['Apple', 'Pear', 'Fig'];
  return (
    <ul>
      {fruits.map(fruit => <li>{fruit}</li>)}
    </ul>
  );
}

**Fix:**
jsx
function FruitList() {
  const fruits = ['Apple', 'Pear', 'Fig'];
  return (
    <ul>
      {fruits.map(fruit => <li key={fruit}>{fruit}</li>)}
    </ul>
  );
}

**Watch for:** learners who add a `key` but use the array index
(`fruits.map((fruit, i) => <li key={i}>...`)) instead of something tied to
the data. It runs without errors here, so it's easy to miss — worth a quick
aside that index-as-key works for static lists but causes bugs once the list
can reorder, filter, or have items inserted/removed.

---

## Rule 11 — Conditional rendering with a ternary

**Broken:**
jsx
function Status({ isOnline }) {
  return (
    <p>
      if (isOnline) { 'Online' } else { 'Offline' }
    </p>
  );
}

**Fix:**
jsx
function Status({ isOnline }) {
  return (
    <p>
      {isOnline ? 'Online' : 'Offline'}
    </p>
  );
}

**Watch for:** this is the most common point where learners try to write an
actual `if` statement inside `{ }` in JSX and get confused why it errors.
Good moment to land the core distinction: `{ }` in JSX only accepts an
*expression* (something that evaluates to a value) — `if/else` is a
*statement*, a ternary is an expression. Same reasoning applies later to
`&&` short-circuit rendering.

---

## Quick reference table

| # | Topic | One-line fix |
|---|-------|---------------|
| 1 | Single parent | Wrap siblings in one `<div>` or `<>...</>` |
| 2 | Closing tags | `<img ... />`, `<hr />` |
| 3 | camelCase attrs | `class` → `className`, `onclick` → `onClick` |
| 4 | `{ }` expressions | `'name'` → `{name}` |
| 5 | Destructuring | `function showUser({ name, age })` |
| 6 | Arrow functions | `const double = (n) => n * 2` |
| 7 | Template literals | `` `Hi ${name}` `` instead of `'Hi ' + name` |
| 8 | Spread operator | `{ ...user, age: 32 }` instead of mutating |
| 9 | Default parameters | `function greet(name = 'friend')` |
| 10 | List rendering | `<li key={fruit}>{fruit}</li>` |
| 11 | Conditional rendering | `{isOnline ? 'Online' : 'Offline'}` |
