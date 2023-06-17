const root = document.getElementById("root")!;

let count = 0;
let name = "";

const handleClick = () => {
  count++;
  element.update();
};

const handleInput = (event: any) => {
  name = event.target.value;
  element.update();
};

const template = (
  <span class="some-class">
    <div class={() => `bla-${count}`}>
      count: {count}, <strong>double: {count * 2}</strong>
      <br />
      count: {() => count}, <strong>double: {() => count * 2}</strong>
    </div>
    <button type="button" onclick={handleClick}>
      increment
    </button>
    <h1>{() => name}</h1>
    <input $value={() => name} oninput={handleInput} />
    {[1, 2, 3, 4].map((i) => (
      <div>
        Random {i}: {Math.random()}
      </div>
    ))}
    <div $innerHTML="<h2>hello!!</h2>" />
    <>test</>
    {/* {map(rows, (row) => (
      <div>{row.title}</div>
    ))}
    <map array={rows}>
      {row => <div>{row.title}</div>}
    </map> */}
    {/* {rows.map((row) => (
      <div key={row.title}>{row.title}</div>
    ))} */}
  </span>
);

const element = template.insertInto(root);

setInterval(() => {
  count++;
  element.update();
}, 1000);
