export const getUsers = () => {
  return fetch('https://reqres.in/api/users')
    .then((response) => {
      if (!response.ok) {
        throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
      }
      // start the async process of reading the ReadableStream and return a promise
      return response.json();
    })
    .then((responseData) => {
      // do something with the response data
      console.log("Here is your data:", responseData);
      return responseData;
    })
    .catch((error) => {
      console.error(error.message);
    });
}

// refactoring = re-writing our code
const fetchHandler = async (url) => {
  try {
    // 1 - "download" the data
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }

    // 2 - read the data
    // start the async process of reading the ReadableStream and return a promise
    const responseData = await response.json();

    console.log("Here is your data:", responseData);
    return responseData;
  }
  catch (error) {
    console.error(error.message);
    return null;
  }
}

// TODO: Write the same function, but using async/await
export const getUsersAsyncAwait = async () => {
  const usersOrNull = fetchHandler('https://reqres.in/api/users/');
  return usersOrNull;
}

// TODO: Write a function for fetching a single user
export const getUser = async (userId) => {
  const userOrNull = fetchHandler('https://reqres.in/api/users/' + userId);
  return userOrNull;
}

export const getResource = async (resourceId) => {
  const resourceOrNull = fetchHandler('https://reqres.in/api/unknown/' + resourceId);
  return resourceOrNull;
}

getUser(1)
getUser(2)
getResource(2);