import { renderUsers } from './dom-helpers';
import { getUsers, getUsersAsyncAwait } from './fetch-helpers';

const main = () => {
  getUsersAsyncAwait().then(renderUsers);

  // getUsers()
  //   .then((data) => {
  //     renderUsers(data);
  //   });

  // TODO: Execute the same functions but using getUsersAsyncAwait
}
main();
