# Async / Await

- [Async / Await](#async--await)
  - [A better way to write fetching code](#a-better-way-to-write-fetching-code)
  - [But what about catching errors?](#but-what-about-catching-errors)
  - [The benefits of `async`/`await`](#the-benefits-of-asyncawait)
  - [Making a generic fetch helper](#making-a-generic-fetch-helper)
  - [A better fetchData helper](#a-better-fetchdata-helper)


## A better way to write fetching code

So far we have written `fetch` code like this:

```js
const fetchPromise = fetch('https://pokeapi.co/api/v2/pokemon/pikachu');

fetchPromise
  .then((response) => response.json())
  .then((jsonData) => console.log(jsonData))
  .catch((error) => console.error(error.message));
```

We have taken the `Promise` returned by `fetch()` and used the `.then` and `.catch` methods to schedule callbacks to execute when the promise resolves/rejects.

However, an alternate syntax was created to achieve the same effect but in a more "synchronous-like" manner. This approach utilizes the `async` and `await` keywords

```jsx
// A function marked with async is "non-blocking" and returns a Promise
const getPikachuData = async () => { 
  // When we await a Promise, we are given the resolved value (the Response object)
  // An awaited statement becomes "blocking"
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');

  // Since response.json() also returns a Promise, we can await it too.
  const jsonData = await response.json();

  // now we do something with the data
  console.log(jsonData);
};

getPikachuData(); // non-blocking and returns a Promise (we can .then it if we wanted to)
console.log('when does this happen?') 
```

- The `await` keyword causes our code to pause and wait for the Promise to resolve. It then unpacks the Promise and returns the resolved value.
- The `async` keyword does two things:
    - First, it labels a function as asynchronous. This is required for any function that makes use of the `await` keyword
    - Second, it wraps the function’s returned value in a Promise. If we were to store the returned value of `getPikachuData()`, it would be a Promise.

## But what about catching errors?

There are some functions (like `fetch()`) that are capable of throwing an error. 

We can manually throw our own errors too using `throw new Error('message')`. When an error is thrown, the program crashes immediately:

```js
console.log('start');

throw new Error('uh oh!');

console.log('end'); // this code won't even run
```

`try`/`catch` is the standard way to handle those errors and it will prevent the application from crashing. Instead, we can handle any errors that occur and continue on:

```js
console.log('start');

try {
  throw Error('uh oh!')
}
catch (error) {
  console.error(error.message)
}

console.log('end'); // now, this code can run!
```

So, when using a function that can throw an error like `fetch()`, we should always use `try` and `catch`:

```js
const getPikachuData = async () => { 
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const jsonData = await response.json();
    // do something with the data
    console.log(jsonData);
  }
  catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

getPikachuData();
```

## The benefits of `async`/`await`

Using the `async`/`await` syntax with `try` and `catch` has a number of benefits. The main ones being **readability** and **debuggability**.
* We can write async code in a synchronous-like manner
* We avoid having to write a bunch of callbacks
* We can avoid common mistakes made when using callbacks
* `try/catch` is a more general-purpose way of handling errors that can be used for more than just fetching.

<details><summary>For example, what's wrong with this code? Why does it print `undefined`?</summary>

Forgot to return from the first `.then` when chaining to a second `.then`

</details><br>


```js
const promise = fetch('https://reqres.in/api/users')

promise
  .then((response) => {
    if (!response.ok) throw Error(response.status);
    response.json();
  })
  .then((data) => {
    console.log(data); // print undefined
  })
  .catch((error) => {
    console.log(`${error.name}: ${error.message}`);
  })
```

## Making a generic fetch helper

The code for fetching data is almost always the same: 

- In a `try` block, `fetch` from a URL and parse the response as JSON
- In a `catch` block, log the caught `error`. Any error that occurs in the `try` block will be caught by this one shared `catch` block

So, we can refactor our code a bit and create a helper function that abstracts away this logic:

```js
// This function returns a Promise that resolves to jsonData
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    // we want this function to resolve to jsonData, so we return it!
    return jsonData; 
  }
  catch (error) {
    // if there was an error, log it and return null
    console.error(error.message);
    return null; 
  }
}

const getPikachuData = async () => {    
  // fetchData returns a Promise so we can await it! 
  // Just make sure to make the function async
  const pikachuData = await fetchData('https://pokeapi.co/api/v2/pokemon/pikachu');
  
  // do something with pikachuData (or just print it)
  console.log(pikachuData)
};

const getRandomDog = async () => {    
  const dogData = await fetchData('https://dog.ceo/api/breeds/image/random');
  
  // do something with dogData
  console.log(dogData);
};

getPikachuData();
getRandomDog();
```

## A better fetchData helper

The `fetchData` helper does a good job at DRYing our code but we can add a few extra features. The helper below is a bit more useful:

* It accepts an `options` argument to be passed in (it should be defined by the caller of the function), allowing other types of requests to be made (POST, PATCH/PUT, DELETE, etc...)
* It checks `response.ok` before attempting to parse the response
* It checks the content type of the `response` to determine how to parse (with `response.json()` or `response.text()`)
* It returns the data in a "tuple" format — an array with 2 values where the first value is _always_ the data (if present) and the second value is _always_ the error (if present). Only one of the two values will ever be present.

```js
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // Throw an error if the response was not 2xx
    if (!response.ok) throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)

    // Check the content type to determine how to parse the response. Then, return a tuple: [data, error]
    const contentType = response.headers.get('content-type');
    if (contentType !== null && contentType.includes('application/json')) {
        const jsonData = await response.json();
        return [jsonData, null]
    } else {
        const textData = await response.text();
        return [textData, null]
    }
  }
  catch (error) {
    // if there was an error, log it and return a tuple: [data, error]
    console.error(error.message);
    return [null, error]; 
  }
}

// Example Using the helper
const postUser = (user) => {
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    }
  }

  const [postResponseData, error] = await fetchData('https://reqres.in/api/users', options);
  if (!error) console.error(error.message)
  else console.log(postResponseData);
}

postUser({name: "morpheus", job: "leader" })
```
