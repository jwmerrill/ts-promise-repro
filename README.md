This project is designed to show an inconsistency in Typescript's type checking of `async` functions as of version 3.4 when targeting ES5.

Down-leveling `async` functions requires the `Promise` constructor to be available in scope. As of version 3.4, Typescript may or may not enforce this depending on the return value of an `async` function.

## Install
```
npm ci
```

## Repro
```
npx tsc
```

## Summary

The following code fails to type check as expected

```ts
// src/fails.ts
async function helper() {
  await fetch('https://www.example.com');
}

export async function main() {
  await helper();
}
```

with

```
error TS2468: Cannot find global value 'Promise'.

src/fails.ts:1:16 - error TS2705: An async function or method in ES5/ES3 requires the 'Promise' constructor.  Make sure you have a declaration for the 'Promise' constructor or include 'ES2015' in your `--lib` option.

1 async function helper() {
                 ~~~~~~
```

but very similar code that adds a return value to the definition of `helper()` passes type checking.

```ts
// works-1.ts
async function helper() {
  await fetch('https://www.example.com');
  return true;
}

export async function main() {
  await helper();
}
```

Typescript also fails to reject async functions without a local call-site:

``````ts
// works-2.ts
export async function main() {
  await fetch('https://www.example.com');
}
```
