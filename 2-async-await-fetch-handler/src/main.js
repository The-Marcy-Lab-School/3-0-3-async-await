import { renderUsers } from './dom-helpers';
import { getUsers, getUser, createUser, deleteUser } from './fetch-helpers';

const main = async () => {
  const [data, error] = await getUsers();
  if (error) {
    renderError(error);
  } else {
    renderUsers(data);
  }

  // We can still use .then for simple handling
  getUser(1).then(console.log);
  createUser('ben', 'instructor').then(console.log);
  deleteUser(1).then(console.log);
}

main();
