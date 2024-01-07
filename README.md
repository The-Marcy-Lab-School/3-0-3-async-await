# Async / Await

## A better way to write fetching code

An alternate syntax was created to avoid needing the `.then` and `.catch` callbacks. This utilizes `async` and `await` nested in `try` and `catch` blocks to achieve the same effect: wait 

```jsx
const getPikachuData = async () => { 
  try {
    // fetch still returns a Promise
		// When we await a Promise, we are given the resolved value (the Response object)
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
	
    // We still need to parse it as JSON, though. This is also an asynchronous 
		// operation that returns a Promise so we can await it too.
    const jsonData = await response.json();
	
    console.log(jsonData);
  }
  catch (error) {
    console.error(error.message);
  }
};

getPikachuData()
```

- The `await` keyword causes our code to pause and wait for the Promise to resolve. It then unpacks the Promise and returns the resolved value.
- The `async` keyword does two things:
    - First, it labels a function as asynchronous. This is required for any function that makes use of the `await` keyword
    - Second, it wraps the function’s returned value in a Promise. If we were to store the returned value of `getPikachuData()`, it would be a Promise.

## Making a generic fetch helper

The code for fetching data is almost always the same: 

- In a `try` block, `fetch` from a URL and parse the response as JSON
- In a `catch` block, log the caught `error`

So, we can refactor our code a bit and create a helper function that abstracts away this logic: