// This function is our most "in the weeds" and generic helper function. 
// It makes creating the other helper functions below MUCH easier.
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // Throw an error if the response was not 2xx - let the catch statement handle it
    if (!response.ok) throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)

    // Guard clause: make sure that the content type of the response is JSON before reading it
    const contentType = response.headers.get('content-type');
    if (contentType === null || !contentType.includes('application/json')) {
      // If the contentType of the response is not JSON, read the stream as plain text
      const textData = await response.text();
      return [textData, null]
    }

    const jsonData = await response.json();
    return [jsonData, null]
  }
  catch (error) {
    // if there was an error, log it and return a tuple: [data, error]
    console.error(error.message);
    return [null, error];
  }
}

// GET Requests are pretty straight forward. 
// Because fetchData is marked with 'async', it returns a promise
export const getUsers = () => {
  return fetchData('https://reqres.in/api/users')
}

export const getUser = (userId) => {
  return fetchData(`https://reqres.in/api/users/${userId}`);
}

// POST requests require some configuration before fetching
export const createUser = (name, job) => {
  const newUser = { name, job };
  const options = {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    }
  };
  return fetchData(`https://reqres.in/api/users`, options);
}

// DELETE requests require configuration, but not as much
// This request will NOT return JSON (for this API at least)
export const deleteUser = (userId) => {
  const options = {
    method: "DELETE"
  }
  return fetchData(`https://reqres.in/api/users/${userId}`, options);
}
