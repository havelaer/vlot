export function jsxDEV(
  tagName: string | any,
  { children, ...attrs }: Record<string, unknown>
): JSX.Element {
  return {
    insertInto(root: Node, afterNode?: Node) {
      const d = document;
      const closures: any = [];

      const element =
        typeof tagName === "function"
          ? tagName(attrs, children)(root) // TODO
          : d.createElement(tagName);

      if (attrs) {
        Object.keys(attrs).forEach((attr) => {
          const val = attrs[attr];

          if (attr.startsWith("$")) {
            const prop = attr.slice(1);
            if (typeof val === "function") {
              element[prop] = val();
              closures.push(() => (element[prop] = val()));
            } else {
              element[prop] = val;
            }
          } else if (attr.startsWith("on") && typeof val === "function") {
            const event = attr.slice(2);
            element.addEventListener(event, val as any);
          } else if (typeof val === "string") {
            element.setAttribute(attr, val);
          } else if (typeof val === "function") {
            element.setAttribute(attr, val());
            closures.push(() => element.setAttribute(attr, val()));
          } else {
            console.warn("invalid attribute", attr);
          }
        });
      }

      const mountChild = (child: any) => {
        let isClosure = false;
        let value: any = child;

        if (typeof child === "function" && child.name !== "_render") {
          value = child();
          isClosure = true;
        }

        if (typeof value === "function" && value.name === "_render") {
          const tmpl = value(element);
          closures.push(() => tmpl.update());
        } else if (typeof value === "string") {
          const text = d.createTextNode(value);
          element.appendChild(text);
          if (isClosure)
            closures.push(() => {
              const newValue = child();
              if (newValue !== value) {
                text.textContent = newValue;
                value = newValue;
              }
            });
        } else if (typeof value === "number") {
          const text = d.createTextNode(`${value}`);
          element.appendChild(text);
          if (isClosure) closures.push(() => (text.textContent = `${child()}`));
        } else if (Array.isArray(value)) {
          value.forEach((item) => mountChild(item));
          //if (isClosure) closures.push(() => (text.textContent = `${child()}`));
        }
      };

      if (children && Array.isArray(children)) {
        children.forEach((child: any) => mountChild(child));
      }

      root.appendChild(element);

      return {
        update() {
          closures.forEach((c: any) => c());
        },
      };
    }
  };
}

export function Fragment(props: unknown, children: unknown[]) {
  console.log("TODO", props, children);

  return () => document.createElement("div");
}
