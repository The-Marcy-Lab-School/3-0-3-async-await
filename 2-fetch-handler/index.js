const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    // Throw an error if the response was not 2xx - let the catch statement handle it
    if (!response.ok) throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)

    // Make sure that the content type of the response is JSON before parsing it
    // and return a tuple with the data and a null error.
    const contentType = response.headers.get('content-type');
    if (contentType !== null && contentType.includes('application/json')) {
      const jsonData = await response.json();
      return [jsonData, null]
    }

    // If the contentType of the response is not JSON, parse it as plain
    // text and return a tuple with a null error
    const textData = await response.text();
    return [textData, null]
  }
  catch (error) {
    // if there was an error, log it and return a tuple: [data, error]
    console.error(error.message);
    return [null, error];
  }
}

const getUsersAsyncAwaitWithHelper = async () => {
  const [jsonData, error] = await fetchData('https://reqres.in/api/users');

  if (error) {
     document.querySelector("#error-message").textContent = error.message
  }
  
  // dom manipulation
  const usersList = document.querySelector("#users-list");
  usersList.innerHTML = "";

  jsonData.data.forEach((user) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const img = document.createElement('img');
    usersList.append(li);
    li.append(p, img);

    p.textContent = `${user.first_name} ${user.last_name}`;
    img.src = user.avatar
  });

}

const main = () => {
  getUsersAsyncAwaitWithHelper()
}

main();
