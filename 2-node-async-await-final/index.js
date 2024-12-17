const fs = require('node:fs/promises');

const readFile = async () => {
  // this code IS blocking
  return await fs.readFile('./story.txt', 'utf-8');
}

const renderFileInfo = (fileContents) => {
  console.log(`Here is your file: ${fileContents}`);
  console.log(`It is ${fileContents.length} characters long.`);
}

const getJoke = async () => {
  try {
    const endpoint = 'https://v2.jokeapi.dev/joke/Programming?type=twopart';
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(`Error! ${response.status}`);
    }
    const jokeData = await response.json();
    return jokeData;

  } catch (err) {
    console.error(err.message);
  }
}

const renderJoke = (jokeData) => {
  console.log(jokeData.setup);
  console.log(jokeData.delivery);
}

const main = async () => {
  const fileContents = await readFile();
  renderFileInfo(fileContents);

  const jokeData = await getJoke();
  renderJoke(jokeData);

  // you can also use .then instead of await
  readFile().then(renderFileInfo);
  getJoke().then((jokeData) => {
    renderJoke(jokeData);
  });
}

main();