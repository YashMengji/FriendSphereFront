import axios from "axios";

const api = axios.create({
  baseURL: "http://friendsphereback.onrender.com/",
  withCredentials: true
});

export function makeRequests(url, options) {
  return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"));
}