/// <reference lib="DOM" />

declare namespace JSX {
  interface Element {
    insertInto(root: Node, afterNode?: Node): { update(): void };
  }

  interface Component {
    (properties?: { [key: string]: any }, children?: Node[]): Node;
  }

  // IntrinsicElementMap grabs all the standard HTML tags in the TS DOM lib.
  interface IntrinsicElements extends IntrinsicElementMap {}

  // The following are custom types, not part of TS's known JSX namespace:
  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: any;
    };
  };
}
