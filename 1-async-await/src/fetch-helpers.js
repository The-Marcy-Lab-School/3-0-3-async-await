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


// TODO: Write the same function, but using async/await
export const getUsersAsyncAwait = async () => {

}

// TODO: Write a function for fetching a single user
export const getUser = async (userId) => {

}