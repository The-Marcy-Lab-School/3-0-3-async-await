import { renderUsers } from './dom-helpers';
import { getUsers, getUsersAsyncAwait } from './fetch-helpers';

const main = () => {
  getUsers().then(renderUsers);

  // TODO: Execute the same functions but using getUsersAsyncAwait
}

main();
