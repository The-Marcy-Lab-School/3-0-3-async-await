export const renderUsers = (userData) => {
  if (!userData) return;

  const usersList = document.querySelector("#users-list");
  // clear out the innerHTML
  usersList.innerHTML = "";

  // Render each user
  userData.data.forEach((user) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const img = document.createElement('img');

    p.textContent = `${user.first_name} ${user.last_name}`;
    img.src = user.avatar;

    li.append(p, img);
    usersList.append(li);
  });
};