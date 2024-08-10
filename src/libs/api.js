import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 60 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

export { api };
