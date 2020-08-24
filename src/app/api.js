export const getUserAsync = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const res = await fetch(url);
  const response = await res.json();
  return { id: response.id, name: response.name };
};
