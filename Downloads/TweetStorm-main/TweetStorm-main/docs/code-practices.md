# Code Practices

## 1. Use function declarations instead of arrow functions

The explicit use of the `function` keyword makes the code more readable.  
This rule is to be followed unless there is only one liner function. For one liners we can use arrow functions also.

```typescript
const handleClick = () => {}; // ❌
```

```typescript
function handleClick() {} // ✅
```

## 2. Position of useEffects

Write useEffects at the end of react component just before the return statement

```typescript
// ❌
function Component() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {}, []);

  function test() {
    // ...
  }

  return <h1> {count} </h1>;
}
```

```typescript
// ✅
function Component() {
  const [count, setCount] = useState<number>(0);

  function test() {
    // ...
  }

  useEffect(() => {}, []);

  return <h1> {count} </h1>;
}
```

## 3. Use generics with useState and useRef

```typescript
// ❌
const [count, setCount] = useState(0);
const [count, setCount] = useRef(null);
```

```typescript
// ✅
const [count, setCount] = useState<number>(0);
const [count, setCount] = useRef<null | HTMLDivElement>(null);
```

## 4. Use async await instead of .then() syntax

.then() syntax can be used if async await doesn't serve the purpose

## 5. enum naming conventions

Typescript enums should be uppercased and use underscores to separate words.

```typescript
// ❌
enum SubscriptionName {
  Pro = 'pro',
  Agency = 'agency',
}
```

```typescript
// ✅
enum SUBSCRIPTION_NAME {
  Pro = 'pro',
  Agency = 'agency',
}
```

## 6. type naming conventions

Typescript type should be PascalCase

```typescript
// ❌
type tweetSearchType = {};
```

```typescript
// ✅
type TweetSearchType = {};
```

## 7. Export react component at the end of file

```typescript
// ❌
export default function Component() {
  // ...

  return <h1> Hello </h1>;
}
```

```typescript
// ✅
function Component() {
  // ...

  return <h1> Hello </h1>;
}

export default Component;
```
