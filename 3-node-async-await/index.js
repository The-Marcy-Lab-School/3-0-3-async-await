// NOTE: This program will only work if you are running it from the same directory.

// Now, we'll use the promises version of fs
const fs = require('node:fs/promises');

// TODO: Convert this code to use async/await

const main = () => {
  console.log("Reading the-raven.txt");

  // A Promise object is returned
  const promise = fs.readFile('../data/the-raven.txt', 'utf8');

  // The .then and .catch methods schedule resolve/reject handlers
  promise
    .then((data) => {
      // when the file finishes reading, execute this callback
      const ravenCount = data.match(/raven/gi).length;
      console.log(`Done reading the-raven.txt.`)
      console.log(`There were ${ravenCount} mentions of "Raven".`);
    })
    .catch((err) => {
      console.log('Something went wrong!');
      console.error(err);
    });

  // The object on its own looks like this: Promise { <pending> }
  console.log(promise);
}

main();