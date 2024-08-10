import { api } from "./api";

async function Fetch({ endPoint }) {
  const res = await api.get(`${import.meta.env.VITE_JIKAN_API_URL}${endPoint}`);
  return res.data;
}

async function Search({ endPoint, cancelToken }) {
  const res = await api.get(`${import.meta.env.VITE_JIKAN_API_URL}${endPoint}`, {
    cancelToken: cancelToken,
  });
  return res.data.data;
}

export { Fetch, Search };
