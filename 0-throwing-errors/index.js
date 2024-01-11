console.log('start');

// throw Error('uh oh!');


try {
  throw Error('uh oh!')
}
catch (error) {
  console.error(error.message)
}

console.log('end'); // this code won't even run