export const topics = [
  {
    id: 0,
    file: "SingleRoot.jsx",
    rule: "Rule 01",
    title: "Elements must have a single parent",
    desc: "A component can only return one element. If you have siblings, wrap them in a parent — a <div>, or a <></> fragment if you don't want an extra node in the DOM.",
    broken: [
      "function Profile() {",
      "  return (",
      "    <h1>Jordan</h1>",
      "    <p>Frontend Engineer</p>",
      "  );",
      "}",
    ],
    brokenHighlight: [3],
    placeholder: "function Profile() {\n  return (\n    \n  );\n}",
    hint: "Read up on fragments : https://legacy.reactjs.org/docs/fragments.html",
    validate: (code) => {
      const hasH1 = /<h1>\s*Jordan\s*<\/h1>/i.test(code);
      const hasP = /<p>\s*Frontend Engineer\s*<\/p>/i.test(code);
      if (!hasH1 || !hasP) {
        return {
          ok: false,
          msg: "Keep both the <h1>Jordan</h1> and <p>Frontend Engineer</p> — just give them one parent.",
        };
      }
      const wrappedDiv =
        /<div>[\s\S]*<h1>\s*Jordan\s*<\/h1>[\s\S]*<p>\s*Frontend Engineer\s*<\/p>[\s\S]*<\/div>/i.test(
          code,
        );
      const wrappedFrag =
        /<>[\s\S]*<h1>\s*Jordan\s*<\/h1>[\s\S]*<p>\s*Frontend Engineer\s*<\/p>[\s\S]*<\/>/i.test(
          code,
        );
      if (wrappedDiv || wrappedFrag) {
        return {
          ok: true,
          msg: "One parent, two children. That's a valid return.",
        };
      }
      return {
        ok: false,
        msg: "Close — the h1 and p still look like two separate root elements. Wrap them together.",
      };
    },
  },
  {
    id: 1,
    file: "CloseTags.jsx",
    rule: "Rule 02",
    title: "All tags must be properly closed",
    desc: "Unlike regular HTML, JSX is strict. Self-closing tags like <img> or <input> need that trailing slash — and yes, JSX will complain if you forget it.",
    broken: [
      "function Avatar() {",
      "  return (",
      "    <div>",
      '      <img src="me.png">',
      "      <hr>",
      "    </div>",
      "  );",
      "}",
    ],
    brokenHighlight: [3, 4],
    placeholder:
      "function Avatar() {\n  return (\n    <div>\n      \n      \n    </div>\n  );\n}",
    hint: "Self-closing tags need a slash before the final >",
    validate: (code) => {
      const hasImg = /<img\s+src="me\.png"\s*\/>/i.test(code);
      const hasHr = /<hr\s*\/>/i.test(code);
      if (hasImg && hasHr)
        return {
          ok: true,
          msg: "Both tags self-close properly. JSX is happy.",
        };
      if (!hasImg && !hasHr)
        return {
          ok: false,
          msg: "Neither tag closes yet.",
        };
      if (!hasImg)
        return {
          ok: false,
          msg: "The <img> tag is still unclosed — add the trailing slash.",
        };
      return {
        ok: false,
        msg: "The <hr> tag is still unclosed — add the trailing slash.",
      };
    },
  },
  {
    id: 2,
    file: "CamelCase.jsx",
    rule: "Rule 03",
    title: "Attributes use camelCase",
    desc: "HTML attributes like class and onclick become className and onClick in JSX, because JSX attributes map to JavaScript object properties, and JS doesn't use hyphens or reserved words like class.",
    broken: [
      "function Button() {",
      "  return (",
      '    <button class="primary" onclick={handleClick}>',
      "      Go",
      "    </button>",
      "  );",
      "}",
    ],
    brokenHighlight: [2],
    placeholder:
      "function Button() {\n  return (\n    \n      Go\n    \n  );\n}",
    hint: "Google : reserved words in Javascript and see what you can figure out!",
    validate: (code) => {
      const hasClassName = /className\s*=\s*"primary"/.test(code);
      const hasOnClick = /onClick\s*=\s*\{handleClick\}/.test(code);
      const stillHasClass = /\sclass\s*=/.test(code);
      const stillHasOnclick = /\sonclick\s*=/.test(code);
      if (hasClassName && hasOnClick && !stillHasClass && !stillHasOnclick) {
        return {
          ok: true,
          msg: "className and onClick — that's the camelCase React expects.",
        };
      }
      if (stillHasClass || stillHasOnclick) {
        return {
          ok: false,
          msg: "Still seeing lowercase HTML-style attributes.",
        };
      }
      return {
        ok: false,
        msg: "Almost — double check both attribute names and that the values are still intact.",
      };
    },
  },
  {
    id: 3,
    file: "Expressions.jsx",
    rule: "Rule 04",
    title: "JS expressions go inside curly braces",
    desc: "JSX is mostly markup, but you can drop into real JavaScript anywhere by wrapping it in { }. Variables, function calls, ternaries. All fair game inside braces, not quotes.",
    broken: [
      "function Greeting() {",
      "  const name = 'Sam';",
      "  return (",
      "    <h1>Hello, 'name'!</h1>",
      "  );",
      "}",
    ],
    brokenHighlight: [3],
    placeholder:
      "function Greeting() {\n  const name = 'Sam';\n  return (\n    \n  );\n}",
    hint: "Swap the quotes around name for curly braces. Check this out: https://legacy.reactjs.org/docs/introducing-jsx.html",
    validate: (code) => {
      const good = /<h1>\s*Hello,\s*\{\s*name\s*\}\s*!\s*<\/h1>/.test(code);
      const stillQuoted = /'name'|"name"/.test(code);
      if (good)
        return {
          ok: true,
          msg: "{name} evaluates the variable. Quoted 'name' would've just printed the letters n-a-m-e.",
        };
      if (stillQuoted)
        return {
          ok: false,
          msg: "That's still a quoted string, so it would render literally as the word 'name'.",
        };
      return {
        ok: false,
        msg: "Keep the structure — just wrap the variable name.",
      };
    },
  },
  {
    id: 4,
    file: "Destructure.js",
    rule: "Rule 05",
    title: "Destructuring",
    desc: "Pulling values out of objects or props by name, instead of reaching in with dot notation every time. You'll see this constantly in function parameters once props show up next week.",
    broken: [
      "function showUser(user) {",
      "  console.log(user.name + ' is ' + user.age);",
      "}",
      "",
      "const person = { name: 'Lee', age: 29 };",
      "showUser(person);",
    ],
    brokenHighlight: [1],
    placeholder:
      "function showUser(user) {\n  \n  console.log(name + ' is ' + age);\n}\n\nconst person = { name: 'Lee', age: 29 };\nshowUser(person);",
    hint: "Destructure right in the parameter list. Look here: https://www.w3schools.com/JS/js_destructuring.asp.",
    validate: (code) => {
      const destructuredParam =
        /function\s+showUser\s*\(\s*\{\s*name\s*,\s*age\s*\}\s*\)/.test(code);
      const destructuredInside =
        /const\s*\{\s*name\s*,\s*age\s*\}\s*=\s*user/.test(code);
      const usesBareVars = /console\.log\(\s*name\s*\+/.test(code);
      if ((destructuredParam || destructuredInside) && usesBareVars) {
        return {
          ok: true,
          msg: "Either spot works — destructuring in the parameter list or right inside the function body.",
        };
      }
      if (usesBareVars) {
        return {
          ok: false,
          msg: "The log line uses bare name/age, but nothing destructures them yet.",
        };
      }
      return {
        ok: false,
        msg: "Try destructuring name and age out of the user object.",
      };
    },
  },
  {
    id: 5,
    file: "ArrowFns.js",
    rule: "Rule 06",
    title: "Arrow functions",
    desc: "A shorter syntax for writing functions and the style you'll see in almost every React example from here on, especially for things like onClick handlers and array callbacks.",
    broken: [
      "function double(n) {",
      "  return n * 2;",
      "}",
      "",
      "const nums = [1, 2, 3];",
      "const doubled = nums.map(function(n) {",
      "  return n * 2;",
      "});",
    ],
    brokenHighlight: [0, 5],
    placeholder:
      "const double = ;\n\nconst nums = [1, 2, 3];\nconst doubled = nums.map();",
    hint: "Read up: https://www.w3schools.com/js/js_arrow_function.asp",
    validate: (code) => {
      const arrowDouble =
        /const\s+double\s*=\s*\(?\s*n\s*\)?\s*=>\s*n\s*\*\s*2/.test(code);
      const arrowMap =
        /nums\.map\(\s*\(?\s*n\s*\)?\s*=>\s*n\s*\*\s*2\s*\)/.test(code);
      if (arrowDouble && arrowMap)
        return {
          ok: true,
          msg: "Both converted. Notice how the map callback reads almost like a sentence now.",
        };
      if (arrowDouble)
        return {
          ok: false,
          msg: "double is arrow-ified. Now do the same inside nums.map(...).",
        };
      if (arrowMap)
        return {
          ok: false,
          msg: "The map callback works. Now rewrite double as an arrow function too.",
        };
      return {
        ok: false,
        msg: "Rewrite both functions using expression syntax.",
      };
    },
  },
  {
    id: 6,
    file: "TemplateLiterals.js",
    rule: "Rule 07",
    title: "Template literals",
    desc: "Backtick strings let you embed expressions with ${ }, instead of chaining + signs. You'll use these constantly for building dynamic className strings and labels in React.",
    broken: [
      "const name = 'Riley';",
      "const score = 87;",
      "const message = 'Hi ' + name + ', you scored ' + score + '%.';",
      "console.log(message);",
    ],
    brokenHighlight: [2],
    placeholder:
      "const name = 'Riley';\nconst score = 87;\nconst message = ;\nconsole.log(message);",
    hint: "Use backticks! https://www.geeksforgeeks.org/javascript/javascript-template-literals/",
    validate: (code) => {
      const usesTemplate =
        /`Hi \$\{\s*name\s*\}, you scored \$\{\s*score\s*\}%\.`/.test(code);
      const stillConcatenating = /'Hi '\s*\+\s*name/.test(code);
      if (usesTemplate)
        return {
          ok: true,
          msg: "One backtick string, two embedded expressions. No more + chains.",
        };
      if (stillConcatenating)
        return {
          ok: false,
          msg: "That's still string concatenation with +. Switch to backticks and ${ }.",
        };
      return {
        ok: false,
        msg: "Rebuild the message as a single template literal.",
      };
    },
  },
  {
    id: 7,
    file: "SpreadOperator.js",
    rule: "Rule 08",
    title: "Spread operator",
    desc: "The ... spread operator copies values out of an array or object into a new one. In React this is the standard way to update state without mutating the original : copy everything, then override what changed.",
    broken: [
      "const user = { name: 'Ade', age: 31 };",
      "const updated = user;",
      "updated.age = 32;",
      "",
      "console.log(user.age); // this changes too — bug!",
    ],
    brokenHighlight: [1],
    placeholder:
      "const user = { name: 'Ade', age: 31 };\nconst updated = ;\n\nconsole.log(user.age); // should still be 31",
    hint: "Spread the original object into a new one, then override age. https://www.w3schools.com/react/react_es6_spread.asp",
    validate: (code) => {
      const spreadGood =
        /const\s+updated\s*=\s*\{\s*\.\.\.user\s*,\s*age\s*:\s*32\s*\}/.test(
          code,
        );
      const stillAliasing = /const\s+updated\s*=\s*user\s*;/.test(code);
      if (spreadGood)
        return {
          ok: true,
          msg: "updated is now a brandnew object -> user.age stays untouched at 31.",
        };
      if (stillAliasing)
        return {
          ok: false,
          msg: "updated still just points at the same object as user, so changing one changes both. Spread it instead.",
        };
      return {
        ok: false,
        msg: "Create updated with age: 32  so it copies user but overrides age.",
      };
    },
  },
  {
    id: 8,
    file: "DefaultParams.js",
    rule: "Rule 09",
    title: "Default parameters",
    desc: "Give a function parameter a fallback value right in the signature, so you don't need an if-statement to handle a missing argument. You'll see this a lot for optional props.",
    broken: [
      "function greet(name) {",
      "  if (name === undefined) {",
      "    name = 'friend';",
      "  }",
      "  return 'Hello, ' + name + '!';",
      "}",
      "",
      "console.log(greet());",
    ],
    brokenHighlight: [0],
    placeholder:
      "function greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\nconsole.log(greet());",
    hint: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
    validate: (code) => {
      const hasDefault =
        /function\s+greet\s*\(\s*name\s*=\s*'friend'\s*\)/.test(code);
      const noManualCheck = !/if\s*\(\s*name\s*===\s*undefined\s*\)/.test(code);
      if (hasDefault && noManualCheck) {
        return {
          ok: true,
          msg: "name = 'friend' in the signature replaces the whole if-check.",
        };
      }
      if (hasDefault) {
        return {
          ok: false,
          msg: "The default is set, but you can delete the old if-statement now — it’s no longer needed.",
        };
      }
      return {
        ok: false,
        msg: "Add the fallback directly in the parameter",
      };
    },
  },
  {
    id: 9,
    file: "ListRender.jsx",
    rule: "Rule 10",
    title: "Rendering lists with .map() and key",
    desc: "React renders arrays of elements by mapping data to JSX. Every item in the list needs a unique key prop so React can track which item is which when the list changes.",
    broken: [
      "function FruitList() {",
      "  const fruits = ['Apple', 'Pear', 'Fig'];",
      "  return (",
      "    <ul>",
      "      {fruits.map(fruit => <li>{fruit}</li>)}",
      "    </ul>",
      "  );",
      "}",
    ],
    brokenHighlight: [4],
    placeholder:
      "function FruitList() {\n  const fruits = ['Apple', 'Pear', 'Fig'];\n  return (\n    <ul>\n      {fruits.map(fruit => )}\n    </ul>\n  );\n}",
    hint: "Add a key prop using something unique per item — here the fruit name works: <div key={id}></ div> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    validate: (code) => {
      const hasKey =
        /<li\s+key=\{\s*fruit\s*\}\s*>\s*\{\s*fruit\s*\}\s*<\/li>/.test(code);
      const hasLiNoKey = /<li>\{?\s*fruit\s*\}?<\/li>/.test(code) && !hasKey;
      if (hasKey)
        return {
          ok: true,
          msg: "Each <li> now has a unique key, so React can track list items efficiently.",
        };
      if (hasLiNoKey)
        return {
          ok: false,
          msg: "The list renders, but there's still no key prop — React will warn about this in the console.",
        };
      return {
        ok: false,
        msg: "Map each fruit to an <li>.",
      };
    },
  },
  {
    id: 10,
    file: "ConditionalRender.jsx",
    rule: "Rule 11",
    title: "Conditional rendering with a ternary",
    desc: "JSX has no if-statements inside { }, so conditional rendering usually uses a ternary: condition ? <ThisIfTrue /> : <ThisIfFalse />. You'll use this constantly for things like loading states.",
    broken: [
      "function Status({ isOnline }) {",
      "  return (",
      "    <p>",
      "      if (isOnline) { 'Online' } else { 'Offline' }",
      "    </p>",
      "  );",
      "}",
    ],
    brokenHighlight: [3],
    placeholder:
      "function Status({ isOnline }) {\n  return (\n    <p>\n      \n    </p>\n  );\n}",
    hint: 'Replace the if/else with a ternary inside curly braces: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/"',
    validate: (code) => {
      const hasTernary =
        /\{\s*isOnline\s*\?\s*'Online'\s*:\s*'Offline'\s*\}/.test(code);
      const stillIfElse = /if\s*\(\s*isOnline\s*\)/.test(code);
      if (hasTernary)
        return {
          ok: true,
          msg: "A ternary is just an expression, so it works fine inside { } — if/else statements do not.",
        };
      if (stillIfElse)
        return {
          ok: false,
          msg: "if/else is a statement, not an expression, so it can’t go inside { } in JSX. Use a ternary instead.",
        };
      return { ok: false, msg: "Try Again" };
    },
  },
];
