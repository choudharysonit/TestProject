import axios from "axios";

export const getUsersApi = (params) => {
  console.log(params,'parmslist')
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?_page=${params.page}&_limit=${params.limit}`
  );
};